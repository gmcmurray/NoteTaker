// const { notDeepStrictEqual } = require('assert');
const path = require('path');
// const { noteaddProm } = require('../middleware/fsUtils');
const router = require('express').Router();

// Displays notes.html page
router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/notes.html'))
})

// Displays index.html page - home page
router.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))

})

module.exports = router