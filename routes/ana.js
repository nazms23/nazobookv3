const express = require("express");
const router = express.Router();
const { post,gonderiresim } = require("../middleware/form");

//! Controllerler
//const controller = require('../controllers/controller'); örn
const {getAnasayfa,postGonderiOlustur,getDuyurular,getGirisyap,postGirisyap,getKayitol,postKayitOl,getCikisyap} = require('../controllers/anaController');

//! Middlewareler
//const mw = require('../middleware/mw') örn



//! Routes
//router.get('/link',(middleware),controller); get örn
//router.post('/link',(middleware),controller); post örn
//router.get('/:degisken',(middleware).controller); değişkenli get


router.get('/',getAnasayfa);
router.post('/',post,gonderiresim,postGonderiOlustur);
router.get('/duyurular',getDuyurular);

router.get('/girisyap',getGirisyap)
router.post('/girisyap',post,postGirisyap)
router.get('/kayitol',getKayitol)
router.post('/kayitol',post,postKayitOl)
router.get('/cikisyap',post,getCikisyap)










module.exports = router;