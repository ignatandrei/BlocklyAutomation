var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function (req, res, next) {
  /**
   * @openapi
   * /index:
   *  get:
   *     tags:
   *     - Index
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App & running...
   */
  res.render('index', { title: 'Express' });
});

module.exports = router;
