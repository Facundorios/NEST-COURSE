export let name: string = "facundo";
export const age: number = 18;
export const isValid: boolean = true;

// name = 'Jorge'
// name = undefined
// name = 1234
// bane = undefined

const templateString = `Hola ${name} como estas?
puedo mostrar booleanos: ${isValid},
numeros: ${age},
y hasta objetos: ${{ 
    name: "Facundo", 
    age: 18 
}}`;

console.log(templateString);
