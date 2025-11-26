export type LocalJSON = {
  id?: number,
  nombreLocal: string,
  imgURL: string,
  calle: string,
  latitud: number,
  longitud: number,
  altura: number,
  porcentajeComision: number,
  porcentajeAutor: number,
  mediosDePago: MedioDePago[],
  // adminUsername: string,
  // listaPedidos: Pedido[],
}

export enum MedioDePago {
  EFECTIVO = "EFECTIVO",
  QR = "QR",
  TRANSFERENCIA = "TRANSFERENCIA"
}


export class Local {
  constructor(
    public id?: number,
    public nombreLocal: string = "",
    public imgURL: string = "",
    public calle: string = "",
    public latitud: number = 0,
    public longitud: number = 0,
    public altura: number = 0,
    public porcentajeComision: number = 0,
    public porcentajeAutor: number = 0,
    public mediosDePago: MedioDePago[] = [],
    public pendiente: boolean = false,
    public adminUsername: string = "",
    public puntajes: number[] = []
  ) {}

  static fromJson(localJson: LocalJSON): Local {
    return Object.assign(new Local(), localJson, {
      id: localJson.id,
      nombre: localJson.nombreLocal,
      imgURL: localJson.imgURL,
      calle: localJson.calle,
      latitud: localJson.latitud,
      longitud: localJson.longitud,
      altura: localJson.altura,
      porcentajeComision: localJson.porcentajeComision,
      porcentajeAutor: localJson.porcentajeAutor,
      mediosDePago: localJson.mediosDePago,
    })
  }

  toJSON(): LocalJSON {
    return {
      id: this.id,
      nombreLocal: this.nombreLocal,
      imgURL: this.imgURL,
      calle: this.calle,
      latitud: this.latitud,
      longitud: this.longitud,
      altura: this.altura,
      porcentajeComision: this.porcentajeComision,
      porcentajeAutor: this.porcentajeAutor,
      mediosDePago: this.mediosDePago,
    }
  }

}

export class LocalReducido {  
  constructor(
     public id?: number,
    public nombreLocal: string = "",
    public imgURL: string = "",
    public direccion?: { 
                calle:  string ,
                altura: number,
                coordenadas: {
                    x: number,
                    y: number
                }},
    public porcentajeBeneficio: number = 0,
    public porcentajeAutor: number = 0,
    public mediosDePago: MedioDePago[] = [],
    public menu: any[]= [],
    public pendiente: boolean = false,
    public adminUsername: string = "",
    public puntajes: any[] = [],
    public listaPedidos: any[] = [],
    public inbox?: {
        mensajes: any[]
      }
  ) {}
}
         
