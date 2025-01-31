import { Module } from '@nestjs/common';
import { FlowModule } from './app/flow/flow.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    FlowModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
