import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrastsModule } from './crasts/crasts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from "path"
import { WorkerModule } from './worker/worker.module';
@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://mohmoud99:mohmoud99@cluster0.pcyhh7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
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
