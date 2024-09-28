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
 
app.set("view engine", "hbs");
app.set("views", __dirname + "/static"); 
app.use("/", function(_, response){
     
    response.render("contact.hbs", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    });
});
app.listen(3000);
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
