import express from "express";
import cors from "cors";
import testRoutes from './routes/test.routes.js'

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/test', testRoutes);

app.get('/health', (req, res) => {
    res.json({
        success:true,
        message:'Server is running'
    });
});

export default app;