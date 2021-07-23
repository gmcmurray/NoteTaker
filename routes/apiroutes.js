const express = require('express')
 const router = require('express').Router();
 const dbinfo = require('../db/db.json');
 const FileIO = require('../middleware/FileIO');
 const readAndAppend = require('../middleware/noteandfile')
 const writeToFile = require('../middleware/noteandfile')
 const uuid = require('../middleware/uuid');
 const http = require('http');
 const path = require('path');
 const dbfile = path.join(__dirname,'../db/db.json');
const fileIO = new FileIO;
const fs = require('fs')


router.get('/notes', (req,res) => {
    res.json(dbinfo)
})

router.post('/notes', (req,res) => {
    const dbfile = path.join(__dirname,'../db/db.json');
    const newNote = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text
    } 
    const textdata = fs.readFileSync(dbfile, 'utf8');
    const parsedData = JSON.parse(textdata);
    parsedData.push(newNote);
    fs.writeFileSync(dbfile, JSON.stringify(parsedData));
    // readAndAppend(newNote,dbfile)
    res.json(parsedData)
}
)

router.get('/notes/:id', (req,res) => {
    let dbarray = JSON.parse(fileIO.read(dbfile))
    for (var i=0; i < dbarray.length; i++) {
        if (dbarray[i].id === req.params.id) {
            return res.json(dbarray[i])}
        }
    return res.json({msg: "Aint nobody here but us chickens!"})
    }
   )

router.delete('/notes/:id', (req,res) => {
    let dbarray = JSON.parse(fileIO.read(dbfile))
    for (var i=0; i < dbarray.length; i++) {
        if (dbarray[i].id === req.params.id) {
            let {id} = dbarray[i];
            let newdb = dbarray.filter(id => id != dbarray[i]);
            writeToFile(dbfile,newdb)
            return res.json(newdb)}
    }
    return res.json({msg: "Aint nobody here but us chickens!"})
})


module.exports = router