let currentScreen = 0;
let currentClient = null;

function searchClientById(clientID) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === clientID) {
            console.log(i + 1);
            return i;
        }
    }
}

window.searchClientById = searchClientById;

function searchSavingBankByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    return client ? client.savingsBanks : null;
}

function searchDebitCardsByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    if (!client) return null;

    let allCards = [];
    for (let sb of client.savingsBanks) {
        allCards.push(...sb.debitCards);
    }
    return allCards;
}

function searchDebitCardsByCardID(debitCardID) {
    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            for (let card of sb.debitCards) {
                if (card.id === debitCardID) {
                    console.log("la tarjeta:", card, "es de", client);
                    return client;
                }
            }
        }
    }
}

function searchCreditCardsByClientID(clientID) {
    const client = clients.find(c => c.id === clientID);
    return client ? client.creditCards : null;
}

function searchCreditCardsByCardID(creditCardID) {
    for (let client of clients) {
        for (let card of client.creditCards) {
            if (card.id === creditCardID) {
                return card;
            }
        }
    }
}

function searchMovementsBySavingBankID(savingBankID) {
    const bank = savingBanks.find(sb => sb.id === savingBankID);
    return bank ? bank.movements : null;
}

function searchMovementsByDebitCardID(debitCardID) {
    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            for (let card of sb.debitCards) {
                if (card.id === debitCardID) {
                    return card.movements || [];
                }
            }
        }
    }
    return [];
}

function searchMovementsByCreditCardID(creditCardID) {
    const card = creditCards.find(cc => cc.id === creditCardID);
    return card ? card.consumptions : null;
}

function findSavingBankById(id) {
    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            if (sb.id == id) return sb;
        }
    }
    return null;
}

function moneyTransfer(amount, idOrigin, idDestination) {

    if (
        typeof amount !== 'number' || isNaN(amount) || amount <= 0 ||
        typeof idOrigin !== 'number' || isNaN(idOrigin) ||
        typeof idDestination !== 'number' || isNaN(idDestination)
    ) {
        console.log("Datos inválidos para la operación");
        return false;
    }


    const originAccount = findSavingBankById(idOrigin);
    const destinationAccount = findSavingBankById(idDestination);

    if (!originAccount || !destinationAccount) {
        console.log("Cuenta origen o destino no encontrada");
        return false;
    }

    originAccount.withdrawMoneyFromAccount(amount);
    destinationAccount.depositMoneyIntoSavingBank(amount);
    return true;
}

function changeScreen() {
    let paginaUsuario = ui.getpaginaUsuario();
    let inicioSesionUsuario = ui.getinicioSesionUsuario();
    let menuHamburguesa = document.getElementById("menuHamburguesa");

    if (!paginaUsuario || !inicioSesionUsuario || !menuHamburguesa) {
        console.error("No se encontraron elementos necesarios para cambiar de pantalla");
        return;
    }

    if (currentScreen === 0) {
        paginaUsuario.style.display = "none";
        inicioSesionUsuario.style.display = "block";
        menuHamburguesa.style.display = "none";
    } if (currentScreen === 1) {
        formularios.style.display = "none";
        paginaUsuario.style.display = "block";
        menuHamburguesa.style.display = "block";
    }
}



// 24)
function login() {
    let dni = ui.getDNI();
    let password = ui.getPassword();

    const client = clients.find(c => c.dni === dni && c.password === password);

    if (client) {
        alert("Has ingresado correctamente");
        currentScreen = 1;
        currentClient = client;
        changeScreen();
        ui.selectPaymentMethods();
        ui.showAccountsOrigin();
        ui.showAccountsDestiny();
        ui.showDollarAccounts();
        ui.showPesosAccounts();
        ui.showDebitCardInfo();
        ui.showCreditCards();
        ui.selectCreditCards();
        ui.selectSavingsBank();
        ui.investmentAccountSelect();
        ui.showAccounts();

    } else {
        alert("Ha ocurrido un error. Verifique que los datos estén correctamente ingresados");
    }
}


window.addEventListener("DOMContentLoaded", () => {
    changeScreen();

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        login();
    });

    document.querySelector("#transfers form").addEventListener("submit", function(e) {
    e.preventDefault();
    moneyTransferButton();
    });

    document.querySelector("#dollar form").addEventListener("submit", function(e) {
    e.preventDefault();
    buyingSellingDollarsButton();
    });

});

