//Hacemos una funcion llamada Deprecated, que recibe un string con la razon de la deprecacion, y retorna un decorador que recibe el target, el nombre del metodo y el descriptor de la propiedad, y retorna un objeto con un metodo get que retorna un wrapper function que imprime un mensaje de deprecacion y llama la funcion propiamente con sus argumentos
const Deprecated = (deprecationReason: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    // console.log({target})
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.warn(
            `Method ${memberName} is deprecated with reason: ${deprecationReason}`
          );
          //! Llamar la función propiamente con sus argumentos
          propertyDescriptor.value.apply(this, args);
        };
        return wrapperFn;
      },
    };
  };
};
//En la clase Pokemon, creamos un metodo scream que imprime el nombre en mayusculas, y un metodo speak que imprime el nombre dos veces, y le aplicamos el decorador Deprecated con la razon de la deprecacion

export class Pokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`${this.name.toUpperCase()} !!`);
  }
  @Deprecated("Esto es una razon de deprecacion")
  speak() {
    console.log(`${this.name}, ${this.name} `);
  }
}

export const charmander = new Pokemon(1, "charmander");

charmander.speak()