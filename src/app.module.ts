import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrastsModule } from './crasts/crasts.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from "path"
import { WorkerModule } from './worker/worker.module';
@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DATABASE_URL),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
    CrastsModule,
    WorkerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
