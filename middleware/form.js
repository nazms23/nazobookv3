const bodyParser = require("body-parser"); 
module.exports.post = bodyParser.urlencoded({extended:false})

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./assets/img/') //dosya yolu
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname)) //dosya adı
    }
})
module.exports.files = multer({storage: storage}).single('imageUrl') //sondaki imageUrl ne bilmiyom 