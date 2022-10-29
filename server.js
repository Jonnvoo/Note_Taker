
// These are the packages installed for the file.
const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")

// This uniqid package is an npm package that adds random id's to your data inputs.
const uniqid = require("uniqid")

//which port the server is running on.
const PORT = 3000;

//Checks the public folder to match the file before checking the routes.
app.use(express.static("public"))

//process incoming json data
app.use(express.json());

// process incoming forming coded dat
app.use(express.urlencoded({ extended: true }));


// This route links the URL to the html homepage.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
// This route links the url to the notes html.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
// This route fetches the db.json file and adds it to the page
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: "error has occured!",
                err: err
            })

        } else {
            //Parses the data retrieved.
            console.log(data);
            const dataArr = JSON.parse(data);
            console.log(dataArr)
            res.json(dataArr)
        }
    });
})



// This post route creates the new notes and adds them to the page.
app.post('/api/notes', (req, res) => {

    // This adds onto the data created a unique id to each entry.
    const addNotes = {
        ...req.body,
        id: uniqid(),
    };

    // This reads the data from the JSON file 
    const dbFile = fs.readFileSync("./db/db.json", "utf-8");
    const dbJSON = JSON.parse(dbFile);

    // This push the new notes created into the file
    dbJSON.push(addNotes);

    // This will add the new notes created into the file
    fs.writeFile("./db/db.json", JSON.stringify(dbJSON, null, 4), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: "error has occurted!",
                err: err
            })
        }
        
        // This will send a json data response        
        res.json(dbFile);




    });

})


// This makes it so whenever you type a wrong route in the URL you will always be redirected to the homepage.
app.get('*', (reg, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


// This infroms you which port you are on.
app.listen(PORT, () => {
    console.log(`listenin on port ${PORT}`)
})