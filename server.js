const express = require("express");
const path = require("path")

const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/weather", require("./routes/api/weather"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
