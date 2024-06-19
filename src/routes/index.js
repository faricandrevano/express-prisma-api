import express from 'express';
import authRoute from './authRoute.js';
import kelasRoute from './kelasRoute.js';
import userRoute from './userRoute.js';
const app = express();
app.disable('x-powered-by');
app.get('/v1', async (req,res) => {
    try {
        res.status(200).json({data: [],message: "welcome to Homepage API",status: "success"});
    } catch (error) {
        res.status(200).json({data: [],message: "Internal Server Error",status: 'error'});
    }
});
app.use('/v1/auth',authRoute);
app.use('/v1/kelas',kelasRoute);
app.use('/v1/user',userRoute);
export default app;