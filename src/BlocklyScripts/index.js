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
  xhrBlocks: require('./xhrblocks'),
  propBlocks: require('./propBlocks'),

};