const express = require('express');
const contract = require('./contract');
const app = express();
const cors = require("cors"); //추가해주어야 외부 호출 가능
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());

app.get('/wallet/create', async (req, res) => {

    let result = await contract.walletCreate();
    res.send(result)
})

app.post('/balance', async (req, res) => {

    let { privateKey } = req.body;

    let result = await contract.getBalance(privateKey);
    res.send(result)
})

app.post('/transfer', async (req, res) => {

    let { privateKey, recipient, amount } = req.body;

    let result = await contract.transfer(privateKey, recipient, amount);
    res.send(result)
})


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})