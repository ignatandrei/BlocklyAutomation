package com.chestiiautomate.mathoperations.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

@RestController
public class MathOpsController {

    @RequestMapping(value = "/greet", method = RequestMethod.POST)
    @ApiOperation(value = "Greet the user", notes = "Greet the user with a nice message :) ")
    public String greet(@RequestParam String param) {
        return "Hello " + param + "!";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ApiOperation(value = "Add two numbers")
    public Integer add(@RequestParam Integer number1, @RequestParam Integer number2) {
        return number1 + number2;
    }

    @RequestMapping(value = "/multiply", method = RequestMethod.POST)
    @ApiOperation(value = "Multiply two numbers")
    public Integer multiply(@RequestParam Integer number1, @RequestParam Integer number2) {
        return number1 * number2;
    }

    @RequestMapping(value = "/subtract", method = RequestMethod.POST)
    @ApiOperation(value = "Substract two numbers")
    public Integer subtract(@RequestParam Integer number1, @RequestParam Integer number2) {
        return number1 - number2;
    }

    @RequestMapping(value = "/divide", method = RequestMethod.POST)
    @ApiOperation(value = "Divide two numbers")
    public float divide(@RequestParam float number1, @RequestParam float number2) {

        if (number2 == 0) {
            throw new ArithmeticException("Cannot divide by 0");
        }
        return number1 / number2;
    }
}