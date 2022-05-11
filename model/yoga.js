const mongoose= require('mongoose')
const yogaSchema= new mongoose.Schema({
    image: {
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})
 
module.exports = mongoose.model('yoga', yogaSchema)