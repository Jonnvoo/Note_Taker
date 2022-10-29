const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")
const uniqid = require("uniqid")
const PORT = 3000;

app.use(express.static("public"))
//passing data through server through json
app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: "error has occured!",
                err: err
            })

        } else {
            console.log(data);
            const dataArr = JSON.parse(data);
            console.log(dataArr)
            res.json(dataArr)
        }
    });
})




app.post('/api/notes', (req, res) => {
    const addNotes = {
        ...req.body,
        id: uniqid(),
    };
    const dbFile = fs.readFileSync("./db/db.json", "utf-8");
    const dbJSON = JSON.parse(dbFile);

    dbJSON.push(addNotes);

    fs.writeFile("./db/db.json",JSON.stringify(dbJSON, null,4 ), (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                msg: "error has occurted!",
                err:err
            })
        }
            res.json(dbFile);
        
      
    
    
});

})



app.get('*', (reg, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})



app.listen(PORT, () => {
    console.log(`listenin on port ${PORT}`)
})