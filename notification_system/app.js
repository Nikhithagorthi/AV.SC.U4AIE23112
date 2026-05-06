const express = require("express");

const getTopNotifications = require("./priority");

const app = express();

app.get("/priority", (req, res) => {

    const notifications = [

        {
            ID: 1,
            Type: "Placement",
            Message: "Amazon shortlisted students",
            Timestamp: "2026-05-06T08:00:00Z"
        },

        {
            ID: 2,
            Type: "Event",
            Message: "Hackathon tomorrow",
            Timestamp: "2026-05-06T07:30:00Z"
        },

        {
            ID: 3,
            Type: "Result",
            Message: "Mid results published",
            Timestamp: "2026-05-06T09:00:00Z"
        }

    ];

    const result = getTopNotifications(notifications, 10);

    res.json({
        count: result.length,
        notifications: result
    });

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});