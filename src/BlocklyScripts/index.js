// exports.printMsg = function() {
//     window.alert("This is a message from the demo package");
//   }

// exports.filter1={
//   "asd":"asdasd"
// }

module.exports = {
  
  defaultBlocks: require('./defaultBlocks'),
  filterBlocks: require('./filterBlocks'),
  waitBlocks: require('./wait_block'),
  xhrBlocks: require('./xhrBlocks'),
  propBlocks: require('./propBlocks'),
  guiBlocks: require('./guiBlocks'),
  convertersBlocks: require('./convertersBlocks'),
  exportFileBlock: require('./exportfileBlock'),
  createObjectBlocks: require('./createObjectBlocks'),
  currentDateBlock: require('./currentDateBlock'),
  dateFromTextBlock: require('./dateFromTextBlock'),
  waitBlocks: require('./waitBlocks'),
  commentBlock: require('./commentBlock'),
  auth0Blocks: require('./auth0Blocks'),
  windowsCreds: require('./WindowsCreds'),

};