module.exports.isGirisYapti = (req,res,next)=>{
    if(!req.user)
    {
        return res.redirect('/girisyap')
    }
    next()
}

module.exports.isAdmin = (req,res,next)=>{
    if(!req.user || !req.user.admin)
    {
        return res.redirect('/girisyap')
    }
    next()
}