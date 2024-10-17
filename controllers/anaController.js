const kullaniciModel = require("../models/kullaniciModel");
const gonderiModel = require('../models/gonderiModel')
const fs = require('fs')

exports.getAnasayfa = (req,res,next)=>{ // GET

    gonderiModel.find().populate('userId').sort('-date')
    .then((result) => {
        res.render('Pages/Ana/anasayfa',
        {
            title:'Anasayfa',
            gonderiler: result
        });
    }).catch((err) => {
        console.log(err)
    });
    
}
exports.postGonderiOlustur = (req,res,next)=>{
    const p = req.body;

    if(p.baslik == "" || p.icerik == "")
    {
        gonderiModel.find().populate('userId').sort('-date')
        .then((result) => {
            return res.render('Pages/Ana/anasayfa',
            {
                title:'Anasayfa',
                gonderiler: result,
                bilgiler:{baslik:p.baslik,icerik:p.icerik},
                hata:"Gerekli yerler boş bırakılamaz"
            });
        }).catch((err) => {
            console.log(err)
        });
        return
    }
    
    const gonderi = new gonderiModel({
        baslik:p.baslik,
        icerik:p.icerik,
        resim: req.file? `/gresim/${req.user.kuladi}/${req.file.filename}`:'',
        isDuyuru: req.user.admin && p.isDuyuru? true:false,
        userId:req.user._id
    }).save()
    .then((result) => {
        res.redirect('/')
    }).catch((err) => { 
        console.log(err)
    });

}


exports.getGirisyap =(req,res,next)=>{
    res.render('Pages/Ana/girisyap',{
        title:'Giriş Yap'
    })
}
exports.getKayitol =(req,res,next)=>{
    res.render('Pages/Ana/kayitol',{
        title:'Kayıt Ol'
    })
}

exports.postGirisyap =(req,res,next)=>{
    const p = req.body;

    kullaniciModel.findOne({kuladi:p.kuladi,sifre:p.sifre})
    .then((user) => {
        if(user)
        {
            req.session.user = user
            res.redirect('/')
        }else
        {
            res.render('Pages/Ana/girisyap',{
                title:'Giriş Yap',
                bilgiler:{kadi:p.kuladi},
                hata:'Kullanıcı adı veya şifre yanlış'
            })
        }
    }).catch((err) => {
        
    });


}

exports.postKayitOl =(req,res,next)=>{
    const p = req.body;

    if(p.sifre.trim() == "" || p.tsifre.trim() == "" || p.kuladi.trim() == "")
    {
        return res.render('Pages/Ana/kayitol',{
            title:'Kayıt Ol',
            bilgiler:{kadi:p.kuladi},
            hata:'Boş bırakılamaz'
        })
    }
    else if(p.sifre != p.tsifre)
    {
        return res.render('Pages/Ana/kayitol',{
            title:'Kayıt Ol',
            bilgiler:{kadi:p.kuladi},
            hata:'Şifreler Uyuşmuyor'
        })
    }
    
    kullaniciModel.findOne({kuladi: p.kuladi})
    .then((u) => {
        if(u)
        {
            return res.render('Pages/Ana/kayitol',{
                title:'Kayıt Ol',
                bilgiler:{kadi:p.kuladi},
                hata:'Bu kullanıcı adında biri var zaten'
            })
        }
        else
        {
            fs.mkdirSync(`./assets/kresim/${p.kuladi}`)
            fs.mkdirSync(`./assets/gresim/${p.kuladi}`)
            const kul = new kullaniciModel({
                kuladi:p.kuladi,
                sifre:p.sifre
            })
            return kul.save()
        }
    })
    .then((result) => {
        console.log(result)
        
        res.redirect('/girisyap');
    }).catch((err) => {
        console.log(err)
    });
}
exports.getCikisyap=(req,res,next)=>{
    req.session.destroy()
    res.redirect('/')
}



exports.getDuyurular = (req,res,next)=>{ // GET

    gonderiModel.find({isDuyuru:true}).populate('userId').sort('-date')
    .then((result) => {
        res.render('Pages/Ana/duyurular',
        {
            title:'Duyurular',
            gonderiler: result
        });
    }).catch((err) => {
        console.log(err)
    });
    
}