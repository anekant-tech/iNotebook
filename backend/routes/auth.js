const express = require('express');
const router = express.Router();
const User = require('../models/User')
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Anekantisagoodb$oy';

// Route:-1 Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {

    // If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
  
  
      // res.json(user)
      res.json({authtoken})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
// Route:2- Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})
// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
  // Create a newNote object
  const newNote  = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});

  })
  // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router 