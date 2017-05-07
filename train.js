let jsonfile   = require('jsonfile'),
    Network    = require('./api/network').Network,
    Trainer    = require('./api/trainer').Trainer
    
let learnRate = 0.9,
    network = new Network(),
    weights = [],
    patterns = jsonfile.readFileSync('./data/patterns.json'),
    trainer = new Trainer(learnRate, patterns)

network.createNeurons()

// Training process of the network
/*for (let i=0; i<2000; i++) 
{*/
    trainer.train(network)
    
    /*if (i === 1700) {
        learnRate = 0.7
    }
}*/

// Saving the optimal weights to file
network.connections.forEach((conn) => {
    weights.push(conn.weight)
})

jsonfile.writeFile('./data/weights.json', weights, { spaces: 3 }, (err) => {
    if (err) throw err
    console.log('Weights has been saved!')
})