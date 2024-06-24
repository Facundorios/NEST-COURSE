import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';

import { Pokemon } from './entities/pokemon.entity';
@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  //Manejo de errores mendiante un private handleErrors

  private handleExeceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `The Pokemon already exist in the Database: ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.log(error);
    throw new InternalServerErrorException(
      'Error at the moment to create the Pokemon, for more information, see on the logs',
    );
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExeceptions(error);
    }
  }

  async findAll() {
    let pokemons = this.pokemonModel.find();
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    //Busqueda por numero de pokemon

    //Primera condición, se pregunta si !IsNaN al +term (el + indica que se intenta parsear lo que se pasa, a un numero), entonces se niega el IsNaN ("no es un numero"), por lopque se estaria preguntando si es un numero lo que se pasa, de ser así entonces se busca en la base de datos en la propiedad "no", si algun dato coincide.
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //Busqueda por MongoID
    //Segunda condición, se pregunta mediante el metodo "isValidObject" al term si es un id de Mongodb. De ser así, se utiliza el pokemonModel el metodo findById y se le pasa el term en donde retornará el pokemon con el MongoID perteneciente.

    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //busqueda por nombre
    //Tercera condición: Preguntamos Si term noes un numero y si además no es un ObjectID de mongo. De ser el caso se busca con el metodo de findOne por la propiedad de name. Para el manejo de minusculas y mayusculas, al term le añadimos el toLowerCase() así lo que pase, sin impoortar las min y mayus busque en minusculas en la db-
    if (isNaN(+term) && !isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with parameter: "${term}" doesn't exist`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //Para esto, debemos de filtrar el termino de busqueda, para saber el se buscapor alguna de la propiedades (name o no), o por su ObjectID, entonces para eso podemos llamar a la funcion previamente hecha para consultar un Pokemon según su término de bsuqueda.
    try {
      const pokemon = await this.findOne(term);
      //Filtrado de mayusculas
      if (updatePokemonDto.name) {
        updatePokemonDto.name.toLowerCase();
      }
      //Actualiación
      await pokemon.updateOne(updatePokemonDto, { new: true });

      //mi maleficio
      //return pokemon;

      //mi condena
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExeceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    //return { id };

    ///const result = this.pokemonModel.findByIdAndDelete(id)

    // const result = await this.pokemonModel.deleteMany({}) //delete * from pokemon
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount == 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }
}
