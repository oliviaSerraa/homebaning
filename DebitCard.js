let debitsCardsId = 1;
let cardsNumbers = 1000000000000000;

class DebitCard {
    constructor(provider, emitionDate, securityCode, displayName) {
        this.id = debitsCardsId;
        debitsCardsId++;

        this.cardNumber = cardsNumbers;
        cardsNumbers++;

        this.provider = provider;

        this.expirationDate = new Date(emitionDate);
        this.expirationDate.setFullYear(this.expirationDate.getFullYear() + 5);

        this.securityCode = securityCode;
        this.displayName = displayName;

        this.consumptions = [];
        this.movements = [];
        this.balance = 0; // agregado para registrar movimientos
    }

    recordDebitCardMovements(idThirdPartyInvolved, amount) {
        try {
            this.balance += amount;
            this.movements.push(new Movement(idThirdPartyInvolved, amount, 0));
            return true;
        } catch (e) {
            console.log("Error al registrar movimiento de débito:", e);
            return false;
        }
    }
}

window.DebitCard = DebitCard;
window.debitCards = debitCards;
