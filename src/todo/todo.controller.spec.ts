import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

interface ExReq extends Request {
  user: { id: number };
}

describe('認証が必要なコントローラーのテストのテスト', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();
    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  describe('テストの実験', () => {
    it('テストの中身', async () => {
      const mockTask: Task[] = [
        {
          id: 1,
          createdAt: new Date(),
          description: 'aaaa',
          title: 'title',
          updatedAt: new Date(),
          userId: 111,
        },
      ];
      jest.spyOn(todoService, 'getTasks').mockResolvedValue(mockTask);
      const req: ExReq = { user: { id: 1 } };
      expect(await todoController.getTask()).toBe(mockTask);
    });
  });
});
