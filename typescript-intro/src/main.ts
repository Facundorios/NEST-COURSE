import { name, age } from "./bases/01-types.ts";

import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { bulbasur, pokemonIDs, pokemons } from "./bases/02-objects.ts";
import { pikachu } from "./bases/03-classes.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Hello ${name}, you have ${age} years old!</h1>
    <p>this is the pokemons ids: ${pokemonIDs.join(", ")}

    <p>Hola ${bulbasur.name}</p>
    <p>Hola ${pokemons.join(",")}</p>
<p>
Hola
</p>
    <p>Hola ${pikachu.name}</p>
    <p>ID ${pikachu.id}</p>


    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
