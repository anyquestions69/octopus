const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.WH_HOOK | 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/gotcha*', (req,res)=>{
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
    return res.send(obj)
})

const Schema = mongoose.Schema;
   
const userScheme = new Schema({
    name: String,
    age: Number
});
 
const User = mongoose.model("User", userScheme);
 
async function main() {
 
    await mongoose.connect("mongodb://mongo:27017/requests");
     
    const tom = new User({name: "Tom", age: 34});
    // добавляем объект в БД
    await tom.save();
    console.log(tom);
}
main().catch(console.log).finally(async()=>await mongoose.disconnect());
app.listen(PORT,(error)=>{
    if(error) return console.error(error)
    console.log(`Service is running on ${PORT}`)
})