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
        secret: '959792be34f9602658e0a0a8fcac2750533bf7b328e857c103bbc611a944f36fd81ec1a190e5a4544e7887496299c0878a8a3233da9f7d229fb9b481031c0eba', // Replace with a strong secret
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