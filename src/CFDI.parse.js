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
            log.debug("comprobanteNodo",this.comprobanteNodo);
            log.debug("comprobante",this.comprobante);
            log.debug("emisor",this.emisor);
            log.debug("receptor",this.receptor);
            log.debug("impuestos",this.impuestos);
        });
    }

    _GET_FECHA() {
        return this.comprobante.fecha;
    }
    _GET_SUBTOTAL() {
        return this.comprobante.subTotal;
    }
    _GET_TOTAL() {
        return this.comprobante.total;
    }
    _GET_DESCUENTO() {
        return this.comprobante.descuento || "0";
    }
    _GET_NOMBRE_EMISOR() {
        return this.emisor.nombre;

    }
    _GET_RFC_EMISOR() {
        return this.emisor.rfc;
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
