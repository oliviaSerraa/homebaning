

class UserInterface {
    constructor() {

    }

    getpaginaUsuario() {
        return document.getElementById("pagina-usuario")
    }


    getinicioSesionUsuario() {
        return document.getElementById("formularios")
    }

    getDNI() {
        return document.getElementById("loginDni").value
    }

    getPassword() {
        return document.getElementById("loginPassword").value
    }

    getMenuHamburguesa() {
        return document.getElementById("menuHamburguesa");
    }

    getRegisterName() {
        return document.getElementById("registerName").value;
    }

    getRegisterLastName() {
        return document.getElementById("registerLastName").value;
    }

    getRegisterDNI() {
        return document.getElementById("registerDni").value
    }

    getRegisterEmail() {
        return document.getElementById("registerEmail").value
    }

    getRegisterPassword() {
        return document.getElementById("registerPassword").value
    }


    clearLoginForm() {
        document.getElementById("loginDni").value = "";
        document.getElementById("loginPassword").value = "";
    }

    clearRegisterForm() {
        document.getElementById("registerName").value = "";
        document.getElementById("registerLastName").value = "";
        document.getElementById("registerDni").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";
    }

    getAccountsContainer() {
        return document.getElementById("accountsContainer");
    }

    //27)
    showAccounts() {
        const dni = this.getDNI();
        const accountsContainer = document.querySelector("#accounts .row");
        accountsContainer.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks.forEach(account => {
            const card = document.createElement("div");
            card.classList.add("col-md-6", "col-lg-4", "mb-4");

            card.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">Caja de Ahorro en ${account.currency === "ARS" ? "Pesos" : "Dólares"}</h5>
                    <p class="card-text mb-1"><strong>Moneda:</strong> ${account.currency}</p>
                    <p class="card-text mb-1"><strong>Saldo:</strong> ${account.currency === "ARS" ? "$" : "U$D"} ${account.balance}</p>
                    ${account.currency === "ARS" ? `
                        <p class="card-text mb-1"><strong>Descubierto disponible:</strong> $${account.limit}</p>
                        <p class="card-text mb-1"><strong>Descubierto usado:</strong> $${account.overdraft}</p>
                    ` : ""}
                    <p class="card-text mb-1"><strong>Alias:</strong> ${account.alias}</p>
                    <p class="card-text mb-3"><strong>CBU:</strong> ${account.cbu}</p>
                    <div class="d-grid">
                        <button class="btn btn-outline-primary btn-sm" onclick="verMovimientos('${account.id}')">Ver movimientos</button>
                    </div>
                </div>
            </div>
        `;

            accountsContainer.appendChild(card);
        });
    }

    selectSavingsBank() {
        const dni = ui.getDNI();
        const select = document.getElementById("debitCardAccountSelect");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks.forEach(sb => {
            const option = document.createElement("option");
            option.value = sb.id;
            option.textContent = `${sb.alias} (${sb.currency})`;
            select.appendChild(option);
        });

    }

    showDebitCardInfo() {
        const dni = this.getDNI();
        const client = clients.find(c => c.dni === dni);
        const select = document.getElementById("debitCardAccountSelect");
        const infoContainer = document.getElementById("debitCardInfo");

        if (!client || !select || !infoContainer) return;

        // Asegurarse de que el select tenga opciones
        select.innerHTML = "";
        client.savingsBanks.forEach(sb => {
            const option = document.createElement("option");
            option.value = sb.id;
            option.textContent = `${sb.alias} (${sb.currency})`;
            select.appendChild(option);
        });

        // Mostrar info de la primera cuenta por defecto
        const firstAccount = client.savingsBanks[0];
        if (firstAccount) {
            this.renderDebitCardInfo(firstAccount.id);
        }

        // Escuchar cambio en el select
        select.addEventListener("change", (e) => {
            const selectedId = parseInt(e.target.value);
            this.renderDebitCardInfo(selectedId);
        });
    }


    //29 a y b)
    renderDebitCardInfo(accountId) {
        const dni = this.getDNI();
        const client = clients.find(c => c.dni === dni);
        const infoContainer = document.getElementById("debitCardInfo");

        if (!client) return;

        const account = client.savingsBanks.find(sb => sb.id === accountId);
        if (!account || account.debitCards.length === 0) {
            infoContainer.innerHTML = "<p class='text-muted'>Esta cuenta no tiene tarjeta de débito asociada.</p>";
            return;
        }

        const card = account.debitCards[0];
        infoContainer.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">${card.provider} •••• ${card.cardNumber.toString().slice(-4)}</h5>
        <p class="mb-1">Nombre en tarjeta: <span>${card.displayName}</span></p>
        <p class="mb-2">Vencimiento: <span>${new Date(card.expirationDate).toLocaleDateString()}</span></p>

        <div class="mb-2">
            <label class="form-label">Número de tarjeta</label>
            <div class="input-group">
                <input type="password" class="form-control card-number-input" value="${card.cardNumber}" readonly>
                <button class="btn btn-outline-secondary toggle-card-number" type="button">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>

        <div class="mb-2">
            <label class="form-label">Código de seguridad</label>
            <div class="input-group">
                <input type="password" class="form-control card-cvv-input" value="${card.securityCode}" readonly>
                <button class="btn btn-outline-secondary toggle-cvv" type="button">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>
        
        <div class="d-grid mt-3">
            <button class="btn btn-outline-primary btn-sm view-movements-btn" data-card-id="${card.id}">Ver movimientos</button>
        </div>
    </div>
    `;
        const toggleCardNumberBtn = infoContainer.querySelector('.toggle-card-number');
        const toggleCvvBtn = infoContainer.querySelector('.toggle-cvv');
        const viewMovementsBtn = infoContainer.querySelector('.view-movements-btn');

        if (toggleCardNumberBtn) {
            toggleCardNumberBtn.addEventListener('click', () => {
                const input = infoContainer.querySelector('.card-number-input');
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleCardNumberBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    toggleCardNumberBtn.innerHTML = '<i class="bi bi-eye"></i>';
                }
            });
        }

        if (toggleCvvBtn) {
            toggleCvvBtn.addEventListener('click', () => {
                const input = infoContainer.querySelector('.card-cvv-input');
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleCvvBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    toggleCvvBtn.innerHTML = '<i class="bi bi-eye"></i>';
                }
            });
        }

        if (viewMovementsBtn) {
            viewMovementsBtn.addEventListener('click', () => {
                const cardId = viewMovementsBtn.getAttribute('data-card-id');
                this.showDebitCardMovements(cardId);
            });
        }
    }

