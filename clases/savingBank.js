

let savingsBanksId = 0;
let cbuCounter = 1000000000000000000000;

class SavingsBank {
    constructor(currency, alias, limit) {
        this.id = savingsBanksId;
        savingsBanksId++;

        this.currency = currency;
        this.balance = 0;

        if (currency === "ARS") {
            this.limit = limit;
            this.overdraft = 0;
        }

        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        this.cbu = cbuCounter;
        cbuCounter++;
    }

    withdrawMoneyFromAccount(amount) {
        if (this.currency === "USD") {
            if (this.balance > amount) {
                console.log("extracción hecha con éxito");
                this.balance -= amount;
            }
        } else if (this.currency === "ARS") {
            if (this.balance >= amount) {
                console.log("extracción hecha con éxito");
                this.balance -= amount;
            } else if (this.limit >= (amount - this.balance)) {
                let extra = amount - this.balance;
                this.balance = 0;
                this.limit -= extra;
                this.overdraft += extra;
                console.log("extracción hecha con éxito con descubierto");
            } else {
                console.log("saldo insuficiente");
            }
        } else {
            console.log("saldo insuficiente");
        }
    }

    depositMoneyIntoSavingBank(amount) {
        if (this.currency === "ARS" && this.overdraft > 0) {
            let amountLeft = amount - this.overdraft;
            this.limit += this.overdraft;
            this.overdraft = 0;
            this.balance += amountLeft;
            console.log("depósito con descubierto cubierto");
            return true;
        } else if (this.currency === "ARS" && this.overdraft === 0) {
            this.balance += amount;
            console.log("depósito en caja de ahorro en pesos exitoso");
            return true;
        } else if (this.currency === "USD") {
            this.balance += amount;
            console.log("depósito en caja de ahorro en dólares exitoso");
            return true;
        } else {
            console.log("hubo un problema");
            return false;
        }
    }

    recordSavingsAccountMovements(idThirdPartyInvolved, amount) {
        try {
            this.balance += amount;
            this.movements.push(new Movement(idThirdPartyInvolved, amount, 0));
            return true;
        } catch {
            return false;
        }
    }
}

const savingBanks = [];

window.SavingsBank = SavingsBank;
window.savingBanks = savingBanks;

