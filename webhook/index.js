const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.WH_HOOK || 3000
const DB = process.env.MONGODB_URL || "mongodb://root:example@mongo:27017"
const Schema = mongoose.Schema;
   
const requestSchema = new Schema({
    url:String,
    headers: Object,
    ip: String,
    method: String,
    params: String,
    cookies:Object,
    protocol:String,
    body:Object,
    query:Object,
    date: { type: Date, default: Date.now },
});
 
const Request = mongoose.model("Request", requestSchema);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/gotcha*', async (req,res)=>{
    let obj=Object()
    obj.url =req.protocol+'://' + req.get('uri') +req.originalUrl
    obj.headers = req.headers
    obj.params = req.params[0]
    obj.protocol = req.protocol
    obj.cookies = req.headers?.cookie?.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
      }, {});
    obj.ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) + ':' + req.socket.remotePort
    obj.body = req.body
    obj.query = req.query
    obj.method = req.method
    const request = new Request(obj)
    await request.save();
    console.log(request)
    return res.send(obj)
})

app.get('/history', async(req,res)=>{
    const requests = await Request.find({}).sort({'date': -1})
    return res.send(requests)
})
 
async function main() {
 
    try{
        console.log(DB)
        await mongoose.connect("mongodb://root:example@mongo:27017");
        app.listen(PORT);
        console.log("Сервер ожидает подключения..."+PORT);
    }
    catch(err) {
        return console.log(err);
    }
}
main()
process.on("SIGINT", async() => {
      
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});
