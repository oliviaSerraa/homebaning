let savingsBanksId = 1;
//Es un número único de 22 dígitos que identifica la cuenta
let cbuCounter = 1000000000000000000000;

class SavingsBank {
    constructor(currency, alias, limit) {
        this.id = savingsBanksId;
        savingsBanksId++;
        this.currency = currency;
        this.balance = 0;
        if (currency == "ARS") {
            this.limit = limit;
            this.overdraft = 0;
        }
        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        this.cbu = cbuCounter;
        cbuCounter++;
    }
    // 18)
    withdrawMoneyFromAccount(amount) {
        if (this.currency == "USD") {
            if (this.balance > amount)
                consolelog("extraccion hecha con exito")
            this.balance -= amount
        } if ((this.currency == "ARS") && (this.balance > amount)) {
            consolelog("extraccion hecha con exito")
            this.balance -= amount
        } if ((this.currency == "ARS") && (this.balance < amount) && (this.limit > amount - this.balance)) {
            this.balance = 0
            this.limit -= amount - balance
            this.overdraft -= balance - amount
            consolelog("extraccion hecha con exito")
        } else {
            consolelog("saldo insuficiente")
        }
    }

    // 19)
    depositMoneyIntoSavingBank(amount) {
        if ((this.currency == "ARS") && (this.overdraft > 0)) {
            amount -= this.overdraft
            this.limit += this.overdraft
            this.overdraft = 0
            this.balance += amount
            return true
            consolelog("deposito en caja de ahorro en pesos hecho con exito. Va a figurar menos de lo ingresado en la cuenta, esto es porque pagamos la deuda del limite descubierto")
        } if ((this.currency == "ARS") && (this.overdraft = 0)) {
            this.balance += amount
            consolelog("deposito en caja de ahorro en pesos hecho con exito")
            return true
        } if (this.currency == "USD") {
            this.balance += amount
            consolelog("deposito en caja de ahorro en dolares hecho con exito")
            return true
        } else {
            consolelog("hubo un problema")
            return false
        }
    }

    // 21)
    recordSavingsAccountMovements(idThirdPartyInvolved, amount) {
        try {
            this.balance += amount;
            this.movements.push(new Movement(idThirdPartyInvolved, amount, 0))
            
            return true
        } catch {
            return false
        }

    }
}

const savingBanks = [
    new SavingBank("ARS", "mi.ahorro.personal", 500000),
    new SavingBank("USD", "dolar.futuro.2025", 10000),
    new SavingBank("ARS", "gastos.mensuales.abril", 150000),
    new SavingBank("EUR", "ahorro.europa.viaje", 8000),
    new SavingBank("ARS", "regalo.cumple.juan", 50000)
]


export { SavingsBank };