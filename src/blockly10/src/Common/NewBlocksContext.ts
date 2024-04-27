import { createContext } from 'react';
import IBlocks from '../BlocklyReusable/blocksInterface';

const NewBlocksContext = createContext<IBlocks[] | null>(null);
export default NewBlocksContext;
