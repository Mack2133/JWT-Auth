const express = require('express');
const mongoose =  require('mongoose');
const authRoutes = require('./routes/appRoutes');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://user1:user1@cluster0.hrnhrbi.mongodb.net/test?retryWrites=true&w=majority'; // Added database name

app.use(cookieParser())
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.error("Error occurred in MongoDB connection:", err);
    });

app.use('/api/user', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});