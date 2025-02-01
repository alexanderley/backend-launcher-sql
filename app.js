require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const sqlRouter = require("./routes/sql.routes");
app.use("/api", sqlRouter);

const projectRouter = require("./routes/project.routes");
app.use("/api", isAuthenticated, projectRouter);

// const projectRouter = require("./routes/project.routes");
// app.use("/api", projectRouter);

const taskRouter = require("./routes/task.routes");
app.use("/api", isAuthenticated, taskRouter);

// const taskRouter = require("./routes/task.routes");
// app.use("/api", taskRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


require("./error-handling")(app);

module.exports = app;
