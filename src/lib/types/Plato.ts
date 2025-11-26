import { Ingrediente } from "./Ingrediente";
import { LocalReducido } from "./Local";

export type PlatoJson = {
  id?: any,
  nombrePlato : string,
  descripcion :  string,
  ingredientes ?: Ingrediente[],
  local ?: LocalReducido,
  descuento : number,
  fechaLanzamiento ?: Date,// es para que el plato siempre salga hace 5 dias,LocalDateTime.now().minusDays(5), 
  esDeAutor ?: boolean,
  imagenPlato ?: string,
  porcentajeRegalia : number,
  costo : number,
  valorBase : number
}


export class Plato {
  constructor(
        public id?: any, 
        public nombrePlato: string = '', 
        public descripcion: string = '', 
        public ingredientes: Ingrediente[] = [],
        public local?: LocalReducido, 
        public descuento: number = 0, 
        public fechaLanzamiento?: Date, 
        public imagenPlato : string= '',
        public esDeAutor: boolean = false, 
        public porcentajeRegalia: number = 0, 
        public costo: number = 0,
        public valorBase : number = 0
  ) {
    // Inicializa fechaLanzamiento si es undefined
    if (!this.fechaLanzamiento) {
      // al momento actual.
      this.fechaLanzamiento = new Date(); 
    }
  }

  // 💡 Método adaptado para crear una instancia de Plato desde un objeto plano
  static fromObject(obj: {
        id?: number,
        nombrePlato: string;
        descripcion: string;
        ingredientes: Ingrediente[]; // Asumiendo que los ingredientes ya son instancias o datos planos
        local?: LocalReducido;
        descuento: number;
        fechaLanzamiento?: Date;
        imagenPlato ?: string,
        esDeAutor: boolean;
        porcentajeRegalia: number;
        costo: number;
        valorBase : number;
    }): Plato {
    return new Plato(
      obj.id,
      obj.nombrePlato,
      obj.descripcion,
      obj.ingredientes,
      obj.local,
      obj.descuento,
      obj.fechaLanzamiento ? new Date(obj.fechaLanzamiento) : undefined, // Convertir a Date
      obj.imagenPlato ,
      obj.esDeAutor,
      obj.porcentajeRegalia,
      obj.costo,
      obj.valorBase
    );
  }
    
  updatePlato(plato: Plato): this {
    this.id = plato.id;
    this.nombrePlato = plato.nombrePlato;
    this.descripcion = plato.descripcion;
    this.ingredientes = plato.ingredientes;
    this.local = plato.local;
    this.descuento = plato.descuento;
    this.fechaLanzamiento = plato.fechaLanzamiento;
    this.imagenPlato = plato.imagenPlato;
    this.esDeAutor = plato.esDeAutor;
    this.porcentajeRegalia = plato.porcentajeRegalia;
    this.costo = plato.costo;
    this.valorBase = plato.valorBase

    return this;
  }
    
  static fromJson(platoJson: PlatoJson): Plato {
    return Object.assign(new Plato(), platoJson, {
      fechaLanzamiento: platoJson.fechaLanzamiento ? new Date(platoJson.fechaLanzamiento) : new Date(), 
 
    });
  }
    
  toJSON(): any {
    return {
      id: this.id,
      nombre: this.nombrePlato,
      descripcion: this.descripcion,
      ingredientes: this.ingredientes as any, // Podría requerir this.ingredientes.map(i => i.toJSON())
      descuento: this.descuento,
      fechaLanzamiento: this.fechaLanzamiento,
      imagen: this.imagenPlato,
      esDeAutor: this.esDeAutor,
      porcentajeRegalia: this.porcentajeRegalia,
      valorBase: this.valorBase 
    };
  }
}