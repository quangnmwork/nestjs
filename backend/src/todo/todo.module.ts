import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'MOCK_DATA',
      useValue: {
        data: [{ isDone: false, title: 'Mock title' }],
      },
    },
  ],
  /**
   * Any module that imports the CatsModule has access to the CatsService and will share the same instance with all other modules that import this one
   */
  imports: [TodoModule, ConfigModule.forFeature({ fileName: 'todo.json' })],
  exports: [TodoService],
})
export class TodoModule {}
