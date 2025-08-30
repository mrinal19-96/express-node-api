const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./db/connectDb');    
const studentRoutes = require('./routes/student.route');
const authentication = require('./middleware/auth');
const userRoutes = require('./routes/users.route');
const multer = require('multer');
const DATABASEURL = process.env.DATABASEURL || 'mongodb://localhost:27017/studentcurd'; // Default to local MongoDB if not set
const passport = require('passport');
const session = require('express-session');

const googleAuth = require('./auth/google'); // Import Google authentication strategy
const twillo = require("twilio");

const app = express();
const port = 3000;




// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load environment variables from .env file
dotenv.config();
// Connect to the database
connectDb(DATABASEURL);


// session middleware
app.use(session ({
    secret: 'your_secret_key',  
    resave: false,
    saveUninitialized: true,    
}));

app.use(passport.initialize());
app.use(passport.session());





// twitch authentication
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// console.log('TWILIO_ACCOUNT_SID:', TWILIO_ACCOUNT_SID,  
//             'TWILIO_AUTH_TOKEN:', TWILIO_AUTH_TOKEN,
//             'TWILIO_PHONE_NUMBER:', TWILIO_PHONE_NUMBER);


const client = new twillo(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


app.post("/send-sms", async (req, res) => {
    const { to, message } = req.body;
    // console.log("Sending SMS to:", to, "Message:", message);
    
    try {
        const result = await client.messages.create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: to,
        });
        res.status(200).json({
            message: "SMS sent successfully",
            sid: result.sid,
        });
        
    } catch (error) {
        console.error("Error sending SMS:", error);
        res.status(500).json({ message: "Failed to send SMS", error: error.message });
    }
});



// Basic route
// google login route


app.use('/google_login', (req, res, next) => {
    res.send(`
        <h1>Google Login</h1>
        <a href="/auth/google">Login with Google</a>
    `);

})

app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/google_login',successRedirect: '/mydashbord' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
);

// google login authentication checking middleware 
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {    

        // console.log('User is authenticated:', req.user);
        return next();
    } else {
        console.log('User is not authenticated');   
        return res.redirect('/google_login');
    }
}
// Route to display user dashboard after successful login


app.get('/mydashbord',isAuthenticated, (req, res) => {
    
        // console.log('User authenticated:', req.user);
        
        res.send(`
            <h1>Welcome ${req.user.displayName}</h1>
            <p>Email: ${req.user.emails[0].value}</p>
            <a href="/logout">Logout</a>
        `);
    
     
}
);

app.get('/logout', (req, res) => {
    req.logout((err) => {   
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/google_login');
    }
    );
});





app.use('/api/users',userRoutes);

app.use(authentication); // Apply authentication middleware to all routes below this line
app.use('/api/students',studentRoutes)
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send(`Image Error: ${err.message} : ${err.code}`);
    }   
    else if (err) {
        return res.status(500).send(`Server Error: ${err.message}`);
    }

    next();
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// 
