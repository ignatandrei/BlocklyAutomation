var express = require('express');
var router = express.Router();

/* GET sum operation */
router.get('/sum/num1/:num1/num2/:num2', function(req, res, next) {
    /**
   * @openapi
   * '/api/sum/num1/{num1}/num2/{num2}':
   *  get:
   *     tags:
   *     - Sum
   *     summary: It sums two numbers
   *     parameters:
   *      - name: num1
   *        in: path
   *        description: First number to be added
   *        required: true       
   *      - name: num2
   *        in: path
   *        description: Second number to be added
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   */
  res.send('SUMING is ' + (parseFloat(req.params.num1) + parseFloat(req.params.num2)).toString());
}); 

router.get('/substract/num1/:num1/num2/:num2', function(req, res, next) {
    /**
   * @openapi
   * '/api/substract/num1/{num1}/num2/{num2}':
   *  get:
   *     tags:
   *     - Substract
   *     summary: It substracts two numbers
   *     parameters:
   *      - name: num1
   *        in: path
   *        description: First number to be added as param
   *        required: true     
   *      - name: num2
   *        in: path
   *        description: Second number to be added as param
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   */
  res.send('SUBSTRACTING is ' + (parseFloat(req.params.num1) - parseFloat(req.params.num2)).toString());
});

module.exports = router;
