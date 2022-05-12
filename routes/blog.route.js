const router = require('express').Router();
const Blog = require('../model/blog')
const upload = require('../config/multerConfig')

// get all blog
router.get('/', async(req, res) => {
    try {
        const data = await Blog.find({})
        res.status(200).json({success:true, data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
})

// get one blog 

router.get('/:id', async(req, res) => {
    try {
        
        const id = req.params.id;
        const data = await Blog.findById(id);
        res.status(200).json({success:true, data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
  
  // create a blog
  router.post('/', upload.single('image'), async(req, res) => {
    try {

        const file = req.file;
       // console.log(file);
        const {heading, desc, author } = req.body;
        if(!heading || !desc) {
            return  res.status(400).json({success:false, message:"kindly provide all required fields"})  
        }
        //console.log(req.file);

        const fileName = file.filename || "no-image.jpg"
        const data = await Blog.create({
            heading:heading,
            desc:desc, 
            author: author,
            image:fileName
        })
        res.status(201).json({success:true, message:"created successufully", data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })

// update a blog 

router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id; 
        const {heading, desc } = req.body;
        if(!heading || !desc) {
            return res.status(400).json({success:false, message:"kindly provide all required fields"})  
        }
        const data = await Blog.findByIdAndUpdate(id, {
            heading:heading,
            desc:desc
        }, {new:true});
        res.status(200).json({success:true, message:"updated succesfully ",data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
  // delete a blog
  router.delete('/:id', async(req, res) => {
    try {
        
        const id = req.params.id;
        const data = await Blog.findByIdAndRemove(id);
        res.status(200).json({success:true, message:"deleted successufully"})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
module.exports = router
