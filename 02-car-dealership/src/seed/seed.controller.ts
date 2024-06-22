import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedsService } from './seed.service';

@Controller('seed')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}


  @Get()
  runSeed() {
    return this.seedsService.populateDatabase();
  }


}
