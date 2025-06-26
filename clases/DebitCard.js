let id = 1;
let cardsNumbers = 1000000000000000;

class DebitCard {
    constructor(proveedor, codigoSeguridad, nombreEscrito) {
        this.idTarjetaDebito = id++;
        this.numeroTarjetaDebito = cardsNumbers++;
        this.proveedor = proveedor;

        this.emision = new Date();
        const año = this.emision.getFullYear() + 5;
        const mes = (this.emision.getMonth() + 1).toString().padStart(2, '0');
        this.vencimientoTarjetaDebito = `${mes}/${año}`;

        this.codigoSeguridad = codigoSeguridad;
        this.nombreEscrito = nombreEscrito;
        this.historialConsumos = [];
    }
}

const debitCards = [];
debitCards.push(new DebitCard("Visa", 348, "OLIVIA SERRA"));
debitCards.push(new DebitCard("Mastercard", 721, "MARTINA R SANDRI"));
debitCards.push(new DebitCard("Mastercard", 874, "FRANCIS PICCA"));
debitCards.push(new DebitCard("American Express", 119, "TAYLOR A SWIFT"));
debitCards.push(new DebitCard("Visa", 243, "A A"));