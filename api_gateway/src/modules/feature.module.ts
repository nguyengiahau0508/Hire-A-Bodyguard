import { Module } from "@nestjs/common";
import { MariadbFeatureModule } from "./mariadb/mariadb.module";
import { MicroserviceFeatureModule } from "./microservices/microservice.module";

@Module({
  imports: [
    MariadbFeatureModule,
    MicroserviceFeatureModule
  ]
})
export class FeatureModule { }