    // Nuevo método para mostrar movimientos de tarjeta de débito
    showDebitCardMovements(cardId) {
        const movements = searchMovementsByDebitCardID(parseInt(cardId));
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");

        modalTitle.textContent = "Movimientos de la tarjeta de débito";
        modalBody.innerHTML = "";

        if (!movements || movements.length === 0) {
            modalBody.innerHTML = "<p>No hay movimientos para esta tarjeta.</p>";
        } else {
            movements.forEach(mov => {
                modalBody.innerHTML += `
                <div class="mb-2">
                    <p><strong>Descripción:</strong> ${mov.description}</p>
                    <p><strong>Monto:</strong> ${mov.amount}</p>
                    <p><strong>Fecha:</strong> ${new Date(mov.date).toLocaleDateString()}</p>
                    <hr>
                </div>
            `;
            });
        }

        const modal = new bootstrap.Modal(document.getElementById("modal"));
        modal.show();
    }


    showAccountsOrigin() {
        const dni = this.getDNI();
        const select = document.getElementById("transferOrigin");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks.forEach(sb => {
            const option = document.createElement("option");
            option.value = sb.id;
            option.textContent = `${sb.alias} (${sb.currency})`;
            select.appendChild(option);
        });
    }

    showAccountsDestiny() {
        if (!currentClient) return;

        const dni = currentClient.dni;
        const select = document.getElementById("transferDestinysSelect");
        select.innerHTML = "";

        const otrosClientes = clients.filter(c => c.dni !== dni);

        otrosClientes.forEach(cliente => {
            cliente.savingsBanks.forEach(sb => {
                const option = document.createElement("option");
                option.value = sb.alias;
                option.textContent = `${sb.alias} (${sb.currency}) - ${cliente.name} ${cliente.lastName}`;
                select.appendChild(option);
            });
        });
    }

    showPesosAccounts() {
        const dni = this.getDNI();
        const select = document.getElementById("pesosAccount");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks
            .filter(sb => sb.currency === "ARS")
            .forEach(sb => {
                const option = document.createElement("option");
                option.value = sb.id;
                option.textContent = `${sb.alias} (${sb.currency})`;
                select.appendChild(option);
            });
    }


