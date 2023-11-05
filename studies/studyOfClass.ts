abstract class User {
    constructor(
        protected firstName:string,
        protected lastName:string,
        protected nickname:string
    ) {}
    abstract getNickName(ar:string):void
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

class Player extends User {
    getNickName() {
        console.log(this.nickname)
    }
}

const cham = new Player("cham", "Park", "박참");

console.log(cham)

console.log(cham.getFullName())
