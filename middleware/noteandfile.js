const path = require('path');
const fs = require('fs');
const dbinfo = require('../db/db.json');
const util = require('util');
const FileIO = require('../middleware/FileIO');
const dbfile = path.join(__dirname,'../db/db.json');
const fileIO = new FileIO;
const Note = require('../Lib/NoteClass');
const { writeToFile }= require('./fsUtils')
// Promise version of fs.readFile

const readFromFile = util.promisify(fs.readFile);


const getNote = function(req,res){
  let dbarray = JSON.parse(fileIO.read(dbfile))
  for (var i=0; i < dbarray.length; i++) {
      if (dbarray[i].id === req.params.id) {
          return res.json(dbarray[i])}
      }
    return res.json({msg: "Note not found"})
}

const delNote = function(req,res){
  let dbarray = JSON.parse(fileIO.read(dbfile))
  for (var i=0; i < dbarray.length; i++) {
    if (dbarray[i].id === req.params.id) {
        let {id} = dbarray[i];
        let newdb = dbarray.filter(id => id != dbarray[i]);
        writeToFile(dbfile,newdb)
        return res.json(newdb)}
}
return res.json({msg: "Note not found"})
}

async function notedeleteProm(dbfile,idd){
  let dbarray =[];
  dbarray=JSON.parse(fileIO.read(dbfile))
  return dbarray;
  }
 
const postNote= function(req,res){
  console.info(`${req.method} request received to submit feedback`);
    if(req.body.title && req.body.text){
    let newNote = new Note(req.body.title,req.body.text)
    readFromFile(dbfile)
        .then((data)=>{
                let dbarray=JSON.parse(data)
                console.log("post",dbarray)
                dbarray.push(newNote);
                fs.writeFileSync(dbfile,JSON.stringify(dbarray))}
            )
            return res.json(dbinfo)
    } else{ return res.json({msg:"Error in inputs"}) }
  }

// read file and add to array
function noteaddProm(dbfile,newNote){
  let dbarray =[];
    dbarray=JSON.parse(fileIO.read(dbfile))
      dbarray.push(newNote);
      console.log(dbarray)
      return(dbarray);
  }


module.exports = {delNote,getNote,postNote}
