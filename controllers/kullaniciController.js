const gonderiModel = require('../models/gonderiModel')


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

