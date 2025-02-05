import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { Bodyguard } from "./entities/bodyguard.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BodyguardRepository extends BaseAbstractRepository<Bodyguard> {
  constructor(
    @InjectRepository(Bodyguard) private readonly bodyguaradRepository: Repository<Bodyguard>
  ) {
    super(bodyguaradRepository)
  }
}
