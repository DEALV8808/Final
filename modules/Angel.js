var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Angel extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy  = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mult() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            angelHashiv++
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let angel = new Angel(x, y);
            angelArr.push(angel);
            this.energy = 250;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.energy++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in gameArr) {
                if (gameArr[i].x == x &&  gameArr[i].y == y) {
                    gameArr.splice(i, 1)
                    this.energy += 20
                }
            }
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == x &&  gishatichArr[i].y == y) {
                    gishatichArr.splice(i, 1)
                    this.energy += 6
                }
            }
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                    this.energy += 2
                }
            
            }
            this.x = x;
            this.y = y;

            if (this.energy >= 250) {
                this.mult();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in angelArr) {
            if (angelArr[i].x == this.x && angelArr[i].y == this.y) {
                angelArr.splice(i, 1)
            }
        }
    }
}