import { Injectable } from '@nestjs/common';
import { CreateTranningCatalogDto } from './dto/create-tranning_catalog.dto';
import { UpdateTranningCatalogDto } from './dto/update-tranning_catalog.dto';

@Injectable()
export class TranningCatalogService {
  create(createTranningCatalogDto: CreateTranningCatalogDto) {
    return 'This action adds a new tranningCatalog';
  }

  findAll() {
    return `This action returns all tranningCatalog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tranningCatalog`;
  }

  update(id: number, updateTranningCatalogDto: UpdateTranningCatalogDto) {
    return `This action updates a #${id} tranningCatalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} tranningCatalog`;
  }
}
