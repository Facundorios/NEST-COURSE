import axios from "axios";
import { Move, PokeapiResponse } from "../interface/pokeapi-response.interface";
//Diferencia entre clase e interfaz en TypeScript: una clase es una plantilla para crear objetos, mientras que una interfaz es una especie de contrato que define las propiedades y métodos que un objeto debe tener.

//En este caso, hacemos una clase Pokemon, que tiene un id y un nombre. Luego, creamos una instancia de la clase Pokemon llamada pikachu.

export class Pokemon {
  //   //Se definen las propiedades de la clase Pokemon: id y name. En este caso, se acompañan de una palabra public, que indica que estas propiedades son accesibles desde fuera de la clase.

  //   public id: number;
  //   public name: string;

  //Se genera un constructor, que es un método especial que se llama cuando se crea una instancia de la clase. En este caso, el constructor recibe un id y un nombre, y los asigna a las propiedades de la clase.

  //Con la propiedad readonly, se indica que el id no puede ser modificado una vez que se ha asignado un valor.

  get imageURL() {
    return `https://pokemon.com/${this.id}.png`;
  }

  constructor(
    public readonly id: number,
    public name: string //public imageURL: string
  ) {}
  //Se define un método scream, que imprime el nombre del Pokémon en mayúsculas y llama al método speak. notese la palabra reservada public: indica que el método es accesible desde fuera de la clase.

  public scream() {
    console.log(`${this.name}!`);
    this.speak();
  }

  private speak() {
    console.log(`Hola, soy ${this.name}`);
  }
  //Se define un método getMoves, que hace una petición a la API de Pokeapi para obtener los movimientos del Pokémon. El método es asíncrono, ya que la petición a la API puede tardar un tiempo en completarse. Se utiliza la palabra reservada async para indicar que el método es asíncrono, y se utiliza la función axios.get para hacer la petición a la API. La URL de la API se pasa como argumento a la función axios.get, y se espera a que la petición se complete con la palabra reservada await. La respuesta de la API se almacena en la variable data, y se devuelve la propiedad data.moves, que contiene los movimientos del Pokémon.
  //En e3ste apartado, hay tipado de promise, se espera que la respuesta sea de tipo Move[], que es un array de objetos que cumplen con la interfaz Move.
  async getMoves(): Promise<Move[]> {
    //const moves = 10
    const { data } = await axios.get<PokeapiResponse>(
      "https://pokeapi.co/api/v2/pokemon/25"
    );
    console.log(data.moves);

    return data.moves;
  }
}

export const pikachu = new Pokemon(3, "Pikachu");
// // pikachu.name = "mewtwo" //
// // pikachu.id = 2
// console.log(pikachu.imageURL);

// pikachu.scream();

pikachu.getMoves();
