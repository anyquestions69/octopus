const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.WH_HOOK | 3000

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
app.use()

app.get('/history', async(req,res)=>{
    const requests = await Request.find({}).sort({'date': -1})
    return res.send(requests)
})
 

async function main() {
 
    try{
        await mongoose.connect("mongodb://root:example@mondo:27017");
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
