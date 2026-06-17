import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

await connectDB();
const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3000",
  },
})
app.set("io", io);
initializeSocket(io);
httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });