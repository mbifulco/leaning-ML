let a = 1;
let b = 0;
const radius = 5;

const canv = document.getElementById('canv');
const ctx = canv.getContext('2d');

const isAboveLine = (point) => {
  const x = point[0];
  const y = point[1];
  if (y > f(x)) {
    return 0;
  }
  return 1;
};

const drawAxes = () => {
  ctx.clearRect(0,0, canv.width, canv.height);
  ctx.beginPath();
  ctx.strokeStyle='#ccc';

  // x axis
  ctx.moveTo(0, canv.height/2)
  ctx.lineTo(canv.width, canv.height/2);

  // y axis
  ctx.moveTo(canv.width / 2,0);
  ctx.lineTo(canv.width / 2, canv.height);
  ctx.stroke();
};


// draw a straight line according to linear function
// y = ax + b
const drawLinearFunction = (a, b) => {
  ctx.beginPath();
  ctx.moveTo(0, 
             canv.height - (
               f(-(canv.width/2)) 
             + canv.height / 2)
            );
  
  ctx.lineTo(canv.width,
            canv.height - (f(canv.width/2) + canv.height / 2)
            );
  ctx.strokeStyle='#00ff00';
  ctx.stroke();
}

const drawPoint=(point, isAboveLine) => {
  ctx.beginPath();
  
  const ptX = point[0] + canv.width / 2;
  const ptY = canv.height - (point[1] + canv.width / 2);
  
  let strokeColor = '#ff0000';
  if (isAboveLine) strokeColor = '#777700';
  
  ctx.strokeStyle=strokeColor;
 
  ctx.arc(
    ptX,  // x
    ptY,  // y
    radius,        // radius
    0,         // start angle
    2*Math.PI //end angle
  );
  ctx.stroke();
};

class Perceptron {
  constructor(weights, bias) {
    this._weights = weights;
    this._bias = bias;
  }

  heaviside (f) {
    if (f < 0) {
      return 0
    };
    return 1;
  }
  
  Process(inputs) {
    let sum = this._bias;
    inputs.forEach((input, i) => {
      sum += input * this._weights[i];
    });
    return this.heaviside(sum);
  }

  Adjust(inputs, delta, learningRate) {
    inputs.forEach((input, i) => {
      this._weights[i] += input * delta * learningRate;
    });
    this._bias += delta * learningRate;
  };
}

const createPerceptrons = (n) => {
  let w = [];
  for (let i = 0; i < n; i++) {
    w[i] = (Math.random() * 2) - 1;
  }

  const bias = (Math.random() * 2) -1
  return new Perceptron(w, bias);
};

const f = (x) => {
  return a*x + b;
};



const train = (p, iters, rate) => {
  for(let i = 0; i < iters; i++) {
    let point = [
      Math.random() * 501 - 251,
      Math.random() * 501 - 251,
    ];

    let actual = p.Process(point);
    let expected = isAboveLine(point);
    let delta = expected - actual;
  
    p.Adjust(point, delta, rate)
  }
};

const verify = (p) => {
  let correctAnswers = 0;
  drawAxes();
  drawLinearFunction();
  
  for(let i = 0; i < 100; i++) {
    const point = [
      Math.random() * 501 - 251,
      Math.random() * 501 - 251
    ];
    const result = p.Process(point);
    if(result === isAboveLine(point)) {
      correctAnswers += 1;
    }
    
    drawPoint(point, result === 1);
  }
  return correctAnswers;
}

const main = () => {
  a = Math.random() * 11 - 6;
  b = Math.random() * 101 - 51;
  
  const p = createPerceptrons(2);
  
  const iterations = 1000;
  const learningRate = 0.1; // allowed range 0 < learning rate <= 1
  train(p, iterations, learningRate);
  let successRate = verify(p);
  console.log(`${successRate} of the answers were correct.`);
}

main();