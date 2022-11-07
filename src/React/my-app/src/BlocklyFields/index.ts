

 import React from 'react';
import BlocklyComponent from '../Components/GUI/BlocklyComponent';

export default BlocklyComponent;

const Block = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

const Category = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};

const Value = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("value", props, children);
};

const Field = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("field", props, children);
};

const Shadow = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("shadow", props, children);
};

const Mutation = (p:any) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("mutation", props, children);
};

export { Block, Category, Value, Field, Shadow , Mutation}