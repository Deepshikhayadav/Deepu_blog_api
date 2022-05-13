const mongoose= require('mongoose')
const blogSchema= new mongoose.Schema({
    image: {
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})
 



module.exports = mongoose.model('blog', blogSchema)