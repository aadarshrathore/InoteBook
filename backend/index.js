const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const app = express();
const cors = require('cors')
const port = 5000;

app.use(cors())
app.use(express.json())
// Available api
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
