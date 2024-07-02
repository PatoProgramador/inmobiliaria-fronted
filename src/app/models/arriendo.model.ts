export interface IArriendo {
    id: number,
    detalles: string,
    fecha_inicio: string,
    fecha_fin: string,
    monto: number,
    detalles_inmueble: string,
    direccion: string,
    propietario: string,
    comercial_encargado: string,
    id_cuenta_cobro: number,
    cuenta_cobro: string
}

export interface IArriendoInput {
    detalles: string,
    fechaInicio: string,
    fechaFinal: string,
    monto: number
}