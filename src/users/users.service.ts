import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Bishal', role: 'admin' },
    { id: 2, name: 'Navaraj', role: 'intern' },
    { id: 3, name: 'Kushal', role: 'admin' },
    { id: 4, name: 'Nistin', role: 'developer' },
    { id: 5, name: 'Lirshal', role: 'intern' },
  ];

  findAll(role?: 'intern' | 'developer' | 'admin') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not foiund');
    }
    return user;
  }

  create(user: CreateUserDto) {
    const usersCreate = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersCreate[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return this.users;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
