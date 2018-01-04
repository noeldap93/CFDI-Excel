let parseString = require("xml2js").parseString;
let fs = require("fs");
class CFDI {
    constructor() {
        this.gResult;
    }

    load(CFDItext) {
        parseString(CFDItext, (error, result) => {
            if (error) {
                console.log("Error", error);
                return;
            }
            gResult = result["cfdi:Comprobante"];
            content = gResult.$;
        });
    }
        getFecha() {
            let defineFecha = content.fecha;
            return (defineFecha);
        }
        getSubtotal() {
            let defineSubtotal = content.subTotal;
            return (defineSubtotal);
        }
        getTotal() {
            let defineTotal = content.total;
            return (defineTotal);
        }
        getDescuento() {
            let defineDescuento = content.descuento || "0";
            return (defineDescuento);
        }
        getFormapago() {
            let defineFormadepago = content.formaDePago;
            return (defineFormadepago);
        }
        getMetodopago() {
            let defineMetodopago = content.metodoDePago;
            return (defineMetodopago);
        }
        getFolio() {
            let defineFolio = content.folio;
            return (defineFolio);
        }
        getNcuenta() {
            let defineNcuenta = content.NumCtaPago || "Na";
            return (defineNcuenta);
        }
        let emisordata = gResult["cfdi:Emisor"][0].$;
        getnombreEmisor() {
            let nombreEmisor = emisordata.nombre;
            return (nombreEmisor);
        }
        getRfcEmisor() {
            let rfcEmisor = emisordata.rfc;
            return (rfcEmisor);
        }
        let receptordata = gResult["cfdi:Receptor"][0].$;
        getnombreReceptor() {
            let nombreReceptor = receptordata.nombre;
            return (nombreReceptor);
        }
        getRfcReceptor() {
            let rfcReceptor = receptordata.rfc;
            return (rfcReceptor);
        }
        let impuestos = gResult["cfdi:Impuestos"][0].$
        getImpTraslados() {
            let impTraslados = impuestos.totalImpuestosTrasladados;
            return (impTraslados);
        }
        module.exports = {
            fecha: getFecha(),
            subtotal: getSubtotal(),
            total: getTotal(),
            descuento: getDescuento(),
            formapago: getFormapago(),
            metodopago: getMetodopago(),
            folio: getFolio(),
            ncuenta: getNcuenta(),
            nombreemisor: getnombreEmisor(),
            rfcemisor: getRfcEmisor(),
            nombrereceptor: getnombreReceptor(),
            rfcreceptor: getRfcReceptor(),
            impuestos: getImpTraslados()

        };
    }
}