import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TodoController } from './todo/todo.controller';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [TodoModule, ConfigModule.forRoot()],
  // imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'todo', method: RequestMethod.POST })
      .forRoutes(TodoController);
  }
}
