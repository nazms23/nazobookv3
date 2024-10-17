const express = require("express");
const router = express.Router();

//! Controllerler
//const controller = require('../controllers/controller'); örn
const {getGonderilerim} = require('../controllers/kullaniciController')

//! Middlewareler
//const mw = require('../middleware/mw') örn



//! Routes
//router.get('/link',(middleware),controller); get örn
//router.post('/link',(middleware),controller); post örn
//router.get('/:degisken',(middleware).controller); değişkenli get


router.get('/gonderiler',getGonderilerim)









module.exports = router;