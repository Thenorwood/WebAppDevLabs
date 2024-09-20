import express from 'express';
import multer from 'multer';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop(); // get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
  });

  const upload = multer({ storage: storage });

  
  //
  //routes
  //

router.get('/', (req, res) => {
  res.send('Contacts route');
});

// Get all contacts
router.get('/all', (req, res) => {
  res.send('All contacts');
});

// Get a contact by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send('Contact by id ' + id);
});
//testing
router.post('/create', upload.single('image'),(req,res)=>{
  const filename = req.file ? req.file.filename : '';
  const { first_Name, last_Name, email, phone } = req.body;
  
  console.log('Uploaded file: ' + filename);
  console.log(`My contacts name: ${firstName} ${lastName}`);

  res.send('create contact ')
});

router.put('/update/:id', upload.single('image'),(req, res)=>{
  const id = req.params.id
  res.send('update contact by id ')
});

router.delete('/delete/:id', (req, res)=>{
  res.send('delete contact by id ')
});

export default router;

// to-do: add post, put, and delete routers
