const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'blockly express js test',
            version: '3.0.0'
        }
    },
    apis: ['./routes/controller1.js', './routes/controller2.js', './routes/index.js']
}

module.exports = options