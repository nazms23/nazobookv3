const {Schema,model} = require('mongoose');

const isimSchema = Schema({
    isim: {
        type:tip,
        required: true,
        default: '?'
    },
    isimId:{ // başka tablo referans
        type: Schema.Types.ObjectId,
        ref:'model Adı',
        required:true
    },
    isim:[{ //dizi
        type:tip,
        required:false
    }],
    isim:{ //obje
        isim:[{
            type:tip,
            //...
        }] //objenin elemanları
    }

})

isimSchema.methods.isim =()=>{
//.....    
}


module.exports = mongoose.model('Model Adı',isimSchema) 