import {BlocklyXHR} from 'projects/blockly-scripts/src/lib/BlocklyXHR';
import { generalBlocks } from 'projects/blockly-scripts/src/lib/defaultBlocks';
import { tryCat} from 'projects/blockly-scripts/src/lib/tryCatchFinBlock';
import { tts} from 'projects/blockly-scripts/src/lib/TTSBlock';
import { piano } from 'projects/blockly-scripts/src/lib/pianoBlock';
import { filters } from 'projects/blockly-scripts/src/lib/filterBlocks';
import { auth0Blocks} from 'projects/blockly-scripts/src/lib/auth0Blocks';
import { convertersBlocks} from 'projects/blockly-scripts/src/lib/convertersBlocks';
import{ CurrentDate } from 'projects/blockly-scripts/src/lib/currentDateBlock';
import { DateFromText } from 'projects/blockly-scripts/src/lib/dateFromTextBlock';
import { email } from 'projects/blockly-scripts/src/lib/emailBlocks';
import { exportFile} from 'projects/blockly-scripts/src/lib/exportfileBlock';
import { guiBlocks} from 'projects/blockly-scripts/src/lib/guiBlocks';
import { chartBlocks } from 'projects/blockly-scripts/src/lib/chartBlock';
import { HTMLTags } from 'projects/blockly-scripts/src/lib/HTMLBlocks';
import { HtmlParser } from 'projects/blockly-scripts/src/lib/HTMLParserBlocks';
import { propBlockly } from 'projects/blockly-scripts/src/lib/propBlocks';
import { CreateObject } from 'projects/blockly-scripts/src/lib/createObjectBlocks';
import { Creds } from 'projects/blockly-scripts/src/lib/WindowsCreds';
import {waitB } from 'projects/blockly-scripts/src/lib/waitBlocks';
import { wait } from 'projects/blockly-scripts/src/lib/wait_block';
import { comment} from 'projects/blockly-scripts/src/lib/commentBlock';
import { BlocklyDockerBase } from 'projects/docker-extension/src/public-api';
export class bs{
    public DockerContainer:BlocklyDockerBase=new BlocklyDockerBase();
    public xhrBlocks: BlocklyXHR= new BlocklyXHR();
    public defaultBlocks: generalBlocks= new generalBlocks();
    public trycatchFinBlock: tryCat= new tryCat();   
    public ttsBlock : tts = new tts();
    public pianoBlock: piano = new piano();
    public filterBlocks: filters = new filters();
    public auth0Blocks: auth0Blocks = new auth0Blocks();
    public convertersBlocks: convertersBlocks = new convertersBlocks();
    public currentDateBlock: CurrentDate = new CurrentDate();
    public dateFromTextBlock: DateFromText = new DateFromText();
    public emailBlocks: email = new email();
    public exportFileBlock: exportFile = new exportFile();
    public guiBlocks: guiBlocks = new guiBlocks();
    public chartBlock: chartBlocks = new chartBlocks();
    public htmlblocks: HTMLTags = new HTMLTags();
    public HTMLParserBlocks: HtmlParser = new HtmlParser();
    public propBlocks: propBlockly = new propBlockly();
    public createObjectBlocks: CreateObject = new CreateObject();
    public windowsCreds: Creds = new Creds();
    public waitBlocks1: waitB = new waitB();
    public waitBlocks2: wait = new wait();
    public commentBlock: comment = new comment();

    constructor(){
        
    }
}