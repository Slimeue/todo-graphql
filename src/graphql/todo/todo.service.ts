import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Model } from 'mongoose';
import { todoCreateInput } from './todo.type';

import { User } from '../users/User.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
    @Inject(forwardRef(() => User))
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll() {
    const todos = await this.todoModel.find().exec();
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findById(id).exec();
    return todo;
  }

  async create(input: todoCreateInput) {
    const createdTodo = await new this.todoModel(input);
    const user = await this.userModel.findOneAndUpdate(
      { id: input.userId },
      { $push: { todos: createdTodo } },
      { new: true },
    );
    if (!user) {
      throw new Error('User not found');
    }
    return createdTodo.save();
  }
}
