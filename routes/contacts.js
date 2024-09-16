import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Contacts route');
});

export default router;

// Get all contacts
router.get('/all', (req, res) => {
  res.send('All contacts');
});

// Get a contact by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send('Contact by id ' + id);
});

router.post('/create', (req,res)=>{
  res.send('create contact')
});

router.put('/update', (req, res)=>{
  res.send('update contact')
});

router.delete('/delete', (req, res)=>{
  res.send('delete contact')
});

// to-do: add post, put, and delete routers
