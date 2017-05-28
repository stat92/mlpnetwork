let InputNeuron  = require('./neuron').InputNeuron,
    HiddenNeuron = require('./neuron').HiddenNeuron,
    OutputNeuron = require('./neuron').OutputNeuron,
    BiasNeuron   = require('./neuron').BiasNeuron,
    Connection   = require('./connection').Connection

module.exports = 
{
    Network: class Network {
        constructor() {
            this.inputNeurons = []
            this.hiddenNeurons = []
            this.outputNeurons = []
            this.biasNeuron = null
            this.connections = []
        }

        /**
         * Builds network
         * 
         * @param {number} inputs 
         * @param {number} hiddens 
         * @param {number} outputs 
         */
        buildNetwork(inputs, hiddens, outputs) {
            this.createNeurons(inputs, hiddens, outputs)
            this.connectNeurons()         
        }

        createNeurons(inputs, hiddens, outputs) {
            let me = this

            me.inputNeurons  = Array.from(new Array(inputs), () => new InputNeuron())
            me.hiddenNeurons = Array.from(new Array(hiddens), () => new HiddenNeuron())
            me.outputNeurons = Array.from(new Array(outputs), () => new OutputNeuron())
            
            me.biasNeuron = new BiasNeuron() 
        }

        connectNeurons() {
            let me = this

            // connecting hidden neurons
            me.hiddenNeurons.forEach((hidden) => {

                me.inputNeurons.forEach((input) => {                             // with the input neurons
                    me.connections.push(new Connection(input, hidden))
                })

                me.outputNeurons.forEach((output) => {                           // with the output neurons
                    me.connections.push(new Connection(hidden, output))
                })

                me.connections.push(new Connection(me.biasNeuron, hidden))     // with the bias neurons
            
            }, me)

            // connecting bias neuron with the output neurons
            me.outputNeurons.forEach((output) => {
                me.connections.push(new Connection(me.biasNeuron, output))
            }, me)
        }

        /**
         * Calculates the output for given input
         * 
         * @param {[number]} inputs
         * @returns {[number]} 
         */
        calculate(inputs) {
            let me = this,
                length = me.inputNeurons.length

            if (inputs.length !== length) 
                throw new Error(`Pattern must have ${length} inputs for ${length} input neurons`)

            for (let i=0; i<length; i++) {
                me.inputNeurons[i].activation = inputs[i]
            }

            me.hiddenNeurons.forEach(function(hidden) {
                hidden.activate()
            }, me)
            
            return me.outputNeurons.map((output) => output.activate())
        }

        /**
         * Sets the predefined weights
         * 
         * @param {[number]} weights 
         */
        setWeights(weights) {
            let len = weights.length 
            
            if (len !== this.connections.length) {
                throw Error("not all weights set. Amount of weights must be equal to connections")
            }

            for (let i=0; i<len; i++) {
                this.connections[i].weight = weights[i]
            }
        }
    }
}