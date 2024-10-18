const bodyParser = require("body-parser"); 
const path = require('path');
module.exports.post = bodyParser.urlencoded({extended:false})

const multer = require('multer');
const storages = {
    gonderistorage:multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,`./assets/gresim/${req.user.kuladi}/`) //dosya yolu
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname)) //dosya adı
        }
    }),
    kullanicistorage:multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,`./assets/kresim/${req.user.kuladi}/`) //dosya yolu
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname)) //dosya adı
        }
    })
}

module.exports.gonderiresim = multer({storage: storages.gonderistorage}).single('gonderiresim') //sondaki imageUrl formdaki name
module.exports.kullaniciresim = multer({storage: storages.kullanicistorage}).single('kulresim')