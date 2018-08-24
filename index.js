let chef;
let chefImage;
let pedestrianImages = ["https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/39952733_320225325203399_1978358345668493312_n.png?_nc_cat=0&oh=5749e160ca3c9ed4a7a013c10057b2c5&oe=5C08DB18", "https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/39914746_684130931953371_4713628179594477568_n.png?_nc_cat=0&oh=e9ed3c7f97d32959cd48a701ad76f985&oe=5BFEAD67", "https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/40042234_313982789151132_6543472148214710272_n.png?_nc_cat=0&oh=e00a3302a760def70ce66b76abd5fb93&oe=5BFBF00A", "https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/39980143_466069140526039_8475969116564357120_n.png?_nc_cat=0&oh=142c14d95e5a987c92f7960a1df01486&oe=5BF9B6B3"];
let pedastrians = [];
let pdimg;
let score = 0;

function pointsCounter() {
    textAlign(LEFT);
    text(points, 10, 30);
    textSize(12);
    textAlign(CENTER);
    text(startGame, width / 2, height / 2);
    fill(255);
}

function setup() {
    myCanvas = createCanvas(window.innerWidth, 400);
    chef = new Chef(chefImage);
}
function returnRandomNumber(from, to) {
    return Math.round(random(from, to))
}
function preload() {
    pdimg = loadImage('https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/39980143_466069140526039_8475969116564357120_n.png?_nc_cat=0&oh=142c14d95e5a987c92f7960a1df01486&oe=5BF9B6B3');
    chefImage = loadImage('https://scontent-amt2-1.xx.fbcdn.net/v/t1.15752-9/39925371_315892825635280_5641858053499256832_n.png?_nc_cat=0&oh=6f7b1691e84015cd970eb187475cd4b4&oe=5C00EBCE');
}

function draw() {
    background(135, 206, 235);
    chef.update();
    chef.show();
    textSize(50);
    text(Math.round(score) + ' pts', width / 2, 40);
    fill(0, 102, 153);

    for (let i = 0; i < pedastrians.length; i++) {
        pedastrians[i].show();
        pedastrians[i].update();
        pedastrians[i].collision();
    }

    if (pedastrians.length > 3) {
        pedastrians.slice(0, 1);
    }
}

class Pedastrian {
    constructor(image) {
        this.xpos = width;
        this.ypos = height - 50;

        this.speed = random(6, 9);
        this.image = loadImage(image);
    }
    show() {
        fill(255);
        image(this.image, this.xpos, this.ypos, 100, 100);
        imageMode(CENTER);
    }

    update() {
        this.xpos = this.xpos - this.speed;
    }
    collision() {
        if (this.xpos < chef.x + 20 && this.xpos > chef.x - 20 && (this.ypos - 50) < (chef.y + 50)) {
            alert('match lost');
        }
        else if (this.xpos < chef.x + 20 && this.xpos > chef.x - 20) {
            score = score + 1 / 5;
        }
    }
}

window.setInterval(function () {
    pedastrians.push(new Pedastrian(pedestrianImages[returnRandomNumber(1, 3)]));
    if (pedastrians.length == 3) {
        pedastrians.splice(0, 1);
    }
}, 2000);

class Chef {
    constructor(chefImage) {
        this.y = height;
        this.x = 120;

        this.gravity = 0.7;
        this.lift = -17;
        this.speed = 0;
        this.img = chefImage;
    }

    show() {
        fill(255);
        image(this.img, this.x, this.y, 100, 100);
        imageMode(CENTER);
    }

    jump() {
        this.speed += this.lift;
    }

    update() {
        this.speed += this.gravity;
        this.y += this.speed;

        if (this.y > height - 50) {
            this.y = height - 50;
            this.speed = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.speed = 0;
        }
    }
}
function keyPressed() {
    if (keyCode == UP_ARROW) {
        chef.jump();
    }
}