export class Plato{
  constructor(
		public img: string,
		public name: string,
		public description: string,
		public price: number
  ){}
}

import { hamburguesa, ensalada, pizza } from "$lib/assets/menu_img_index.js"

export const platos_mock = [
  new Plato(
    hamburguesa,
    "Hamburguesa clásica",
    "Con queso, tomate y lechuga",
    8000
  ),
  new Plato(
    ensalada,
    "Ensalada saludable",
    "Una rica y saludable ensalada para los que prefieren algo mas light",
    7400
  ),
  new Plato(
    pizza,
    "Pizza Hawaiana",
    "Una rica pizza para compartir, vienen 8 porciones abundantes",
    12000
  )
]