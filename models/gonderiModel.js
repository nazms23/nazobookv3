const {Schema,model} = require('mongoose');

const gonderiSchema = Schema({
    baslik: {
        type:String,
        required: true,
    },
    icerik:{
        type: String,
        required:true
    },
    resim:{
        type:String,
        required:false
    },
    isDuyuru:{
        type:Boolean,
        required:true,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Kullanici'
    },
    date:{
        type:Date,
        required:true,
        default: Date.now
    }

})


module.exports = model('Gonderi',gonderiSchema) 