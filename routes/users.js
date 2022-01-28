var express = require('express');
var router = express.Router();

const findAllUsers = require('../controllers/user').findAllUsers;
const addUser = require('../controllers/user').addUser;

router.get('/', async (req, res, next) => {
  try {
    var users = await findAllUsers();
    
    if (users === false) {

      res.sendStatus(500);
    }
    else {
      res.status(200).json(users);
    }
  }
  catch(err) {
    res.sendStatus(500);
  }  
});

router.post('/add_user', async (req, res, next) => {
  try {
    var user = await addUser(req.body.nickname);
    if (user === false) {
      res.sendStatus(500);
    }
    else if (user === 1) {
      res.sendStatus(400);
    }
    else {
      res.status(200).json(user);
    }
  }
  catch (error) {
    res.sendStatus(500);
  }
});


module.exports = router;
