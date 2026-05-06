const express = require("express");

const logger = require("./middleware/logger");

const app = express();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Logging Middleware Working Successfully"
    });

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});