const bodyParser = require("body-parser"); 
const path = require('path');
module.exports.post = bodyParser.urlencoded({extended:false})

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,`./assets/gresim/${req.user.kuladi}/`) //dosya yolu
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname)) //dosya adı
    }
})
module.exports.gonderiresim = multer({storage: storage}).single('gonderiresim') //sondaki imageUrl formdaki name