import { Injectable, Scope } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable({ scope: Scope.DEFAULT })
export class TodoService {
  private cnt = 0;
  constructor() {}

  private readonly todoList: Todo[] = [
    {
      isDone: false,
      title: 'Learning nestj',
    },
  ];

  findAll() {
    this.cnt++;
    console.log(this.cnt);
    return this.todoList;
  }
}
