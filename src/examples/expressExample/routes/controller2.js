var express = require('express');
var router = express.Router();

/* GET multiply operation */
router.get('/multiply/num1/:num1/num2/:num2', function(req, res, next) {
    /**
   * @openapi
   * '/api/multiply/num1/{num1}/num2/{num2}':
   *  get:
   *     tags:
   *     - Multiply
   *     summary: It multiplies two numbers
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
    res.send('MULTIPLYING is ' + (parseFloat(req.params.num1) * parseFloat(req.params.num2)).toString());
});

router.get('/divide/num1/:num1/num2/:num2', function(req, res, next) {
    /**
   * @openapi
   * '/api/divide/num1/{num1}/num2/{num2}':
   *  get:
   *     tags:
   *     - Divide
   *     summary: It divides two numbers
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
    res.send('DIVIDING is ' + (parseFloat(req.params.num1) / parseFloat(req.params.num2)).toString());
});

module.exports = router;
