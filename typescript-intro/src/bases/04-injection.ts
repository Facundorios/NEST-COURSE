import { Move, PokeapiResponse } from "../interface/pokeapi-response.interface";
import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from "../api/pokeApi.adapter";

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  } 
  //se crea un constructor con los atributos id, name y http, el cual es de tipo PokeApiAdapter, que es una clase que se importa de la carpeta api.
  constructor(
    public readonly id: number,
    public name: string,
    private readonly http: HttpAdapter // Todo: inyectar dependencias
  ) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    //se crea una constante llamada data, la cual es de tipo PokeapiResponse y se le asigna el valor de la petición get que se hace a la url de la api de pokemon.
    const data = await this.http.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
    console.log(data.moves);

    return data.moves;
  }
}
//
const pokeAPI = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter()

export const charmander = new Pokemon(4, "charmander", pokeAPI);
//const pikachu = new Pokemon(25, "pikachu", pokeApiFetch);

charmander.getMoves();

