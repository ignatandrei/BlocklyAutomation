/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Example "wait" block that will pause the interpreter for a
 * number of seconds. Because wait is a blocking behavior, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */
//modified by Andrei Ignat for BlocklyScripts
exports.definitionBlocks=function(blocks_defineBlocksWithJsonArray,javaScript){
    blocks_defineBlocksWithJsonArray([{
    "type": "wait_seconds",
    "message0": " wait %1 seconds",
    "args0": [{
      "type": "field_number",
      "name": "SECONDS",
      "min": 0,
      "max": 600,
      "value": 1
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}"
  }]);

  /**
   * Generator for wait block creates call to new method
   * <code>waitForSeconds()</code>.
   */
  javaScript['wait_seconds'] = function(block) {
    var seconds = Number(block.getFieldValue('SECONDS'));
    var code = 'waitForSeconds(' + seconds + ');\n';
    return code;
  };
}
/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
//added in interpreter async
// function initInterpreterWaitForSeconds(interpreter, globalObject) {
//   // Ensure function name does not conflict with variable names.
//   Blockly.JavaScript.addReservedWords('waitForSeconds');

//   var wrapper = interpreter.createAsyncFunction(
//     function(timeInSeconds, callback) {
//       // Delay the call to the callback.
//       setTimeout(callback, timeInSeconds * 1000);
//     });
//   interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
// }

exports.waitXml=function(){
  return `
  <block type="wait_seconds"></block>
`
}