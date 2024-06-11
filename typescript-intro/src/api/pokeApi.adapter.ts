import axios from "axios";

export class PokeApiAdapter {
    //Hacemos una clase privada y unicamente de lectura de axios: axios, que es un cliente HTTP basado en promesas para el navegador y node.js.
    private readonly axios = axios;

  async get(url: string) {
    //petición get
    const { data } = await this.axios.get(url);
    return data;
  }

  async post(url: string, data: any) {}

  async patch(url: string, data: any) {}

  async delete(url: string) {}
}
