const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/usersRoutes");

const app = express();

// App config
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/auth", userRouter)

// DB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database');
}).catch(() => {
    console.error('Failed to connect to the database');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});