import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedsService {

  populareDatabase() {
    return 'This action adds a new seed';
  }
}
