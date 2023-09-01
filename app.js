const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config()
const cors = require("cors");
require("./config/db");

const userRouter = require('./routes/user_routes');
const adminRouter = require('./routes/admin_routes');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["https://petitionserver.ceal.club", "https://petition.ceal.club"],
        credentials: true,
		sameSite: "none"
    }
));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);

app.get("/", (req, res) => {
    res.end("Hello from petition-server-backend");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})