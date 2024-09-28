const express = require('express')
const app = express()
const PORT = process.env.WH_HOOK | 3000
const cookieParser = require('cookie-parser')
app.use(express.json())
   // .use(express.urlencoded())
    .use(cookieParser)

app.get('/webhook', (req,res)=>{
   return res.send('aa')
})
app.post('/webhook', (req, res) => {

console.log('Received webhook request:', req.body);

res.status(200).send('fine');

});
app.listen(PORT,()=>{
    console.log(`Service is running on ${PORT}`)
})