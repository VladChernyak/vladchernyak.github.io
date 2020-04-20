 class Menu {
  constructor() {
    this.menuButton = document.querySelector('.start-button');
    }
 }


 class Score {
  constructor() {
    this.score = document.querySelector('.score');
    this.value = this.score.dataset.value;
  }

  addScore(scoreValue) {
    this.value = +this.value + +scoreValue;
    this.score.innerText = this.value;
  }
 }


 class Timer {
  constructor() {
    this.timer = document.querySelector('.charge');
  }

  startBatteryTimer(stopFunction) {
    let charge = this.timer;
    setInterval(() => {
      if(+charge.dataset.value === 0) { stopFunction(); return};
      if(charge.dataset.value < 50) charge.style.backgroundColor = '#f7b345';
      if(charge.dataset.value < 20) charge.style.backgroundColor = '#fa4f46';


      charge.innerText = --charge.dataset.value + '%'; }, 1000);
  }
 }


 class  Find {
  constructor(name, value = 0) {
    this.name = name;
    this.value = value; 
  }

}

 class Game {
  constructor() {
    this.findList = [];
    this.score = 0;
    this.field = document.querySelector('.field');
  }



  createFindList() {
    let trashFinds = ['Крышка', 'Фольга', 'Банка', 'Проволка'];
    let lowCoastFinds = ['Советская монета', 'Гильза', 'Советский значок'];
    let middleCoastFinds = ['Царская монета', 'Фляга-Вермахт', 'Котелок-РККА', 'Ложка-РККА', 'Немецкий-жетон'];

    for (let count = 0; count < 4; count++) {         // adding of each find of three pieces

      for(let prop of trashFinds) {
        this.findList.push(new Find(prop, 10));
      }

    }

    for (let count = 0; count < 3; count++) {         // adding of each find of two pieces

      for (let prop of lowCoastFinds) {
        this.findList.push(new Find(prop, 100));
      }

    }

    for (let prop of middleCoastFinds) {
      this.findList.push(new Find(prop, 400));
    }

  }

  randomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }



  addFindOnField() {
    let find,
    findWrap;

    for (let prop of this.findList) {
      findWrap = document.createElement('div');
      findWrap.className = 'find-wrapper';
      find = document.createElement('div');     
      find.className = 'find';
      find.dataset.name = prop.name;
      find.dataset.value = prop.value;

      findWrap.style.top = this.randomNumber(25, this.field.clientHeight) + 'px';
      findWrap.style.left = this.randomNumber(25, this.field.clientWidth) + 'px';

      findWrap.append(find);
      this.field.append(findWrap);
    }
  }



  setFindImage() {
    let createdFinds = document.querySelectorAll('.find');

    for (let prop of createdFinds) {

      switch(prop.dataset.name) {

        case 'Крышка':
        case 'Фольга':
        case 'Банка':
        case 'Проволка':
        prop.style.backgroundImage = `url(img/trash-find/${prop.dataset.name}.png)`;
        break;

        case 'Фляга-Вермахт':
        case 'Котелок-РККА':
        case 'Немецкий-жетон':
        case 'Ложка-РККА':
        prop.style.backgroundImage = `url(img/middle-coast-find/${prop.dataset.name}.png)`;
        break;

        case 'Советская монета':
        prop.style.backgroundImage = `url(img/low-coast-find/монеты-ссср/${this.randomNumber(1, 4)}.png)`;
        break;

        case 'Гильза':
        prop.style.backgroundImage = `url(img/low-coast-find/гильзы/${this.randomNumber(1, 2)}.png)`;
        break;

        case 'Советский значок':
        prop.style.backgroundImage = `url(img/low-coast-find/значки/${this.randomNumber(1, 3)}.png)`;
        break;

        case 'Царская монета':
        prop.style.backgroundImage = `url(img/middle-coast-find/царские-монеты/${this.randomNumber(1, 3)}.png)`;
        break;
      }

    }
  }


  showFindWindow(findItem) {
    let findWindow = document.querySelector('.find-window'),
        findImg = findWindow.querySelector('.find-img'),
        findName = findWindow.querySelector('h2'),
        findScore = findWindow.querySelector('.find-score'),
        findWindowBtn = findWindow.querySelector('.find-window-btn');

    findWindow.style.visibility = 'visible';
    findImg.style.backgroundImage = findItem.style.backgroundImage;
    findName.innerText = `Ваша находка: ${findItem.dataset.name.replace('-', ' ')}`;
    findScore.innerText = `+${findItem.dataset.value} очков !`;
    
    if(findItem.dataset.value < 100) findScore.style.color = "#c9372c";
    else if (findItem.dataset.value < 400) findScore.style.color = "#e89700";
    else findScore.style.color = "#39b329";

    findWindowBtn.onclick = function() {
      findWindow.style.visibility = 'hidden';
    }

    findItem.closest('.find-wrapper').remove();
  }


  stopGame() {
    let endGameWindow = document.querySelector('.end-game');
    let totalScore = document.querySelector('.total-score');
    let playAgainBtn = document.querySelector('.play-again');

    playAgainBtn.onclick = () => location.reload();
    totalScore.innerText = `Вы набрали ${score.value} очков !`;
    endGameWindow.style.visibility = 'visible';

  }
}


const menu = new Menu();
const game = new Game();
const score = new Score();
const battery = new Timer();

menu.menuButton.onclick = function(event) {
  game.createFindList();
  game.addFindOnField();
  game.setFindImage();
  event.target.closest('.start-menu').remove();
  battery.startBatteryTimer(game.stopGame);
}

game.field.addEventListener('click', function(event) {
      let pit = document.createElement('div');
      pit.className = 'pit'
      game.field.append(pit);
      pit.style.top = event.clientY - (pit.getBoundingClientRect().height / 2) + 'px';
      pit.style.left = event.clientX - (pit.getBoundingClientRect().width / 2) + 'px';
      pit.style.opacity = 1;
});

game.field.addEventListener ('click', function(event) {
      if(event.target.className === 'find') {
        event.target.style.opacity = 1;
        score.addScore(event.target.dataset.value);
        setTimeout(function() {game.showFindWindow(event.target)}, 1000);
      }
});


