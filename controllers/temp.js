exports.isim = (req,res,next)=>{ // GET

    //req.query.isim  -> ../link?isim=sa
    //req.params.isim -> ../:isim

    res.render('Pages/isim/isim',
    {
        //sayfaya gönderilcekler
        isim:'deger'
    });
}

exports.isim = (req,res,next)=>{ // POST
    //const p = req.body;
    //const f = req.file;


    res.redirect('link');
}