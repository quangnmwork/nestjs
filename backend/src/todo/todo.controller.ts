import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Body,
  PreconditionFailedException,
  UseFilters,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { HttpExceptionFilter } from 'src/helper';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
    @Inject('MOCK_DATA') mockData: any,
    private todoService: TodoService,
  ) {
    console.log(mockData);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  @Header('Cache-control', 'none')
  create(@Body() createTodoDTO: CreateTodoDto): string {
    return `This action adds a new todo : ${createTodoDTO.title} ${createTodoDTO.isDone}`;
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  findOne(@Param() params: { id: string }): string {
    if (+params.id > 5)
      throw new PreconditionFailedException('Ambagious exception');

    return `Cats ${params.id}`;
  }
}
