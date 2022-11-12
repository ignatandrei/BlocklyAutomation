
import { Field, CategoryReact, BlockReact, Value, Shadow, Mutation } from "../BlocklyFields";
import waitBlock from "../BlocklyReusable/BlocklyNewBlocks/wait_block";

function ToolboxBlocksAdvanced(props:any){
    return <>
<CategoryReact name="Advanced">
    {/* TODO:register from fieldXML */}
    <CategoryReact id="Audio" name="Audio">
    <BlockReact type="ttsBlock">
        <Value name="NAME">
            <Shadow type="text">
            <Field name="TEXT">Hello</Field></Shadow>
        </Value>       
        </BlockReact>

        <BlockReact type="pianoBlock">
        <Value name="Note">
            <Shadow type="text">
            <Field name="TEXT">C</Field></Shadow>
        </Value>       
        <Value name="Octave">
            <Shadow type="math_number">
            <Field name="NUM">4</Field></Shadow>
        </Value>       
        <Value name="Sharp">
            <Shadow type="logic_boolean">
            <Field name="BOOL">FALSE</Field></Shadow>
        </Value>       
        
        <Value name="Duration">
            <Shadow type="math_number">
            <Field name="NUM">2</Field></Shadow>
        </Value>       
        </BlockReact>
        <BlockReact type="cmajor"></BlockReact>
    </CategoryReact>

<CategoryReact id="catTimers"  name="Timers">
    <BlockReact type={waitBlock.nameBlock}></BlockReact>
</CategoryReact>

<CategoryReact id="catDates"  name="Dates">
<BlockReact type="text_print" >
    <Value name="TEXT">
    <BlockReact type="displayCurrentDate"></BlockReact>
    </Value>
    </BlockReact>
</CategoryReact>

<CategoryReact id="XHR" name="HTTP Request">

<BlockReact type="headersbeforehttp">
    <Value name="HttpDomain">
        <Shadow type="text">
            <Field name="TEXT">(localSite)</Field>
        </Shadow>
    </Value>
    <Value name="HeaderName">
        <Shadow type="text">
            <Field name="TEXT">Authorization</Field>
        </Shadow>
    </Value>
    <Value name="HeaderValue">
        <Shadow type="text_join">

        </Shadow>
    </Value>
</BlockReact>
<BlockReact type="text_print">
<Value name="TEXT">

    <BlockReact type="httprequest">
    <Value name="TheUrl">
        <Shadow type="text">
            <Field name="TEXT">https://httpbin.org/get</Field>
        </Shadow>
    </Value>
</BlockReact>
</Value>
</BlockReact>    



<BlockReact type="credsforhttp">
    <Value name="HttpDomain">
        <Shadow type="text">
            <Field name="TEXT">(localSite)</Field>
        </Shadow>
    </Value>
    <Value name="WithCreds">
        <Shadow type="logic_boolean">
            <Field name="BOOL">FALSE</Field>
        </Shadow>
    </Value>
</BlockReact>

</CategoryReact>

</CategoryReact>


    </>


}
export default ToolboxBlocksAdvanced;
    ;