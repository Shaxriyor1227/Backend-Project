const express = require('express');
const { connect } = require("mongoose");
const cors = require('cors');
// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function connectToDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("MongoDB is connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
connectToDB();

//Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//Role
const { role } = require("./routes/roleRoute");
app.use("/role", role);

//Stuff
const { stuff } = require("./routes/stuffRoute");
app.use("/stuff", stuff);

//GroupStuff
const { groupStuff } = require("./routes/groupStuffRoute");
app.use("/group-stuff", groupStuff);

//StuffRole
const { stuffRole } = require("./routes/stuffRoleRoute");
app.use("/stuff-role", stuffRole);


//Group
const { group } = require("./routes/groupRoute");
app.use("/group", group);

//Branch
const { branch } = require("./routes/branchRoute");
app.use("/branch", branch);

//Stage
const { stage } = require("./routes/stageRoute");
app.use("/stage", stage);

//StudentGroup
const { studentGroup } = require("./routes/studentGroupRoute");
app.use("/student-group", studentGroup);

//Lesson
const { lesson } = require("./routes/lessonRoute");
app.use("/lesson", lesson);

//StudentLesson
const { studentLesson } = require("./routes/studentLessonRoute");
app.use("/student-lesson", studentLesson);

//Lid
const { lid } = require("./routes/lidRoute");
app.use("/lid", lid);

//Students
const { students } = require("./routes/studentRoute");
app.use("/students", students);

//LidStatus
const { lidStatus } = require("./routes/lidStatusRoute");
app.use("/lid-status", lidStatus);

//ReasonLid
const { reasonLid } = require("./routes/reasonLidRoute");
app.use("/reason-lid", reasonLid);

//Payment
const { payment } = require("./routes/paymentRoute");
app.use("/payment", payment);

//Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: "API documentation for Express.js with Swagger",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));