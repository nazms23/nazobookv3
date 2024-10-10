module.exports.isGirisYapti = (req,res,next)=>{
    /* if(!req.session.isAuthenticated)
    {
        req.session.redirectTo = req.url
        return res.redirect('/login')
    } */
    next()
}

module.exports.isAdmin = (req,res,next)=>{
    /* if(!req.session.isAuthenticated)
    {
        req.session.redirectTo = req.url
        return res.redirect('/login')
    } */
    next()
}