let creditsCardsId = 1;
let creditCardsNumbers = 100000000000000;

class CreditCard {
    constructor(provider, emitionDate, securityCode, displayName, closeDate, balanceExpirationDate) {
        this.id = creditsCardsId;
        creditsCardsId++;

        this.cardNumber = creditCardsNumbers;
        creditCardsNumbers++;

        //VISA, American Express, MasterCard, CABAL...
        this.provider = provider;

        //Para poder tener distintas fechas de vencimiento de tarjeta.
        this.expirationDate = new Date(emitionDate);
        this.expirationDate = new Date(this.expirationDate);
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
    recordCreditCardMovements(idThirdPartyInvolved, amount, cuotes) {
        try {
            if (amount < 0) {
                let finalPrice = amount * this.interest
                this.balance -= finalPrice
            } else {
                this.balance += amount
            }
            this.movements.push(new Movement(idThirdPartyInvolved, amount, cuotes))
            return true
        } catch {
            return false
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
        } if((this.balance >= amount)&&(amount>= minimumPayment)){
            this.balance -= amount;
            return 0;
        }
    }
}

const creditCards = [
    new CreditCard("Visa", "2023-01-15", "123", "Visa Oro", "2023-02-10", "2025-01-15"),
    new CreditCard("MasterCard", "2022-05-20", "456", "Master Platinum", "2022-06-15", "2024-05-20"),
    new CreditCard("Amex", "2024-03-10", "789", "Amex Blue", "2024-04-05", "2026-03-10"),
    new CreditCard("Naranja", "2021-11-01", "321", "Naranja Clásica", "2021-12-01", "2023-11-01"),
    new CreditCard("Visa", "2023-07-30", "654", "Visa Débito", "2023-08-20", "2025-07-30")
];
