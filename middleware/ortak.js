module.exports = (req,res,next)=>{
    //res.locals.isim= 'deger'
    //res.locals.csrfToken = req.csrfToken()

    res.locals.girisyapili = req.user?true:false
    res.locals.admin = req.user&&req.user.admin
    next()
}