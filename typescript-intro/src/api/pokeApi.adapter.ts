import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data: T = await response.json();
    console.log("con fetch tradicional");
    return data;
  }
}
//Se crea una clase llamada PokeApiAdapter
export class PokeApiAdapter implements HttpAdapter{
  //Hacemos una clase privada y unicamente de lectura de axios: axios, que es un cliente HTTP basado en promesas para el navegador y node.js.
  private readonly axios = axios;
  //Se crea un método llamado get, el cual recibe un parámetro de tipo string llamado url y retorna una promesa de tipo T, que es un tipo genérico.
  async get<T>(url: string): Promise<T> {
    //petición get
    console.log("con axios");
    const { data } = await this.axios.get<T>(url);
    return data;
  }

  async post(url: string, data: any) {}

  async patch(url: string, data: any) {}

  async delete(url: string) {}
}
