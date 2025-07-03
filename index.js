let screen = 0;

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
            console.log(clients[i].savingsBanks)
            return clients[i].savingsBanks
        }
    }
}

// 11)
function searchDebitCardsByClientID(clientID) {
    for (let i = 0; i < clients.lenght; i++) {
        if (clients[i].id == clientID) {
            // falta un for
            for (let h = 0; h < clients[i].savingsBanks[j].debitCards.lenght; h++) {
                console.log(clients[i].savingsBanks[j].debitCards[h])
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
                    console.log("la tajeta:", debitCards[h], "es de", clients[i])
                    return clients[i]
                }
            }
        }

    }
}

// 13)
function searchCreditCardsByClientID(clientID) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == clientID) {
            return clients[i].creditCards;
        }
    }
}

// 14) 
function searchCreditCardsByCardID(creditCardID) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].creditCards.length; j++) {
            if (clients[i].creditCards[j] == creditCardID) {
                console.log(clients[i].creditCards[j])
                return clients[i].creditCards[j]
            }
        }
    }
}

// 15)
function searchMovementsBySavingBankID(savingBankID) {
    for (let i = 0; i < savingBanks.length; i++) {
        if (savingBanks[i].id == savingBankID) {
            for (let j = 0; j < savingBanks[i].movements.length; j++) {
                console.log(savingBanks[i].movements[j])
                return savingBanks[i].movements[j]
            }
        }
    }
}

// 16)
function searchMovementsByDebitCardID(debitCardID) {
    for (let i = 0; i < debitCards.length; i++) {
        if (debitCards[i] == debitCardID) {
            return debitCards[i].consumptions
        }
    }
}

// 17)
function searchMovementsByCreditCardID(creditCardID){
    for (let i = 0; i < creditCards.length; i++) {
        if (creditCards[i] == creditCardID) {
            return creditCards[i].consumptions
        }
    }
}

// 23) 
function moneyTransfer(amountInPesos, idOrigin, idDestination){
        if (!amountInPesos && !idOrigin && !idDestination) {
            for (let i = 0; i < savingBanks.length; i++) {
                if (savingBanks[i] == idOrigin) {
                    withdrawMoneyFromAccount(amount)
                    return true
                }
            }
            for (let i = 0; i < savingBanks.length; i++) {
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

// 24)
function login(){
    let dni = document.getElementById("loginDni").value;
    let  password = document.getElementById("loginPassword").velue;

    for(let i = 0; i < clients.length; i++){
        if (clients[i].dni == dni && clints[i].password == password){
            screen = true;
        }
    }
}

function changeScreen(){
    const accountsSection = document.getElementById("accounts");
    const debitCardsSection = document.getElementById("debitCards");
    const transfersSection = document.getElementById("transfers");
    const dollarSection = document.getElementById("dollar");
    const creditCardsSection = document.getElementById("creditCards");
    const paymentsSection = document.getElementById("payments");
    const investmentsSection = document.getElementById("investments");
    const loginSection = document.getElementById("loginFormContainer");
    const registerSection = document.getElementById("registerFormContainer");

    console.log("uwu");

    if(screen == 0){
        loginSection.style.display = "";
        registerSection.style.display = "";
        accountsSection.style.display = "none";
        debitCardsSection.style.display = "none";
        transfersSection.style.display = "none";
        dollarSection.style.display = "none";
        creditCardsSection.style.display = "none";
        paymentsSection.style.display = "none";
        investmentsSection.style.display = "none";
    } if (screen == 1){
        accountsSection.style.display, debitCardsSection.style.display, transfersSection.style.display, dollarSection.style.display, creditCardsSection.style.display,paymentsSection.style.display, investmentsSection.style.display = "";
        loginSection.style.display, registerSection.style.display = "none"
    }
}


changeScreen()