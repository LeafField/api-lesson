import { Test } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { Request } from 'express';

describe('TodoController', () => {
  let todoController: TodoController;
  let fakeTodoService: Partial<TodoService>;

  beforeEach(async () => {
    fakeTodoService = {
      getTasks: (userId: number) => {
        return Promise.resolve([
          {
            id: 1,
            title: 'test task',
            description: 'test description',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
          },
        ]);
      },
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: fakeTodoService,
        },
      ],
    }).compile();

    todoController = moduleRef.get<TodoController>(TodoController);
  });

  describe('getTask', () => {
    it('should return an array of tasks', async () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'test task',
          description: 'test description',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ];

      const req: any = { user: { id: 1 } };
      const task = await todoController.getTask(req);
      expect(task[0].id).toBe(mockTasks[0].id);
      expect(task[0].title).toBe(mockTasks[0].title);
    });
  });
});
