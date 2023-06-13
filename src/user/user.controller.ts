import { Controller, Body, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

interface ExReq extends Request {
  user: Omit<User, 'hashedPassword'>;
}

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: ExReq): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch()
  updateUser(
    @Body() dto: UpdateUserDto,
    @Req() req: ExReq,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
