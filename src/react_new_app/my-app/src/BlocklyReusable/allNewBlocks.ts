import CurrentDateBlock from "./BlocklyNewBlocks/dates/CurrentDateBlock";
import { CredsBlocks } from "./BlocklyNewBlocks/http/WindowsCreds";
import { HttpBlocks } from "./BlocklyNewBlocks/http/xhrBlocks";
import { FilterBlocks } from "./BlocklyNewBlocks/list/filterBlocks";
import { piano } from "./BlocklyNewBlocks/piano";
import { tts } from "./BlocklyNewBlocks/tts";
import waitBlock from "./BlocklyNewBlocks/timers/wait_block";
import IBlocks, { IBlocksExtMut, IBlocksSimple } from "./blocksInterface";
import waitUntilBlock from "./BlocklyNewBlocks/timers/wait_until";
import DateFromTextBlock from "./BlocklyNewBlocks/dates/DateFromText";
import CreateObjectBlocks from "./BlocklyNewBlocks/objects/createObjectBlocks";
import auth0Blocks from "./BlocklyNewBlocks/http/Auth0";
import propBlockly from "./BlocklyNewBlocks/objects/propBlocks";
import convertersBlocks from "./BlocklyNewBlocks/converters/convertersBlocks";
import guiBlocks from "./BlocklyNewBlocks/GUI/guiBlocks";
import HtmlParserBlocks from "./BlocklyNewBlocks/HTML/HTMLParserBlocks";
import { exportFileBlock } from "./BlocklyNewBlocks/exporters/exportfileBlock";
import { HTMLTags } from "./BlocklyNewBlocks/HTML/HTMLTags";
import HTMLParserAttributeValue from "./BlocklyNewBlocks/HTML/HTMLParserAttributeValue";
import windowBlock from "./BlocklyNewBlocks/Browser/windowBlock";
import converterTemplate from "./BlocklyNewBlocks/converters/convertTemplate";
import metaShw from "./BlocklyNewBlocks/meta/show";
import container from "./BlocklyNewBlocks/meta/container";
import { SwitchBlock } from "./BlocklyNewBlocks/switch";

export default class AllNewBlocks
{
    private static _instance: AllNewBlocks;

    private constructor()
    {
        //...
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    private nb : IBlocks[] | null = null;
    public NewBlocks():IBlocks[] {
        if(this.nb != null)
            return this.nb;

        this.nb=[
        new CurrentDateBlock(),
        new DateFromTextBlock (),
        new waitBlock(),
        new waitUntilBlock(),
        new tts(),
        new piano(),
        new CredsBlocks(),
        new HttpBlocks(),
        new FilterBlocks(),
        new CreateObjectBlocks(),
        new auth0Blocks(),
        new propBlockly(),
        new convertersBlocks(),
        new guiBlocks(),
        new HtmlParserBlocks(),
        new HTMLParserAttributeValue(),
        new exportFileBlock(),
        new HTMLTags(),
        new windowBlock(),
        new converterTemplate(),
        new metaShw(),
        new container(),
        new SwitchBlock(),
        ];
        return this.nb;
    }
    
    public static isSimple = (block: IBlocks): block is IBlocksSimple=> {
        return 'definitionBlocksSimple' in block;
    }

    public static isExtMut = (block: IBlocks): block is IBlocksExtMut=> {
        return 'definitionBlocksExtMut' in block;
    }
    


}

//const myClassInstance = MyClass.Instance;