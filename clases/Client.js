let id = 1;

class Client {
    constructor(dni, contraseña, nombre, apellido) {
        this.idCliente = id;
        id++;
        this.dni = dni;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cajasAhorroAsociadas = [];
        this.tarjetasCreditoAsociadas = [];
    }

    compraVentaDolares(cantDolares, idCajaAhorroExtrae, idCajaAhorroIngresa) {
        const CONVERSION = cantDolares * 1182;
        try {
            let cajaOrigen, cajaDestino;
            
            // Buscar cajas de ahorro
            for (let i = 0; i < this.cajasAhorroAsociadas.length; i++) {
                const caja = this.cajasAhorroAsociadas[i];
                if (caja.id === idCajaAhorroExtrae) {
                    cajaOrigen = caja;
                }
                if (caja.id === idCajaAhorroIngresa) {
                    cajaDestino = caja;
                }
            }

            if (!cajaOrigen || !cajaDestino) {
                return false;
            }

            const esCompra = cajaOrigen.monedaCajaAhorro === "ARS" && cajaDestino.monedaCajaAhorro === "USD";
            const esVenta = cajaOrigen.monedaCajaAhorro === "USD" && cajaDestino.monedaCajaAhorro === "ARS";
            
            if (!esCompra && !esVenta) {
                return false;
            }

            const montoOrigen = esCompra ? CONVERSION : cantDolares;
            const montoDestino = esCompra ? cantDolares : CONVERSION;
            
            if (cajaOrigen.extraerDinero(montoOrigen)) {
                cajaDestino.ingresarDinero(montoDestino);
                return true;
            }
            
            return false;
        } catch {
            return false;
        }
    }
}

const clients = [];
clients.push(new Client(48792431, "teamoTaylorSwiftShakeItOff13", "Olivia", "Serra"));
clients.push(new Client(48180206, "16082023", "Martina", "Sandri"));
clients.push(new Client(48315887, "PelónPelón160823", "Prancisco", "Ficca"));
clients.push(new Client(13131313, "EveryVersionIsTaylorsVersion", "Taylor", "Swift"));
clients.push(new Client(88888888, "a", "a", "a"));