module.exports = (req,res,next)=>{
    //res.locals.isim= 'deger'

    res.locals.csrfToken = req.csrfToken()
    next()
}