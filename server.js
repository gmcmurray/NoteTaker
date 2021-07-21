const express = require('express');
const dbinfo = require('./db/db.json')
const path = require('path');
const uuid = require('uuid');
const FileIO = require("./middleware/fileIO");
const http = require('http');
const fileIO = new FileIO;
// const logger = require('./middleware/logger');
const app =express();

const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.get('/api/notes', (req,res) => {
    res.json(dbinfo)
})

app.post('/api/notes', (req,res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text
    };
    const existingNotes = fileIO.read(`${__dirname}/db/db.json`)
    let dbarray=JSON.parse(existingNotes)
    dbarray.push(newNote)
    fileIO.write(`${__dirname}/db/db.json`,JSON.stringify(dbarray));
    res.json(dbarray)
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'public','notes.html'))
})

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));



app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))

})