    showDollarAccounts() {
        const dni = this.getDNI();
        const select = document.getElementById("dollarsAccount");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks
            .filter(sb => sb.currency === "USD")
            .forEach(sb => {
                const option = document.createElement("option");
                option.value = sb.id;
                option.textContent = `${sb.alias} (${sb.currency})`;
                select.appendChild(option);
            });
    }
    selectCreditCards() {
        const dni = this.getDNI();
        const select = document.getElementById("creditCardSelect");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.creditCards.forEach(cc => {
            const option = document.createElement("option");
            option.value = cc.id;
            option.textContent = `${cc.provider} - ${cc.displayName}`;
            select.appendChild(option);
        });
    }
    showCreditCards() {
        const dni = this.getDNI();
        const select = document.getElementById("creditCardSelect");
        const infoContainer = document.getElementById("creditCardInfo");

        const client = clients.find(c => c.dni === dni);
        if (!client || !select || !infoContainer) return;

        // Mostrar la primera tarjeta por defecto
        if (client.creditCards.length > 0) {
            this.renderCreditCardInfo(client.creditCards[0].id);
        }

        // Escuchar cambios en el select
        select.addEventListener("change", (e) => {
            const selectedId = parseInt(e.target.value);
            this.renderCreditCardInfo(selectedId);
        });
    }

    //32) a y b)
    renderCreditCardInfo(cardId) {
        const dni = this.getDNI();
        const client = clients.find(c => c.dni === dni);
        const infoContainer = document.getElementById("creditCardInfo");

        if (!client) return;

        const card = client.creditCards.find(cc => cc.id === cardId);
        if (!card) {
            infoContainer.innerHTML = "<p class='text-muted'>No se encontró información de la tarjeta</p>";
            return;
        }

        infoContainer.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${card.provider} •••• ${card.cardNumber.toString().slice(-4)}</h5>
                <p class="mb-1">Nombre en tarjeta: <span>${card.displayName}</span></p>
                <p class="mb-1">Vencimiento: <span>${new Date(card.expirationDate).toLocaleDateString()}</span></p>
                <p class="mb-1">Fecha del próximo cierre: <span>${new Date(card.closeDate).toLocaleDateString()}</span></p>
                <p class="mb-1">Saldo adeudado: $<span>${card.balance?.toFixed(2)}</span></p>
                <p class="mb-2">Fecha de vencimiento: <span>${new Date(card.balanceExpirationDate).toLocaleDateString()}</span></p>
                
                <div class="mb-2">
                    <label class="form-label">Número de tarjeta</label>
                    <div class="input-group">
                        <input type="password" class="form-control card-number-input" value="${card.cardNumber}" readonly>
                        <button class="btn btn-outline-secondary toggle-card-number" type="button">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label">Código de seguridad</label>
                    <div class="input-group">
                        <input type="password" class="form-control card-cvv-input" value="${card.securityCode}" readonly>
                        <button class="btn btn-outline-secondary toggle-cvv" type="button">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const toggleCardNumberBtn = infoContainer.querySelector('.toggle-card-number');
        const toggleCvvBtn = infoContainer.querySelector('.toggle-cvv');

        if (toggleCardNumberBtn) {
            toggleCardNumberBtn.addEventListener('click', () => {
                const input = infoContainer.querySelector('.card-number-input');
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleCardNumberBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    toggleCardNumberBtn.innerHTML = '<i class="bi bi-eye"></i>';
                }
            });
        }

        if (toggleCvvBtn) {
            toggleCvvBtn.addEventListener('click', () => {
                const input = infoContainer.querySelector('.card-cvv-input');
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleCvvBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    toggleCvvBtn.innerHTML = '<i class="bi bi-eye"></i>';
                }
            });
        }
    }

    selectPaymentMethods() {
        const dni = this.getDNI();
        const select = document.getElementById("paymentMethodSelect");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;


        client.creditCards.forEach(cc => {
            const option = document.createElement("option");
            option.value = `credit-${cc.id}`;
            option.textContent = `Crédito: ${cc.provider} - ${cc.displayName}`;
            select.appendChild(option);
        });


        client.savingsBanks.forEach(sb => {
            if (sb.debitCards && sb.debitCards.length > 0) {
                sb.debitCards.forEach(dc => {
                    const option = document.createElement("option");
                    option.value = `debit-${dc.id}`;
                    option.textContent = `Débito: ${dc.provider} - ${dc.displayName}`;
                    select.appendChild(option);
                });
            }
        });


    }

    investmentAccountSelect() {
        const dni = ui.getDNI();
        const select = document.getElementById("investmentAccountSelect");
        select.innerHTML = "";

        const client = clients.find(c => c.dni === dni);
        if (!client) return;

        client.savingsBanks.forEach(sb => {
            const option = document.createElement("option");
            option.value = sb.id;
            option.textContent = `${sb.alias} (${sb.currency})`;
            select.appendChild(option);
        });
    }




}

const ui = new UserInterface();