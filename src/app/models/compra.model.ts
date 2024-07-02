export interface ICompra {
    id: number,
    fecha_compra: string,
    estado: string,
    monto: number,
    id_propietario: number,
    propietario: string,
    id_comercial: number,
    comercial: string,
    id_cuenta_cobro: number,
    cuenta_cobro: string
}

export interface ICompraInput {
    fecha: string
}
