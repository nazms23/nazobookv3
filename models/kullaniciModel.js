const {Schema,model} = require('mongoose');

const kullaniciSchema = Schema({
    kuladi: {
        type:String,
        required: true,
    },
    sifre: {
        type:String,
        required: true,
    },
    pfoto: {
        type:String,
        required: true,
        default:'/img/bospp.jpg'
    },
    admin: {
        type:Boolean,
        required: true,
        default:false
    },
})

module.exports = model('Kullanici',kullaniciSchema) 