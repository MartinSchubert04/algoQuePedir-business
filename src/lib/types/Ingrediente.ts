// place files you want to import through the `$lib` alias in this folder.
export class Ingrediente {
  constructor(
    public id?:number,
    public nombre: string = '',
    public costoMercado?: number,
    public grupoAlimenticio: string= '',
    public esDeOrigenAnimal?: boolean
  ) {}

  static fromObject(obj: {
    id: number,
    nombre: string;
    costoMercado: number;
    grupoAlimenticio: string;
    esDeOrigenAnimal: boolean;
  }): Ingrediente {
    return new Ingrediente(
      obj.id,
      obj.nombre,
      obj.costoMercado,
      obj.grupoAlimenticio,
      obj.esDeOrigenAnimal
    );
  }

  updateIngrediente(ingrediente: Ingrediente): this{
    this.id = ingrediente.id
    this.nombre = ingrediente.nombre
    this.costoMercado = ingrediente.costoMercado
    this.grupoAlimenticio = ingrediente.grupoAlimenticio
    this.esDeOrigenAnimal = ingrediente.esDeOrigenAnimal

    return this
  }

  static fromJson(ingredienteJson: IngredienteJson): Ingrediente {
    return Object.assign(new Ingrediente(), ingredienteJson, {
      id: ingredienteJson.id,
      nombre: ingredienteJson.nombre,
      costoMercado: ingredienteJson.costoMercado,
      grupoAlimenticio: ingredienteJson.grupoAlimenticio,
      esDeOrigenAnimal: ingredienteJson.esDeOrigenAnimal
    })
  }
  
  toJSON(): IngredienteJson {
    return {
      id :  this.id,
      nombre: this.nombre,
      costoMercado: this.costoMercado,
      grupoAlimenticio: this.grupoAlimenticio,
      esDeOrigenAnimal: this.esDeOrigenAnimal
    }
  }
}
export type IngredienteJson = {
    id ?:  number
    nombre: string
    costoMercado?: number
    grupoAlimenticio: string
    esDeOrigenAnimal?: boolean
  }

export type IngredientesRow = {
    ingrediente: IngredienteJson
  }

export function fromJson(ingredienteJson: IngredienteJson): Ingrediente {
  return Object.assign(new Ingrediente(), ingredienteJson, {
    id: ingredienteJson.id,
    nombre: ingredienteJson.nombre,
    costoMercado: ingredienteJson.costoMercado,
    grupoAlimenticio: ingredienteJson.grupoAlimenticio,
    esDeOrigenAnimal: ingredienteJson.esDeOrigenAnimal
  })
}
  
export function toJSON(): IngredienteJson {
  return {
    id :  this.id,
    nombre: this.nombre,
    costoMercado: this.costoMercado,
    grupoAlimenticio: this.grupoAlimenticio,
    esDeOrigenAnimal: this.esDeOrigenAnimal
  }
}