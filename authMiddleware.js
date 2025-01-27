import bcrypt from 'bcrypt';
import session from 'express-session';

// Authentication middleware
export function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Session configuration
export function configureSession(app) {
    app.use(session({
        secret: 'your_secret_key', // Replace with a strong secret
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));
}

// Password hashing utility
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Password verification utility
export async function verifyPassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}
