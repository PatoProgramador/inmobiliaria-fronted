export interface IAnalisisRiesgo {
    id: number,
    estado: string,
    descripcion: string,
    id_cuenta_cobro: number,
    cuenta_cobro: string,
    monto: number
}

export interface IAnalisisRiesgoInput {
    descripcion: string
}