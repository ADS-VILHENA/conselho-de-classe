const express = require('express');
const routes = require('./routers');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3001 );