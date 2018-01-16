let parseString = require("xml2js").parseString;
const getLogger = require('./logger');
const log = getLogger("CFDI.parse");

class CFDIParser {
    constructor() {
        this.comprobanteNodo;
        this.comprobante;
        this.emisor;
        this.receptor;
        this.impuestos;
    }
    
    load(CFDItext) {
        let promise = new Promise((resolve, reject) => {
            parseString(CFDItext, (error, result) => {
                if (error) {
                    log.error("Error al parseString", error);
                    return;
                }
                this.comprobanteNodo = result["cfdi:Comprobante"];
                this.comprobante = this.comprobanteNodo.$;
                this.emisor = this.comprobanteNodo["cfdi:Emisor"][0].$;
                this.receptor = this.comprobanteNodo["cfdi:Receptor"][0].$;
                this.impuestos = this.comprobanteNodo["cfdi:Impuestos"][0].$;
                log.debug("comprobanteNodo", this.comprobanteNodo);
                log.debug("comprobante", this.comprobante);
                log.debug("emisor", this.emisor);
                log.debug("receptor", this.receptor);
                log.debug("impuestos", this.impuestos);

                resolve(result);
            });
        });
        return promise;
    }

    getRow(headers) {
        let rowArray = headers.map((header) => this.get(header));
        return rowArray;
    }

    _GET_FECHA() {
        return this.comprobante.fecha;
    }
    _GET_SUBTOTAL() {
        return Number(this.comprobante.subTotal);
    }
    _GET_TOTAL() {
        return Number(this.comprobante.total);
    }
    _GET_DESCUENTO() {
        return Number(this.comprobante.descuento) || 0;
    }
    _GET_FORMA_PAGO() {
        return this.comprobante.formaDePago;
    }
    _GET_METODO_PAGO() {
        return this.comprobante.metodoDePago;
    }
    _GET_FOLIO() {
        return this.comprobante.folio;

    }
    _GET_NUM_CUENTA() {
        return this.comprobante.NumCtaPago || "0";
    }
    _GET_NOMBRE_EMISOR() {
        return this.emisor.nombre;

    }
    _GET_RFC_EMISOR() {
        return this.emisor.rfc;
    }
    _GET_NOMBRE_RECEPTOR() {
        return this.receptor.nombre;

    }
    _GET_RFC_RECEPTOR() {
        return this.receptor.rfc;
    }
    _GET_IMPUESTOS_RETENIDOS() {
        return Number(this.impuestos.totalImpuestosRetenidos) || 0;
    }

    _GET_IMPUESTOS_TRASLADADOS() {
        return Number(this.impuestos.totalImpuestosTrasladados) || 0;
    }
    get(CFDIField) {

        if (!this["_GET_" + CFDIField]) {
            return "";
        }
        let fieldValue = this["_GET_" + CFDIField]();
        return fieldValue;

    }

}
module.exports.CFDIParser = CFDIParser;
