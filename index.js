import { CreditCard } from '../clases/Client.js';
import { DebitCard } from '../clases/CreditCard.js';
import { SavingsBank } from '../clases/DebitCard.js';
import { Client } from '../clases/Movements.js';
import { Movement } from '../clases/savingBank.js';


// 9)
function searchClientById(clientID) {
    for (let i = 0; i < clients.lenght; i++) {
        if (clients[i].id == clientID) {
            consolelog(i)
            return i
        }
    }

}

// 10)
function searchSavingBankByClientID(clientID) {
    for (let i = 0; i < clients.lenght; i++) {
        if (clients[i].id == clientID) {
            consolelog(clients[i].savingsBanks)
            return clients[i].savingsBanks
        }
    }
}

// 11)
function searchDebitCardsByClientID(clientID) {
    for (let i = 0; i < clients.lenght; i++) {
        if (clients[i].id == clientID) {
            for (let h = 0; h < clients[i].savingsBanks[j].debitCards.lenght; h++) {
                consolelog(clients[i].savingsBanks[j].debitCards[h])
                return clients[i].savingsBanks[j].debitCards[h]
            }
        }
    }
}

// 12)
function searchDebitCardsByCardID(debitCardID) {
    for (let i = 0; i < clients.lenght; i++) {
        for (let j = 0; j < clients[i].savingsBanks.lenght; j++) {
            for (let h = 0; h < clients[i].savingsBanks[j].debitCards.lenght; h++) {
                if (clients[i].savingsBanks[j].debitCards[h].id == debitCardID) {
                    consolelog("la tajeta:", debitCards[h], "es de", clients[i])
                    return clients[i]
                }
            }
        }

    }
}

// 13)
function searchCreditCardsByClientID(clientID) {
    for (let i = 0; i < clients.lenght; i++) {
        if (clients[i].id == clientID) {
            for (let j = 0; j < clients[i].creditCards.lenght; j++) {
                consolelog(clients[i].creditCards[j])
                return clients[i].creditCards[j]
            }
        }
    }
}

// 14) 
function searchCreditCardsByCardID(creditCardID) {
    for (let i = 0; i < clients.lenght; i++) {
        for (let j = 0; j < clients[i].creditCards.lenght; j++) {
            if (clients[i].creditCards[j] == creditCardID) {
                consolelog(clients[i].creditCards[j])
                return clients[i].creditCards[j]
            }
        }
    }
}

// 15)
function searchMovementsBySavingBankID(savingBankID) {
    for (let i = 0; i < savingBanks.lenght; i++) {
        if (savingBanks[i].id == savingBankID) {
            for (let j = 0; j < savingBanks[i].movements.lenght; j++) {
                consolelog(savingBanks[i].movements[j])
                return savingBanks[i].movements[j]
            }
        }
    }
}

// 16)
function searchMovementsByDebitCardID(debitCardID) {
    for (let i = 0; i < debitCards.lenght; i++) {
        if (debitCards[i] == debitCardID) {
            return debitCards[i].consumptions
        }
    }
}

// 17)
function searchMovementsByCreditCardID(creditCardID){
    for (let i = 0; i < creditCards.lenght; i++) {
        if (creditCards[i] == creditCardID) {
            return creditCards[i].consumptions
        }
    }
}

// 23) 
function moneyTransfer(amountInPesos, idOrigin, idDestination){
        if (!amountInPesos && !idOrigin && !idDestination) {
            for (let i = 0; i < savingBanks.lenght; i++) {
                if (savingBanks[i] == idOrigin) {
                    withdrawMoneyFromAccount(amount)
                    return true
                }
            }
            for (let i = 0; i < savingBanks.lenght; i++) {
                if (savingBanks[i] == idDestination) {
                    depositMoneyIntoSavingBank(amount)
                    return true
                }
            }
            return true
        } else {
            return false
        }

}
