# Simple MLP neural network. Written in ES6.

## Usage

#### 1. Create new Network and Trainer objects.

```
let network = new Network(),
    trainer = new Trainer()
```

#### 2. Build network.

```
network.buildNetwork(2, 3, 1)
```
```buildNetwork``` accepts amounts of input, hidden and output neurons.

#### 3. Train network

```
let weights = trainer.train(network, patterns[, learnRate])
```
```train``` method returns ```weights```. Save it to the file as json then next time you can use it simply passing to ```setWeights``` method of ```Network``` class. ```patterns``` is an array of patterns, contains input and desired values for each inputs and outputs: 
```
[
  {
    "input": [ 0, 0 ],
    "desired": [ 0 ]
  }
]
```

#### 4. Use

```
network.calculate(input)
```
```input``` object must be the same as input property of the pattern used in training
