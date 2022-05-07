const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/uploads');
    },
    filename : (req, file, cd) => {
        cd(null, Date.now() + file.originalname);
    }
})


const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10mb
        files:4,
    },
});

module.exports = upload;