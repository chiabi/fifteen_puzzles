const COL = 4;
let move = 0;

const body = document.body;
const blankEl = document.querySelector('.blank');
const moveEl = document.querySelector('.game .move');

// 게임 초기화
function init() {
  document.querySelectorAll('.box').forEach((item, index) => {
    item.setAttribute('data-idx', index);
    moveEl.textContent = (move = 0);
  });
}

// 박스를 눌렀을때 옮겨지는 부분 계산하고 화면에 표현하는 함수
function moveBox() {
  const puzzle = parseInt(this.dataset.idx);
  const blank = parseInt(blankEl.dataset.idx);
  let moveBlock;
  if ((puzzle % 4 === blank % 4) && puzzle < blank) {
    moveBlock = moveVeticalElArr(puzzle, blank);
    moveBlock.map((item, idx, arr) => item.setAttribute('data-idx', idx === arr.length - 1 ? puzzle : parseInt(item.dataset.idx) + 4));
  } else if ((puzzle % 4 === blank % 4) && puzzle > blank) {
    moveBlock = moveVeticalElArr(blank, puzzle);
    moveBlock.map((item, idx) => item.setAttribute('data-idx', idx === 0 ? puzzle : parseInt(item.dataset.idx) - 4));
  } else if (Math.floor(puzzle / 4) === Math.floor(blank / 4)) {
    if (puzzle < blank) {
      moveBlock = moveHorizentalElArr(puzzle, blank);
      moveBlock.map((item, idx, arr) => item.setAttribute('data-idx', idx === arr.length - 1 ? puzzle : parseInt(item.dataset.idx) + 1));
    } else {
      moveBlock = moveHorizentalElArr(blank, puzzle);
      moveBlock.map((item, idx, arr) => item.setAttribute('data-idx', idx === 0 ? puzzle : parseInt(item.dataset.idx) - 1));
    }
  }
  move += (moveBlock.length - 1);
  moveEl.textContent = move;
  if([...document.querySelectorAll('.box')].every((item, index) => parseInt(item.dataset.idx) === index)) {
    body.classList.add('end');
    document.querySelector('.modal .move').textContent = move;
  };
}

function moveVeticalElArr(a, b) {
  const arr = [];
  for (let i = a; i <= b; i++) {
    if((i % 4) === (b % 4)) arr.push(document.querySelector(`[data-idx="${i}"]`));
  }
  return arr;
}
function moveHorizentalElArr(a, b) {
  const arr = [];
  for (let i = a; i <= b; i++) {
    arr.push(document.querySelector(`[data-idx="${i}"]`));
  }
  return arr;
}

function shuffle() {
  for(let i = 0; i < 50; ) {
    const blank = parseInt(blankEl.dataset.idx);
    const random = Math.floor(Math.random() * 4);
    switch(random) {
      case 0:
        if(blank + 1 <= 15 && blank % 4 !== 3) {
          document.querySelector(`[data-idx="${blank + 1}"]`).setAttribute('data-idx', blank);
          blankEl.setAttribute('data-idx', blank + 1);
          i++;
        }
        break;
      case 1:
        if(blank - 1 >= 0 && blank % 4 !== 0)  {
          document.querySelector(`[data-idx="${blank - 1}"]`).setAttribute('data-idx', blank);
          blankEl.setAttribute('data-idx', blank - 1);
          i++;
        }
        break;
      case 2:
        if(blank + 4 <= 15) {
          document.querySelector(`[data-idx="${blank + 4}"]`).setAttribute('data-idx', blank);
          blankEl.setAttribute('data-idx', blank + 4);
          i++;
        }
        break;
      case 3:
        if(blank - 4 >= 0) {
          document.querySelector(`[data-idx="${blank - 4}"]`).setAttribute('data-idx', blank);
          blankEl.setAttribute('data-idx', blank - 4);
          i++;
        }
        break;
    }
  }
}

// 퍼즐 클릭 이벤트
document.querySelectorAll('.puzzle').forEach(item => {
  item.addEventListener('click', moveBox);
});

// RESET
document.querySelector('.btn-reset').addEventListener('click', init);

// shuffle
document.querySelector('.btn-shuffle').addEventListener('click', shuffle);

// again
document.querySelector('.btn-again').addEventListener('click', () => {
  body.classList.remove('end');
  init();
});