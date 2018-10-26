let rowWidth = 101;
let columnHeigth = 83;
let maxRow = 5;
let maxColumn = 4;

function getPotion(object) {
    return {x: object.column * rowWidth, y: (object.row - 0.25) * columnHeigth};
}

// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.row = 0;
    this.column = 0;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = getRandomArbitrary(1,10);
};

Enemy.prototype.reset = function () {
    this.row = getRandomArbitrary(1,3);
    this.column = getRandomArbitrary(-5,-1);
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    
    this.column += 0.1 * dt * this.speed;
    
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.column * rowWidth, (this.row - 0.25) * columnHeigth);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player extends Object{

    constructor(){
        super();
        this.child = 'images/char-boy.png';
        this.reset();
    }

    update(){

    }

    reset(){
        this.row = 5;
        this.column = 2;
    }

    success(){
        return this.row == 0;
    }

    render(){
        ctx.drawImage(Resources.get(this.child), this.column * rowWidth, (this.row - 0.25) * columnHeigth);
    }

    handleInput(direction){
        switch(direction){
            case 'left':
                this.column--;
                if(this.column < 0){
                    this.column = 0;
                }
                break;
            case 'up':
                this.row--;
                if(this.row < 0){
                    this.row = 0;
                }
                break;
            case 'right':
                this.column++;
                if(this.column > maxColumn){
                    this.column = maxColumn;
                }
                break;
            case 'down':
                this.row++;
                if(this.row > maxRow){
                    this.row = maxRow;
                }
                break;
            default:
                break;
        }
    }

}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
let allEnemies = [];
for(let i = 0; i < 10; i++){
    let enemy = new Enemy();
    enemy.row = i % 3 + 1;
    allEnemies.push(enemy);
}
// 把玩家对象放进一个叫 player 的变量里面
let player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    if(window.hasBegin){
        player.handleInput(allowedKeys[e.keyCode]);
    }else{
        handleInput(allowedKeys[e.keyCode]);
    }
});
