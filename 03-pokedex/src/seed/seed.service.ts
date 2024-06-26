import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    //Antes de agregar los pokemones, borra todos los anteriores.
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=500',
    );

    //Forma #1

    // const inserPromisesArray = []
    // data.results.forEach(({ name, url }) => {
    //   const extracts = url.split('/');
    //   const num = +extracts[extracts.length - 2];

    //   inserPromisesArray.push(
    //     this.pokemonModel.create({ name, no: num })
    //   )
    // });
    // await Promise.all(inserPromisesArray)

    //Forma #2

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const extracts = url.split('/');
      const num = +extracts[extracts.length - 2];

      pokemonToInsert.push({ name, no: num });
    });
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed.';
  }
}
