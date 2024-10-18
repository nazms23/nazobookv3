const fs = require('fs');


module.exports.kulresimsil = (req,res,next)=>{
    if(req.user.pfoto != '/img/bospp.jpg' && req.file !=undefined)
    {
        fs.unlinkSync(`./assets/kresim/${req.user.kuladi}/${req.user.pfoto}`)
    }
    next()
}