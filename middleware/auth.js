
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); 
// const User = require('../models/User.model'); // Assuming you have a User model defined


const authentication = async (req, res, next) => {  
  try{

    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const token = bearer[1];
        const user = jwt.verify(token, process.env.jwt_SECRET)
        console.log('user', user );
        req.user = user;

        next(); 
    }else{
        return res.status(401).json({ message: 'Unauthorized access' });
    }
  }catch(err){
    res.status(403).json({ message: 'Invalid or Expired token' });

  }

}

module.exports = authentication;