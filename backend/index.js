import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/user.router.js";
import connectDB from "./database/dbconnection.js";
import noteRouter from "./router/note.router.js";


dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true, }));
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use("/api/v1/user", router);
// app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/notes", noteRouter);


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});