import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=50',
    );
    return data.results.forEach(({ name, url }) => {
      const extracts = url.split('/');
      const num = +extracts[extracts.length - 2];

      console.log({ name, num });
    });
  }
}
