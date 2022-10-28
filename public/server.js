const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")
const PORT= 3000;

app.use(express.static("public"))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,"./notes.html"))
})

app.get('/api/notes', (req, res)=>{
    fs.readFile("/db.json","utf-8", (err,data)=>{
        if(err){
            throw err
        }else{
            console.log(data);
            res.send("req recived")
        }
    });
    // res.send("this is one notes")
})


app.post('/api/notes', (req, res)=>{
    res.send("this is will create notes")
})

app.get('*',(reg, res)=>{
    res.send('this is the 404 page');
})



app.listen(PORT,()=>{
    console.log(`listenin on port ${PORT}`)
})