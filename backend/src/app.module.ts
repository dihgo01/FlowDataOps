import { Module } from '@nestjs/common';
import { FlowModule } from './app/flow/flow.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    FlowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
