require('dotenv').config();
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const userRt = require('./routes/userRoutes');
const courseRt = require('./routes/courseRoute');
const timetableRt = require('./routes/timetableRoute');
const roomRt = require('./routes/roomRoute');
const bookRt = require('./routes/bookingRoute');


const connectDB = require('./config/db');

//dotenv config
dotenv.config();

//connect to db(Mongo DB)
connectDB();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); 

// //middleware for logging
// app.use((req,res,next) => {
//     console.log(req.path,req.method);
//     next();
// })

//routes
app.use('/api/userRoutes', userRt);
app.use('/api/courseRoute', courseRt);
app.use('/api/timetable', timetableRt);
app.use('/api/roomRoute', roomRt);
app.use('/api/bookingRoute', bookRt);



//listen port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`.white.bold);
});