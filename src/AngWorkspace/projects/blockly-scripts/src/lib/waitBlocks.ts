// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    blocks['wait'] = {
    init: function() {
      this
			.appendValueInput('VALUE')            
            .appendField('wait secs');
          // .appendField("delay")
          // .appendField(new Blockly.FieldNumber(10, 0), "wait")
          // .appendField("secs");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      //this.setColour();
      //this.setTooltip('');
      //this.setHelpUrl('');
    }
  };

  javaScript['wait'] = function(block) {
    var number_wait = javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC)|| '';    
    var code= 'waitTime('+ 	number_wait+');';
	return code;
  };
  
  
  blocks['wait_until'] = {
    init: function() {
      this
			.appendValueInput('VALUE')            
            .appendField('wait until date');
          
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      //this.setColour();
      //this.setTooltip('');
      //this.setHelpUrl('');
    }
  };

  javaScript['wait_until'] = function(block) {
    var number_wait = javaScript.valueToCode(block, 'VALUE', /*javaScript.*/ORDER_ATOMIC)|| '';    
    //console.log(number_wait);
	
	var code= 'waitTime(('+ number_wait+'-new Date())/1000);';
	return code;
  };

}

exports.fieldXML = function () {
    return `
    <block type="wait">

    <value name="VALUE">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>

</block>
<block type="wait_until">

</block>`;
}
