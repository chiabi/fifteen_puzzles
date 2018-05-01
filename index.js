const COL = 4;
let move = 0;

const moveEl = document.querySelector('.move');
const blankEl = document.querySelector('.blank');

function init() {
  document.querySelectorAll('.box').forEach((item, index) => {
    item.setAttribute('data-idx', index);
    moveEl.textContent = (move = 0);
  });
}

function moveBox() {
  const puzzle = this.dataset.idx;
  const blank = blankEl.dataset.idx;
  if (Math.abs(blank - puzzle) === 1 || Math.abs(blank - puzzle) === 4) {
    this.setAttribute('data-idx', blank);
    blankEl.setAttribute('data-idx', puzzle);
    moveEl.textContent = ++move;
  }
  return false;
}

function shuffle() {
  for(let i = 0; i < COL ** 2; ) {
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