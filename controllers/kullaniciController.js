const gonderiModel = require('../models/gonderiModel');
const kullaniciModel = require('../models/kullaniciModel');
const fs = require('fs');

exports.getHesabim = (req,res,next)=>{ // GET

    //req.query.isim  -> ../link?isim=sa
    //req.params.isim -> ../:isim
    res.render('Pages/Kullanici/hesabim',
    {
        title:'Hesabım',
        user: req.user 
    });
}



exports.getGonderilerim = (req,res,next)=>{ // GET

    //req.query.isim  -> ../link?isim=sa
    //req.params.isim -> ../:isim
    gonderiModel.find({userId:req.user._id}).populate('userId').sort('-date')
    .then((result) => {
        res.render('Pages/Kullanici/gonderilerim',
        {
            title:'Gönderilerim',
            gonderiler: result
        });
    }).catch((err) => {
        console.log(err)
    });
}


exports.postAyarlar = (req,res,next)=>{ // GET
    const p = req.body;
    console.log(req.file)
    if(p.sifre != req.user.sifre)
    {
        return res.render('Pages/Kullanici/hesabim',
            {
                title:'Hesabım',
                user: req.user,
                bilgiler:{kuladi:p.kuladi},
                hata:"Şifre Yanlış"
            });
    }
    if(p.kuladi != "")
    {
        kullaniciModel.findOne({kuladi:p.kuladi})
        .then((result) => {
            if(result)
            {
                return res.render('Pages/Kullanici/hesabim',
                    {
                        title:'Hesabım',
                        user: req.user,
                        bilgiler:{kuladi:p.kuladi},
                        hata:"Böyle bir kullanıcı var"
                    });
            }else
            {
                const kuladi = p.kuladi
                const sifre = p.yenisifre !="" ? p.yenisifre : req.user.sifre
                const resim = req.file!=undefined ? req.file.filename : req.user.pfoto
                kullaniciModel.updateOne({_id:req.user._id},{
                    $set:{
                        kuladi:kuladi,
                        sifre:sifre,
                        pfoto:resim
                    }
                })
                .then((result) => {
                    fs.renameSync(`./assets/kresim/${req.user.kuladi}`,`./assets/kresim/${p.kuladi}`)
                    res.redirect('/hesap/')
                }).catch((err) => {
                    console.log(err)
                });
            }
        }).catch((err) => {
            console.log(err)
        });
    }else
    {
        const kuladi = req.user.kuladi
        const sifre = p.yenisifre !="" ? p.yenisifre : req.user.sifre
        const resim = req.file!=undefined ? req.file.filename : req.user.pfoto

        kullaniciModel.updateOne({_id:req.user._id},{
            $set:{
                kuladi:kuladi,
                sifre:sifre,
                pfoto:resim
            }
        })
        .then((result) => {
            res.redirect('/hesap/')
        }).catch((err) => {
            console.log(err)
        });
    }

    
}

