const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.WH_HOOK | 3000

const Schema = mongoose.Schema;
   
const requestSchema = new Schema({
    headers: Array,
    ip: String,
    method: String,
    params: String,
    cookies:Array,
    protocol:String,
    body:String,
    query:String

});
 
const Request = mongoose.model("Request", requestSchema);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/gotcha*', async (req,res)=>{
    let obj=Object()
    obj.headers = req.headers
    obj.params = req.params
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
    await user.save();
    return res.send(obj)
})

app.get('/history', async(req,res)=>{
    const requests = await Request.find({})
    return res.send()
})
 
async function main() {
 
    try{
        await mongoose.connect("mongodb://mongo:27017/requests");
        app.listen(PORT);
        console.log("Сервер ожидает подключения...");
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
