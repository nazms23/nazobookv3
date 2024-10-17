const mongoose = require('mongoose');
const path  = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)
//const csurf = require('csurf');
const ortak = require('./middleware/ortak')
const app = express();

//! Veritabanı Modeller
// const model = require("./models/model");  -- ÖRN
const kullaniciModel = require('./models/kullaniciModel');

//! Routes
//const route = require('./routes/route'); -- ÖRN
const anaRoute = require('./routes/ana');
const kullanciRoute = require('./routes/kullanici');



const databaseurl = process.env.DATABASE_URL


app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'assets')))
app.use(cookieParser());
app.use(session({
    secret:'kullanicisessions',
    resave: false,
    saveUninitialized:false,
    store:new mongoDbStore({
        uri: databaseurl,
        collection:'mySessions'
    })
}))
//app.use(csurf());
app.use((req,res,next)=>{   //? KULLANICI İŞLEMLERİ

    if(!req.session.user)
    {
        return next()
    }


    kullaniciModel.findById(req.session.user._id)
    .then((user) => {
        req.user = user
        next()
    }).catch((err) => {
        console.log(err)
    });
})
app.use(ortak)
//! Routes Use
//app.use('/isim',route); -- ÖRN Uzantılı
//app.use(route); -- ÖRN Normal
app.use('/hesap',kullanciRoute);
app.use(anaRoute);


//404 Bulunamadı
app.use((req,res)=>{
    res.status(404).render('Pages/Error/404',{title:'Sayfa Bulunamadı'});
})






//! Veritabanı Bağlantı
mongoose.connect(databaseurl)
.then((result) => {
    console.log('baglandi')
    app.listen(3000);
}).catch((err) => {
    console.log(err)
});


