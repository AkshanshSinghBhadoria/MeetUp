import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js";
import envserver from "../env.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000 ));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: "true" }));

app.use("/api/v1/users", userRoutes);

const start = async (req, res) => {
    app.set("mongo_user")
    const connectDB = await mongoose.connect(`${envserver.DB_URL}`);

    console.log("Connected to DB");
    server.listen(app.get("port"), () => {
        console.log("Server is listening on port 8000");
    });
}

start();