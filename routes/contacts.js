import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';


const router = express.Router();


//prisma setup
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  

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
router.post('/create', upload.single('image'), async(req,res)=>{
  const filename = req.file ? req.file.filename : '';
  const { firstName, lastName, email, phone, title } = req.body;

  const contact = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      title: title,
      fileName: fileName
     
    },
  })

  res.json(contact);
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
