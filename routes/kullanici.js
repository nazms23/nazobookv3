const express = require("express");
const router = express.Router();

//! Controllerler
//const controller = require('../controllers/controller'); örn
const {getHesabim,postAyarlar,getGonderilerim} = require('../controllers/kullaniciController');

//! Middlewareler
//const mw = require('../middleware/mw') örn
const { isGirisYapti,isAdmin } = require("../middleware/girisbilgi");
const { post,kullaniciresim } = require("../middleware/form");
const { kulresimsil } = require("../middleware/diger");

//! Routes
//router.get('/link',(middleware),controller); get örn
//router.post('/link',(middleware),controller); post örn
//router.get('/:degisken',(middleware).controller); değişkenli get


router.get('/',isGirisYapti,getHesabim)
router.post('/',isGirisYapti,kullaniciresim,kulresimsil,postAyarlar)
router.get('/gonderiler',isGirisYapti,getGonderilerim)









module.exports = router;