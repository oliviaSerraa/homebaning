let clientsId = 1;

class Clients {
    constructor(dni, password, name, lastName) {
        this.id = clientsId;
        clientsId++;
        this.dni = dni;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.creditCards = [];
        this.savingsBanks = [];
        //Otra opción es crear la primer caja de ahorro acá directamente...
        //this.savingsBanks = [new SavingsBanks("ARS", 50000, "FIRMA.TIPO.ALIAS")];
    }

    // 20
    buyingSellingDolars(amountInPesos, idOrigin, idDestination) {
        const DOLLAR_QUOTE = 1100;
        if (!amountInPesos && !idOrigin && !idDestination) {
            for (let i = 0; i < savingBanks.lenght; i++) {
                if (savingBanks[i] == idOrigin) {
                    withdrawMoneyFromAccount(amountInPesos)
                    return true
                }
            }
            for (let i = 0; i < savingBanks.lenght; i++) {
                if ((savingBanks[i] == idDestination) && (savingBanks[i].currency == "USD")) {
                    let dolars = amountInPesos / DOLLAR_QUOTE
                    depositMoneyIntoSavingBank(dolars)
                    return true
                }
            }
            return true
        } else {
            return false
        }
    }

}

const clients = [
    new Clients("12345678", "clave123", "Juan", "Pérez"),
    new Clients("87654321", "pass456", "Ana", "García"),
    new Clients("11223344", "abc789", "Carlos", "López"),
    new Clients("44332211", "segura321", "Laura", "Martínez"),
    new Clients("55667788", "hola1234", "María", "Gómez")
];