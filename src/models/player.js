export default class Player {
    constructor(name, face, pos, id) {
        this.name = name;
        this.face = face;
        this.pos = pos;
        this.id = id;
        this.lives = 3;
        this.it = false;
        this.turn = false;
        this.cookies = 0;
    }
}