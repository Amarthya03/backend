const express = require("express");

const app = express();

const getRoutes = require("./routes/getRoutes");

app.use("/api", getRoutes);

app.listen(3000, () => {
	console.log("Server has started");
});
