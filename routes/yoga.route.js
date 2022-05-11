const router = require('express').Router();
const yoga = require('../model/yoga')
const upload = require('../config/multerConfig')

// get all yoga
router.get('/', async(req, res) => {
    try {
        const data = await yoga.find({})
        res.status(200).json({success:true, data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
})

// get one yoga

router.get('/:id', async(req, res) => {
    try {
        
        const id = req.params.id;
        const data = await yoga.findById(id);
        res.status(200).json({success:true, data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
  
  // create a yoga
  router.post('/', upload.single('image'), async(req, res) => {
    try {

        const file = req.file;
       // console.log(file);
        const {heading, desc } = req.body;
        if(!heading || !desc) {
            return  res.status(400).json({success:false, message:"kindly provide all required fields"})  
        }
        //console.log(req.file);

        const fileName = file.filename || "no-image.jpg"
        const data = await yoga.create({
            heading:heading,
            desc:desc, 
            image:fileName
        })
        res.status(201).json({success:true, message:"created successufully", data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })

// update a yoga 

router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id; 
        const {heading, desc } = req.body;
        if(!heading || !desc) {
            return res.status(400).json({success:false, message:"kindly provide all required fields"})  
        }
        const data = await yoga.findByIdAndUpdate(id, {
            heading:heading,
            desc:desc
        }, {new:true});
        res.status(200).json({success:true, message:"updated succesfully ",data})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
  // delete a yoga
  router.delete('/:id', async(req, res) => {
    try {
        
        const id = req.params.id;
        const data = await yoga.findByIdAndRemove(id);
        res.status(200).json({success:true, message:"deleted successufully"})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
  })
  
module.exports = router
