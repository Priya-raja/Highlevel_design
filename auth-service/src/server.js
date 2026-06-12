import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

await connectDB();

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
