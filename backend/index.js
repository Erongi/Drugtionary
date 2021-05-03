const express = require("express");

const app = express();
var cors = require("cors");
app.use(cors());
const { logger } = require("./middlewares");
app.use(logger);
// Statics
app.use(express.static("static"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routers
const patientRouter = require("./routes/patient");
const drugRouter = require("./routes/drug");
const noteRouter = require("./routes/note");
const medicalRouter = require("./routes/medical");
const historyRouter = require("./routes/history");
const userRouter = require("./routes/user");
const symptomRouter = require("./routes/symptom");

app.use(patientRouter.router);
app.use(drugRouter.router);
app.use(noteRouter.router);
app.use(medicalRouter.router);
app.use(historyRouter.router);
app.use(userRouter.router);
app.use(symptomRouter.router);

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
