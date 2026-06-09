import express from "express";
import cors from "cors";
import testRoutes from './routes/test.routes.js';
import conversationRoutes from "./routes/conversation.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/test', testRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);


app.get('/health', (req, res) => {
    res.json({
        success:true,
        message:'Server is running'
    });
});

export default app;