//25) 
function registrarse() {
    let dni = ui.getRegisterDNI();
    let name = ui.getRegisterName();
    let email = ui.getRegisterEmail();
    let lastName = ui.getRegisterLastName();
    let password = ui.getRegisterPassword();

    if (dni && name && email && lastName && password) {
        new Client(dni, password, name, lastName, email)
        alert("Te has registrado correctamente!");

        currentScreen = 1;
        changeScreen();
        ui.selectPaymentMethods();
        ui.showAccountsOrigin();
        ui.showAccountsDestiny();
        ui.showDollarAccounts();
        ui.showPesosAccounts();
        ui.showDebitCardInfo();
        ui.showCreditCards();
        ui.selectCreditCards();
        ui.selectSavingsBank();
        ui.investmentAccountSelect();
        ui.showAccounts();


    } else {
        alert("Por favor, complete todos los campos");
    }
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    registrarse();
});

// 26)
function logout() {
    currentScreen = 0;
    changeScreen();
    ui.clearLoginForm();
    ui.clearRegisterForm();
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasMenu"));
    if (offcanvas) {
        offcanvas.hide();
    }
}


//28)
function verMovimientos(accountId) {
    const movements = searchMovementsBySavingBankID(accountId);
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    modalTitle.textContent = "Movimientos de la cuenta";
    modalBody.innerHTML = "";

    if (!movements || movements.length === 0) {
        modalBody.innerHTML = "<p>No hay movimientos para esta cuenta.</p>";
    } else {
        movements.forEach(mov => {
            modalBody.innerHTML += `
                <div class="mb-2">
                    <p><strong>Nombre del tercero:</strong> ${mov.thirdPartyName}</p>
                    <p><strong>Monto:</strong> ${mov.amount}</p>
                    <p><strong>Cuotas:</strong> ${mov.coutes}</p>
                    <hr>
                </div>
            `;
        });
    }

    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
}

//30)
function moneyTransferButton() {
    const idOrigin = parseInt(document.getElementById("transferOrigin").value);
    const amount = parseFloat(document.getElementById("transferAmount").value);
    let inputDest = document.getElementById("transferDestiny").value;

    if (!inputDest) {
        inputDest = document.getElementById("transferDestinysSelect").value;
    }

    let destAccountId = null;

    for (let client of clients) {
        for (let sb of client.savingsBanks) {
            if (sb.alias === inputDest || sb.cbu === inputDest) {
                destAccountId = sb.id;
                break;
            }
        }
        if (destAccountId) break;
    }

    if (!destAccountId) {
        alert("El CBU o Alias de destino es incorrecto");
        return;
    }

    const success = moneyTransfer(amount, idOrigin, destAccountId);

    if (success) {
        alert("Transferencia realizada con éxito");
        document.getElementById("transferAmount").value = "";
        document.getElementById("transferDestiny").value = "";
        document.getElementById("transferDestinysSelect").selectedIndex = 0;
        ui.showAccounts();
    } else {
        alert("No se pudo realizar la transferencia");
    }
}

//31)

function buyingSellingDollarsButton() {
    const operation = document.getElementById("dollarOperation").value;
    const pesosAccountId = parseInt(document.getElementById("pesosAccount").value);
    const dollarsAccountId = parseInt(document.getElementById("dollarsAccount").value);
    const amount = parseFloat(document.getElementById("dollarsAmount").value);

    console.log(operation, " ", pesosAccountId, " ", dollarsAccountId, " ", amount);

    if (!amount || amount <= 0) {
        alert("Monto inválido");
        return;
    }

    if (isNaN(pesosAccountId) || isNaN(dollarsAccountId)) {
        alert("Debés seleccionar ambas cuentas correctamente");
        return;
    }

    if (!currentClient) {
        alert("No se encontró el cliente logueado");
        return;
    }

    let success = false;

    if (operation === "compra") {
        success = currentClient.buyingSellingDollars(amount, pesosAccountId, dollarsAccountId, "compra");
    } else if (operation === "venta") {
        success = currentClient.buyingSellingDollars(amount, dollarsAccountId, pesosAccountId, "venta");
    } else {
        alert("Operación inválida");
        return;
    }

    if (success) {
        alert("Operación realizada con éxito");
        document.getElementById("dollarsAmount").value = "";
        document.getElementById("dollarOperation").selectedIndex = 0;
        document.getElementById("pesosAccount").selectedIndex = 0;
        document.getElementById("dollarsAccount").selectedIndex = 0;
        ui.showAccounts();
    } else {
        alert("No se pudo realizar la operación");
    }
}

function actualizarEquivalenteDolar() {
    const operation = document.getElementById("dollarOperation").value;
    const amount = parseFloat(document.getElementById("dollarsAmount").value);
    const span = document.getElementById("dollarEquivalent");

    if (!operation || isNaN(amount) || amount <= 0) {
        span.textContent = "$0";
        return;
    }

    const cotizacionCompra = 1150;
    const cotizacionVenta = 1200;

    if (operation === "compra") {
        span.textContent = `$${(amount * cotizacionVenta).toFixed(2)}`;
    } else if (operation === "venta") {
        span.textContent = `$${(amount * cotizacionCompra).toFixed(2)}`;
    }
}

