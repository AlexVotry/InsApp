var express = require('express');
var router = express.Router();



router.get('/', (req, res, next)=> {
  // log(req.user.admin);
  res.render('index');
});

router.get('/logout', (req, res, next) => {
  req.user = null;
  res.redirect('/');
});


module.exports = router;
