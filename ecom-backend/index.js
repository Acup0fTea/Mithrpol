const express = require('express');
const dbConnect = require('./config/db.connector');
const app = express();
const dotenv = require('dotenv').config();
const authRouter = require('./routes/authRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 3000;

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});