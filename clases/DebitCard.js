let debitsCardsId = 1;
let debitCardsNumbers = 1000000000000000;

class DebitCard {
    constructor(provider, emitionDate, securityCode, displayName) {
        this.id = debitsCardsId;
        debitsCardsId++;

        this.cardNumber = debitCardsNumbers;
        debitCardsNumbers++;

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
    }

    recordDebitCardMovements(idThirdPartyInvolved, amount) {
        try {
            this.balance += amount
            this.movements.push(new Movement(idThirdPartyInvolved, amount, 0))
            return true
        } catch {
            false
        }
    }
}

const debitCards = [
    new DebitCard("Visa", "2023-02-10", "111", "Visa Débito"),
    new DebitCard("MasterCard", "2022-09-05", "222", "MasterCard Joven"),
    new DebitCard("Maestro", "2021-12-01", "333", "Maestro Classic"),
    new DebitCard("Naranja", "2024-04-15", "444", "Naranja Débito"),
    new DebitCard("Cabal", "2023-06-20", "555", "Cabal Universitaria")
];