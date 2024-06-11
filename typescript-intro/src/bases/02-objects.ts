export const pokemonIDs = [
  1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

// //Typescript "compila" (transpilar) el codigo a javascript. Debido al tipado de typescript, si se intenta agregar un string a un array de numeros, typescript no lo permite. No obstante, si se compila el codigo, se puede ver que el array pokemonIDs acepta strings y numeros.
// //Con el simbolo + al principio del push, se convierte el string a numero.
pokemonIDs.push(+"1");
console.log(pokemonIDs);

// //Typescript permite definir interfaces, las cuales son un tipo de dato que permite definir la forma de un objeto. En este caso, se define la interfaz Pokemon, la cual tiene dos propiedades: id y name, ambas de tipo number y string respectivamente. Adicionalmente, se define una propiedad opcional age de tipo number.

//Existen diferencias entre hacerlo de la forma age?:number y la forma age: number | undefined. La primera forma permite que la propiedad sea totalmente opcional,es decir, que no necesariamente este definida. Por otro lado, la segunda forma no permite la otmision de la propiedad, pero si permite que la propiedad sea undefined.

interface Pokemon {
  id: number;
  name: string;
  age?: number;
}

export const bulbasur: Pokemon = {
  id: 1,
  name: "pikachu",
  age: 20
};

export const charmander: Pokemon ={
    id: 2,
    name: "charmander",
    age: 20
}

//En esta cosntante pokemons, se define su tipo como un array de objetos de tipo Pokemon. Adicionalmente, se inicializa el array con dos objetos de tipo Pokemon.
//Es importante tener en cuenta que no se pueden agregar elementos que no sean de tipo Pokemon al array pokemons.

export const pokemons: Pokemon[] = []


//pokemons.push(1, "string", bulbasur, charmander)
pokemons.push(bulbasur, charmander)

console.log(pokemons);
