const uuid = require("../middleware/uuid")
// const dbfile = path.join(__dirname,'../db/db.json');
class Note{
    constructor(title,text){
        this.id=uuid();
        this.title=title;
        this.text=text

    }
    getTitle(){
        return this.title;
    }
    getId(){
        return this.id;
    }
    getText(){
        return this.text;
    }
}

module.exports = Note