//32

function pagoMinimo() {
    const minimo = (ui.balanceFind() * 0.1);
    document.getElementById("customPaymentAmount").value = minimo;
}

function pagoTotal() {
    document.getElementById("customPaymentAmount").value = ui.balanceFind();
}

function pagoButton() {
    const montoInput = ui.montoInput();
    const monto = parseFloat(montoInput);

    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido");
        return;
    }

    const balance = ui.balanceFind();
    if (!balance) return;

    const minimo = balance * 0.1;

    if (monto < minimo) {
        alert("Debe ingresar al menos el monto mínimo a pagar");
        return;
    }

    const tarjetaId = parseInt(document.getElementById("creditCardSelect").value);
    const tarjeta = currentClient.creditCards.find(t => t.id === tarjetaId);

    if (!tarjeta) {
        alert("Tarjeta no encontrada");
        return;
    }

    const cuentaPesos = currentClient.savingsBanks.find(c => c.currency === "ARS");
    if (!cuentaPesos) {
        alert("No tiene caja de ahorro en pesos");
        return;
    }

    if ((cuentaPesos.balance + cuentaPesos.limit) < monto) {
        alert("Saldo insuficiente en la cuenta en pesos");
        return;
    }

    cuentaPesos.withdrawMoneyFromAccount(monto);
    tarjeta.registerPayment(monto);

    alert("Pago realizado con éxito");
    ui.clearPagoButton();
    ui.showAccounts();
    ui.showCreditCards();
}

//33)
function registrarGasto() {
    const selectCard = ui.cardSelect();
    const store = ui.storeInput();
    const amount = ui.amountInput();
    const cuotes = ui.cuotesSelect();


    if (!selectCard || !store || isNaN(amount) || amount <= 0) {
        alert("Completá todos los campos correctamente");
        return;
    }

    const [tipo, id] = selectCard.split("-");
    const cardId = parseInt(id);

    if (tipo === "credit") {
        const tarjeta = currentClient.creditCards.find(c => c.id === cardId);
        if (!tarjeta) return alert("Tarjeta de crédito no encontrada");

        const exito = tarjeta.recordCreditCardMovements(store, amount, cuotes);
        console.log(store, " ", amount, " ", cuotes);
        if (exito) {
            alert("Gasto registrado en tarjeta de crédito");
        } else {
            alert("No se pudo registrar el gasto");
        }

    } else if (tipo === "debit") {
        for (let sb of currentClient.savingsBanks) {
            const tarjeta = sb.debitCards.find(d => d.id === cardId);
            if (tarjeta) {
                const exito = tarjeta.recordDebitCardMovements(store, amount);
                if (exito) {
                    alert("Gasto registrado en tarjeta de débito");
                } else {
                    alert("No se pudo registrar el gasto");
                }
                return;
            }
        }

        alert("Tarjeta de débito no encontrada");
    } else {
        alert("Tipo de tarjeta no reconocido");
    }
    
    ui.clearRegistrarGasto();
}

function interesInversion() {
    const monto = parseFloat(ui.leerSeleccionado());
    const interes = ui.leerInversion();
    const cuentaId = parseInt(ui.leerSavingBank());

    if (!interes || isNaN(monto) || monto <= 0 || isNaN(cuentaId)) {
        alert("Complete todos los campos correctamente");
        return;
    }

    const cuenta = findSavingBankById(cuentaId);
    if (!cuenta || cuenta.balance < monto) {
        alert("Saldo insuficiente");
        return;
    }
    cuenta.withdrawMoneyFromAccount(monto);
    
    const ganancia = monto * (interes / 100);
    alert(`Inversión exitosa! Ganancia estimada en 30 días: $${ganancia}`);

    cuenta.depositMoneyIntoSavingBank(ganancia)

    ui.cleanInput();
    
}


document.getElementById("dollarOperation").addEventListener("change", actualizarEquivalenteDolar);
document.getElementById("dollarsAmount").addEventListener("input", actualizarEquivalenteDolar);
window.searchSavingBankByClientID = searchSavingBankByClientID;
window.searchDebitCardsByClientID = searchDebitCardsByClientID;
window.searchDebitCardsByCardID = searchDebitCardsByCardID;
window.searchCreditCardsByClientID = searchCreditCardsByClientID;
window.searchCreditCardsByCardID = searchCreditCardsByCardID;
window.searchMovementsBySavingBankID = searchMovementsBySavingBankID;
window.searchMovementsByDebitCardID = searchMovementsByDebitCardID;
window.searchMovementsByCreditCardID = searchMovementsByCreditCardID;
window.moneyTransfer = moneyTransfer;
window.changeScreen = changeScreen;
window.login = login;
window.registrarse = registrarse;
window.logout = logout;
