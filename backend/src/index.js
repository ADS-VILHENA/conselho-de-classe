const express = require('express');
const routes = require('./routers');
const cors = require('cors');
const port = (process.env.PORT || 3001);

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port|| 3001 , () => {
    console.log(`Servidor Rodando na Porta  ${port}`)
});
