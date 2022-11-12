import CurrentDateBlock from "./BlocklyNewBlocks/CurrentDateBlock";
import { CredsBlocks } from "./BlocklyNewBlocks/http/WindowsCreds";
import { HttpBlocks } from "./BlocklyNewBlocks/http/xhrBlocks";
import { FilterBlocks } from "./BlocklyNewBlocks/list/filterBlocks";
import { piano } from "./BlocklyNewBlocks/piano";
import { tts } from "./BlocklyNewBlocks/tts";
import waitBlock from "./BlocklyNewBlocks/wait_block";
import IBlocks from "./blocksInterface";

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

        this.nb=[];
        this.nb.push(new CurrentDateBlock());
        this.nb.push(new waitBlock());
        this.nb.push(new tts());
        this.nb.push(new piano());
        this.nb.push(new CredsBlocks());
        this.nb.push(new HttpBlocks());
        this.nb.push(new FilterBlocks());
        return this.nb;
    }

}

//const myClassInstance = MyClass.Instance;