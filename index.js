import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { requireAuth, configureSession, hashPassword, verifyPassword } from './authMiddleware.js';

const app = express();
const port = 3000;

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "Rahul@RRM123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure session middleware
configureSession(app);

// Signup Route
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        req.session.userId = result.rows[0].id;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/signup?error=Registration failed');
    }
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await verifyPassword(password, user.password);
            if (isValid) {
                req.session.userId = user.id;
                res.redirect('/');
            } else {
                res.redirect('/login?error=Invalid credentials');
            }
        } else {
            res.redirect('/login?error=User not found');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/login?error=Login failed');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Protected Todo List Route
app.get('/', requireAuth, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM items WHERE user_id = $1 ORDER BY id ASC', 
            [req.session.userId]
        );
        res.render("index.ejs", {
            listTitle: "Today",
            listItems: result.rows,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
});

// Add Todo Item
app.post("/add", requireAuth, async (req, res) => {
    const item = req.body.newItem;
    try {
        await db.query(
            "INSERT INTO items (title, user_id) VALUES ($1, $2)", 
            [item, req.session.userId]
        );
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

// Edit Todo Item
app.post("/edit", requireAuth, async (req, res) => {
    const item = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
    try {
        await db.query(
            "UPDATE items SET title = $1 WHERE id = $2 AND user_id = $3", 
            [item, id, req.session.userId]
        );
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

// Delete Todo Item
app.post("/delete", requireAuth, async (req, res) => {
    const id = req.body.deleteItemId;
    try {
        await db.query(
            "DELETE FROM items WHERE id = $1 AND user_id = $2", 
            [id, req.session.userId]
        );
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});