const express = require("express");
const app = express();
const routers = express.Router();
// const data = require("./src/assets/ConcertGeoJson.json");

var allowCrossDomain = function(req, res, next) {//設定response頭部的中介軟體
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//8089是vue專案的埠，這裡相對於白名單
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
    };
app.use(allowCrossDomain);
app.get("/api/data",function (request, response) {
    var data = require('./src/assets/ConcertGeoJson.json');
    response.send(data);
})

app.get('*',(request, respones) => {
    respones.end("ok");
})

app.listen(3000,() => {
    console.log("服務已啟動")
});

