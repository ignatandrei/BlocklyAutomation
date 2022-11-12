
import { Field, CategoryReact, BlockReact, Value, Shadow, Mutation } from "../BlocklyFields";
import waitBlock from "../BlocklyReusable/BlocklyNewBlocks/wait_block";

function ToolboxBlocksCore(props:any){
    return <>
    <CategoryReact name="Blockly Core">
<CategoryReact id="catLogic" colour="210" name="Logic">
    <BlockReact type="controls_if"></BlockReact>
    <BlockReact type="logic_compare"></BlockReact>
    <BlockReact type="logic_operation"></BlockReact>
    <BlockReact type="logic_negate"></BlockReact>
    <BlockReact type="logic_boolean"></BlockReact>
    <BlockReact type="logic_null"></BlockReact>
    <BlockReact type="logic_ternary"></BlockReact>
</CategoryReact>
<CategoryReact id="catLoops" colour="120" name="Loops">
    <BlockReact type="controls_repeat_ext">
        <Value name="TIMES">
            <Shadow type="math_number">
                <Field name="NUM">10</Field>
            </Shadow>
        </Value>
    </BlockReact>
    <BlockReact type="controls_whileUntil"></BlockReact>
    <BlockReact type="controls_for">
        <Value name="FROM">
            <Shadow type="math_number">
                <Field name="NUM">1</Field>
            </Shadow>
        </Value>
        <Value name="TO">
            <Shadow type="math_number">
                <Field name="NUM">10</Field>
            </Shadow>
        </Value>
        <Value name="BY">
            <Shadow type="math_number">
                <Field name="NUM">1</Field>
            </Shadow>
        </Value>
    </BlockReact>
    <BlockReact type="controls_forEach"></BlockReact>
    <BlockReact type="controls_flow_statements"></BlockReact>
</CategoryReact>
<CategoryReact id="catMath" colour="230" name="Math">
        <BlockReact type="math_number"></BlockReact>
        <BlockReact type="math_arithmetic">
            <Value name="A">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="B">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_single">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">9</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_trig">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">45</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_constant"></BlockReact>
        <BlockReact type="math_number_property">
            <Value name="NUMBER_TO_CHECK">
                <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_change">
            <Value name="DELTA">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_round">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">3.1</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_on_list"></BlockReact>
        <BlockReact type="math_modulo">
            <Value name="DIVIDEND">
                <Shadow type="math_number">
                    <Field name="NUM">64</Field>
                </Shadow>
            </Value>
            <Value name="DIVISOR">
                <Shadow type="math_number">
                    <Field name="NUM">10</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_constrain">
            <Value name="value">
                <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                </Shadow>
            </Value>
            <Value name="LOW">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="HIGH">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_random_int">
            <Value name="FROM">
                <Shadow type="math_number">
                    <Field name="NUM">1</Field>
                </Shadow>
            </Value>
            <Value name="TO">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="math_random_float"></BlockReact>
    </CategoryReact>
    <CategoryReact id="catText" colour="160" name="Text">
        <BlockReact type="text"></BlockReact>
        <BlockReact type="text_join"></BlockReact>
        <BlockReact type="text_append">
            <Value name="TEXT">
                <Shadow type="text"></Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_length">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_isEmpty">
            <Value name="Value">
                <Shadow type="text">
                    <Field name="TEXT"></Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_indexOf">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
            <Value name="FIND">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_charAt">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="text_getSubstring">
            <Value name="STRING">
                <BlockReact type="variables_get">
                    <Field name="VAR">text</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="text_changeCase">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_trim">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_print">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="text_prompt_ext">
            <Value name="TEXT">
                <Shadow type="text">
                    <Field name="TEXT">abc</Field>
                </Shadow>
            </Value>
        </BlockReact>
    </CategoryReact>
    <CategoryReact id="catLists" colour="260" name="Lists">
        <BlockReact type="lists_create_with">
            <Mutation items="0"></Mutation>
        </BlockReact>
        <BlockReact type="lists_create_with"></BlockReact>
        <BlockReact type="lists_repeat">
            <Value name="NUM">
                <Shadow type="math_number">
                    <Field name="NUM">5</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="lists_length"></BlockReact>
        <BlockReact type="lists_isEmpty"></BlockReact>
        <BlockReact type="lists_indexOf">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_getIndex">
            <Value name="Value">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_setIndex">
            <Value name="LIST">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_getSublist">
            <Value name="LIST">
                <BlockReact type="variables_get">
                    <Field name="VAR">list</Field>
                </BlockReact>
            </Value>
        </BlockReact>
        <BlockReact type="lists_split">
            <Value name="DELIM">
                <Shadow type="text">
                    <Field name="TEXT">,</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="lists_sort"></BlockReact>
    </CategoryReact>
    <CategoryReact id="catColour" colour="20" name="Color">
        <BlockReact type="colour_picker"></BlockReact>
        <BlockReact type="colour_random"></BlockReact>
        <BlockReact type="colour_rgb">
            <Value name="RED">
                <Shadow type="math_number">
                    <Field name="NUM">100</Field>
                </Shadow>
            </Value>
            <Value name="GREEN">
                <Shadow type="math_number">
                    <Field name="NUM">50</Field>
                </Shadow>
            </Value>
            <Value name="BLUE">
                <Shadow type="math_number">
                    <Field name="NUM">0</Field>
                </Shadow>
            </Value>
        </BlockReact>
        <BlockReact type="colour_blend">
            <Value name="COLOUR1">
                <Shadow type="colour_picker">
                    <Field name="COLOUR">#ff0000</Field>
                </Shadow>
            </Value>
            <Value name="COLOUR2">
                <Shadow type="colour_picker">
                    <Field name="COLOUR">#3333ff</Field>
                </Shadow>
            </Value>
            <Value name="RATIO">
                <Shadow type="math_number">
                    <Field name="NUM">0.5</Field>
                </Shadow>
            </Value>
        </BlockReact>
    </CategoryReact>
    <CategoryReact id="catVariables" colour="330" custom="VARIABLE" name="Variables"></CategoryReact>
    <CategoryReact id="catFunctions" colour="290" custom="PROCEDURE" name="Functions"></CategoryReact>

</CategoryReact>




    </>


}
export default ToolboxBlocksCore;