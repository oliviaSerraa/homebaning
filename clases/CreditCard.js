let id = 1;
let cardsNumbers = 1000000000000000;

class CreditCard {
    constructor(proveedorTarjetaCredito, vencimientoTarjetaCredito, codigoSeguridad, nombreEscrito, interesPorPago, fechaCierreTarjeta) {
        this.idTarjetaCredito = id;
        id++;
        this.numeroTarjetaCredito = cardsNumbers;
        cardsNumbers++;
        this.proveedorTarjetaCredito = proveedorTarjetaCredito;

        const vencimiento = new Date(vencimientoTarjetaCredito);
        const año = vencimiento.getFullYear() + 5;
        const mes = (vencimiento.getMonth() + 1).toString().padStart(2, '0');
        this.vencimientoTarjetaCredito = `${mes}/${año}`;

        this.codigoSeguridad = codigoSeguridad;
        this.nombreEscrito = nombreEscrito;
        this.saldoTarjetaCredito = 0;

        if (saldoTarjetaCredito > 1) {
            this.interesPorPago = null;
        } else {
            this.interesPorPago = interesPorPago;
        }
        
        this.fechaCierreTarjeta = fechaCierreTarjeta;
        this.historialTarjetaCredito = [];
    }
}

const creditCards = []; // Cambiado a const