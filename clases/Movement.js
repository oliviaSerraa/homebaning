let id = 1;

class Movement {
    
    constructor(nombreTercero, monto, tipoMovimiento, tarjetaUtilizada, cuotas) {
        this.idMovimiento = id;
        id = id++;
        this.fechaMovimiento = new Date();
        this.nombreTercero = nombreTercero; 
        this.monto = monto;
        this.tipoMovimiento = tipoMovimiento; 
        this.tarjetaUtilizada = null; // id de la tarjeta
    
        if (tipoMovimiento == "EGRESO") {
            this.tarjetaUtilizada = tarjetaUtilizada;

            if (tarjetaUtilizada == "CRÉDITO") {
                this.cuotas = cuotas;
            } else if (tarjetaUtilizada == "DEBITO") {
               this.cuotas = 0;
            }

        } else {
            this.tarjetaUtilizada = null;
            this.cuotas = 0;
        }
    }
}
