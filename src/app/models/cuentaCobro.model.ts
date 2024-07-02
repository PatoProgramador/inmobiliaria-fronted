export interface ICuentaCobro {
    id: number,
    cuenta: string,
    monto: number,
    analisis_riesgo_id: number,
    analisis_riesgo: string,
    inmueble_id_compra: number,
    inmueble_compra: string,
    inmueble_arriendo_id: number,
    inmueble_arriendo: string
}