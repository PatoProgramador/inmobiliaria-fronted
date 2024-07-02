export interface IAvaluo {
    id: number,
    fecha: string,
    descripcion: string,
    precio: number,
}

export interface IAvaluoInput {
    descripcion: string,
    precio: number
}