require('dotenv').config()
let express = require('express');
const req = require('express/lib/request');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/file",(req,res) => {
    const absolutePath = __dirname+'/views/index.html';
    res.sendFile(absolutePath);
    console.log("file");
})

app.use(function middleware(req,res,next){
    console.log(req.method + req.path + req.ip);
    next();
})

app.get("/", (req, res) => {
    res.send("Hello Express");
    console.log("/");
});

app.use("/public",express.static(__dirname+'/public'));

app.get("/json",(req,res) => {
    if(process.env.MESSAGE_STYLE==="uppercase"){
        res.json({
            "message":"HELLO JSON"
        })
    }else{
        res.json({
            "message":"hello json"
        })
    }
})

app.get("/now",(req,res,next)=>{
    req.time = new Date().toString();
    next();
},(req,res)=>{
    res.json({
        time:req.time
    })
})

app.get("/:word/echo",(req,res)=>{
    res.json({
        echo:req.params.word
    })
})

app.get("/name",(req,res)=>{
    res.json({
        name:req.query.first + " " +req.query.last
    })
})

app.post("/name",(req,res)=>{
    res.json({
        name:req.body.first + " " +req.body.last
    })
})








































 module.exports = app;
