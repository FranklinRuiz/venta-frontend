import { List } from "lodash";
import { ventaDetalle } from "./venta-detalle";

export interface VentaRequestDto {
    clienteId: number,
    subTotal: number,
    igv: number,
    total: number,
    ventaDetalle: List<ventaDetalle>
}
