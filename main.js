const A = document.querySelector('.a');
const Message1 = document.querySelector('.message1');
const B = document.querySelector('.b');
const Message2 = document.querySelector('.message2');
const C = document.querySelector('.c');
const Avg = document.querySelector('.avg');
const playbtn = document.querySelector('.playbtn');

let scores;
let greenout;
let waitforstart;
let waitforgreen;
let timer;
let timesnow;

const init = () => {
  scores = [];
  greenout = false;
  waitforstart = false;
  waitforgreen = false;
};

init();

A.addEventListener('click', () => {
  A.classList.remove('active');
  play();
});

const play = () => {
  B.style.backgroundColor = 'red';
  Message2.textContent = 'waiting for green color';
  Message2.style.color = 'white';
  let change = Math.floor(Math.random() * 7000 + 3000);
  timer = setTimeout(setgreen, change);
  waitforstart = false;
  waitforgreen = true;
};

const setgreen = () => {
  B.style.backgroundColor = 'green';
  Message2.textContent = 'Click Now!';
  greenout = true;
  timesnow = Date.now();
};

function rttime(rt) {
  B.style.backgroundColor = 'white';
  Message2.textContent = `your time is ${rt} ms`;
  Message2.style.color = 'red';
  greenout = false;
  waitforstart = true;
  scores.push(rt);

  if (scores.length >= 3) {
    stop();
  }
}

B.addEventListener('click', () => {
  if (greenout) {
    let rt = Date.now() - timesnow;
    rttime(rt);
    return;
  }
  if (waitforstart) {
    play();
    return;
  }
  if (waitforgreen) {
    tosoon();
  }
});

const stop = () => {
  C.classList.add('active');
  clearTimeout(timer);
  let total = 0;
  scores.forEach((s) => {
    total += s;
  });
  let average = Math.round(total / scores.length);
  Avg.textContent = `your average score is ${average} ms`;
};
const tosoon = () => {
  B.style.backgroundColor = 'white';
  Message2.textContent = 'Clicked to soon. Click Again!';
  Message2.style.color = 'black';
  waitforstart = true;
  clearTimeout(timer);
};
playbtn.addEventListener('click', () => {
  C.classList.remove('active');
  init();
  play();
});
