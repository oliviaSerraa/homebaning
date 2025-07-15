let creditsCardsId = 1;

class CreditCard {
    constructor(provider, emitionDate, securityCode, displayName, closeDate, balanceExpirationDate) {
        this.id = creditsCardsId;
        creditsCardsId++;

        this.cardNumber = cardsNumbers;
        cardsNumbers++;

        //VISA, American Express, MasterCard, CABAL...
        this.provider = provider;

        //Para poder tener distintas fechas de vencimiento de tarjeta.
        this.expirationDate = new Date(emitionDate);
        this.expirationDate.setFullYear(this.expirationDate.getFullYear() + 5);

        //Solo para saber que existe
        this.securityCode = securityCode;

        //Ej: NICOLAS AGUST FACON o NICOLAS A FACON
        this.displayName = displayName;

        this.consumptions = [];

        this.balance = 0;
        //Si el cliente hace un pago que NO sea el total, modificamos el interes
        //Por ej, 1.1
        this.interest = 1;

        //Fecha hasta la cual se computan los gastos
        this.closeDate = closeDate;
        //Fecha en la que tengo que pagar la tarjeta.
        this.balanceExpirationDate = balanceExpirationDate;
    }

    // 22)
    recordCreditCardMovements(thirdPartyName, amount, cuotes) {
        try {
            if (amount < 0) {
                let finalPrice = amount * this.interest;
                this.balance -= finalPrice;
            } else {
                this.balance += amount;
            }

            this.consumptions.push(new Movement(thirdPartyName, amount, cuotes));
            return true;
        } catch (e) {
            console.error("Error al registrar movimiento:", e);
            return false;
        }
    }


    registerPayment(amount) {
        if (amount <= 0) return -1;

        const minimumPayment = this.balance * 0.1;

        if (amount < minimumPayment) {
            return -1;
        }

        this.balance -= amount;

        if (this.balance <= 0) {
            this.balance = 0;
            return 1;
        } if ((this.balance >= amount) && (amount >= minimumPayment)) {
            this.balance -= amount;
            return 0;
        }
    }
}
const creditCards = [];
window.CreditCard = CreditCard;
window.creditCards= creditCards;
