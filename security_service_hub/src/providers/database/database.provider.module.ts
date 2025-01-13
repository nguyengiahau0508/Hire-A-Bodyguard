import { Module } from "@nestjs/common";
import MariadbProviderModule from "./mariadb/mariadb.provider.module";
import MongoDBProviderModule from "./mongodb/mongodb.provider.module";

@Module({
  imports: [
    MariadbProviderModule,
    //MongoDBProviderModule,
  ]
})
export class DatabaseProviderModule { }
