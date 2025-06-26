// Función para encontrar un cliente por ID
function findClientById(idCliente) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].idCliente === idCliente) {
            return clients[i];
        }
    }
    return null;
}

// Función para obtener cajas de ahorro en ARS de un cliente
function getARSAccountsByClient(idCliente) {
    const result = [];
    const client = findClientById(idCliente);
    
    if (client) {
        for (const caja of client.cajasAhorroAsociadas) {
            if (caja.monedaCajaAhorro === "ARS") {
                result.push(caja);
            }
        }
    }
    return result;
}

// Función para obtener cajas de ahorro en USD de un cliente
function getUSDAccountsByClient(idCliente) {
    const result = [];
    const client = findClientById(idCliente);
    
    if (client) {
        for (const caja of client.cajasAhorroAsociadas) {
            if (caja.monedaCajaAhorro === "USD") {
                result.push(caja);
            }
        }
    }
    return result;
}

// Función para obtener tarjetas de débito de un cliente
function getDebitCardsByClient(idCliente) {
    const result = [];
    const client = findClientById(idCliente);
    
    if (client) {
        for (const caja of client.cajasAhorroAsociadas) {
            result.push(...caja.debitCards);
        }
    }
    return result;
}

// Función para obtener una tarjeta de débito específica
function getDebitCardById(idCliente, idTarjeta) {
    const cards = getDebitCardsByClient(idCliente);
    return cards.find(card => card.idTarjetaDebito === idTarjeta);
}

// Función para obtener tarjetas de crédito de un cliente
function getCreditCardsByClient(idCliente) {
    const client = findClientById(idCliente);
    return client ? [...client.tarjetasCreditoAsociadas] : [];
}

// Función para obtener una tarjeta de crédito específica
function getCreditCardById(idCliente, idTarjeta) {
    const cards = getCreditCardsByClient(idCliente);
    return cards.find(card => card.idTarjetaCredito === idTarjeta);
}

// Función para obtener movimientos de una caja de ahorro
function getMovementsByAccount(idCajaAhorro, idCliente) {
    const client = findClientById(idCliente);
    if (!client) return [];
    
    const caja = client.cajasAhorroAsociadas.find(c => c.id === idCajaAhorro);
    return caja ? [...caja.movements] : [];
}

// Función para obtener movimientos de una tarjeta de débito
function getMovementsByDebitCard(idTarjeta, idCliente) {
    const movements = [];
    const client = findClientById(idCliente);
    
    if (client) {
        for (const caja of client.cajasAhorroAsociadas) {
            for (const movement of caja.movements) {
                if (movement.tarjetaUtilizada && 
                    movement.tarjetaUtilizada.idTarjetaDebito === idTarjeta) {
                    movements.push(movement);
                }
            }
        }
    }
    return movements;
}