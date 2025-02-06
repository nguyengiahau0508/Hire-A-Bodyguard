import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { TrainingCatalog } from "./entities/tranning_catalog.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TranningCatalogRepository extends BaseAbstractRepository<TrainingCatalog> {
  constructor(
    @InjectRepository(TrainingCatalog) private readonly traningCatalogRepository: Repository<TrainingCatalog>
  ) { super(traningCatalogRepository) }
}
