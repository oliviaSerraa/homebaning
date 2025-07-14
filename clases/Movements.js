let movementsId = 1;

class Movement {
    constructor(thirdPartyName, amount, cuotes=0) {
        this.id = movementsId;
        movementsId++;

        this.date = new Date();
        this.thirdPartyName = thirdPartyName;
        this.amount = amount;

        if (cuotes >= 1) {
            this.cuotes = cuotes;
        } else {
            this.cuotes = 1;
        }
    }
}

window.Movement = Movement;