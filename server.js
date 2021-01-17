const express = require("express");


const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/weather", require("./routes/api/weather"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
