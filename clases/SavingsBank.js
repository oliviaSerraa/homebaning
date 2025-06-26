let savingsBanksId = 1;
let num = 1000000000000000000000;

class SavingsBank {
    constructor(monedaCajaAhorro, limiteDescubierto, alias) {
        this.id = savingsBanksId++;
        this.monedaCajaAhorro = monedaCajaAhorro.toUpperCase(); // Aseguramos mayúsculas
        this.saldoCajaAhorro = 0;
        this.alias = alias;
        this.cbu = num++;
        this.debitCards = [];
        this.movements = [];

        if (monedaCajaAhorro === "ARS") {
            if (limiteDescubierto > 0 && Number.isInteger(limiteDescubierto)) {
                this.limiteDescubierto = limiteDescubierto;
                this.montoUtilizadoDescubierto = 0;
            } else {
                this.limiteDescubierto = 0;
                this.montoUtilizadoDescubierto = 0;
            }
        } else if (monedaCajaAhorro === "USD") {
            this.limiteDescubierto = null;
            this.montoUtilizadoDescubierto = null;
        } else {
            throw new Error("Moneda no válida. Use 'ARS' o 'USD'.");
        }
    }
            
    extraerDinero(monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            return false;
        }

        if (this.monedaCajaAhorro === "ARS") {
            if (monto > this.saldoCajaAhorro) {
                const descubiertoNecesario = monto - this.saldoCajaAhorro;
                const descubiertoDisponible = this.limiteDescubierto - this.montoUtilizadoDescubierto;
                
                if (descubiertoNecesario > descubiertoDisponible) {
                    return false;
                }
                
                this.montoUtilizadoDescubierto += descubiertoNecesario;
                this.saldoCajaAhorro = 0;
                return true;
            }
            
            this.saldoCajaAhorro -= monto;
            return true;
        } 
        
        if (this.monedaCajaAhorro === "USD") {
            if (monto > this.saldoCajaAhorro) {
                return false;
            }
            
            this.saldoCajaAhorro -= monto;
            return true;
        }
        
        return false;
    }

    ingresarDinero(monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            return false;
        }

        if (this.monedaCajaAhorro === "ARS" && this.montoUtilizadoDescubierto > 0) {
            if (monto > this.montoUtilizadoDescubierto) {
                const resto = monto - this.montoUtilizadoDescubierto;
                this.montoUtilizadoDescubierto = 0;
                this.saldoCajaAhorro += resto;
            } else {
                this.montoUtilizadoDescubierto -= monto;
            }
            return true;
        }
        
        this.saldoCajaAhorro += monto;
        return true;
    }
}

const savings = [];
savings.push(new SavingsBank("ARS", 100000, "oli.swiftie"));
savings.push(new SavingsBank("ARS", 100000, "martina.picca"));
savings.push(new SavingsBank("ARS", 100000, "frncisco.sandri"));
savings.push(new SavingsBank("USD", null, "mislagrimasricoteras"));
savings.push(new SavingsBank("ARS", 100000, "a"));