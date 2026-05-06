const express = require("express");

const logger = require("./middleware/logger");
const optimizeTasks = require("./services/scheduler");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/optimize/:depotId", async(req, res) => {

    try {

        const depotId = Number(req.params.depotId);

        // Local Test Data

        const depots = [{
            ID: 1,
            MechanicHours: 20
        }];

        const vehicles = [{
                VehicleID: 101,
                Duration: 5,
                Impact: 50
            },
            {
                VehicleID: 102,
                Duration: 7,
                Impact: 60
            },
            {
                VehicleID: 103,
                Duration: 4,
                Impact: 40
            },
            {
                VehicleID: 104,
                Duration: 6,
                Impact: 70
            }
        ];

        const depot = depots.find(d => d.ID === depotId);

        if (!depot) {

            return res.status(404).json({
                message: "Depot not found"
            });
        }

        const result = optimizeTasks(
            vehicles,
            depot.MechanicHours
        );

        res.json({
            depotId,
            mechanicHours: depot.MechanicHours,
            totalImpact: result.maxImpact,
            selectedTasks: result.selectedTasks
        });

    } catch (error) {

        res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
});

app.listen(4000, () => {

    console.log("Server running on port 4000");

});