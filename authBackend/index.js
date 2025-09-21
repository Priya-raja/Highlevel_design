import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRouter from "./routes/auth.route.js"


const PORT = process.env.PORT || 5200;

const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use(cors({
 credentials: true,
 origin: "http://localhost:3000"
}));

app.use('/auth', authRouter)

app.get('/', (req, res) => {
   res.send("Welcome to HHLD Chat App!");
});


app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})