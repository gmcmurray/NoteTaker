const express = require('express')
const router = require('express').Router();

const FileIO = require('../middleware/FileIO');

const uuid = require('../middleware/uuid');
const http = require('http');
const path = require('path');
const dbfile = path.join(__dirname,'../db/db.json');
const fileIO = new FileIO;
const fs = require('fs')
const { writeToFile, readFromFile }= require('../middleware/fsUtils')
const {getNote, delNote, postNote} = require('../middleware/noteandfile')

router.get('/notes', (req,res) => {
    console.info(`${req.method} request received to submit feedback`);
    readFromFile(dbfile).then((data) => res.json(JSON.parse(data)));
});

router.post('/notes', (req,res) => postNote(req,res));

router.get('/notes/:id', (req,res) => getNote(req,res));

router.delete('/notes/:id', (req,res) => delNote(req,res));


module.exports = router