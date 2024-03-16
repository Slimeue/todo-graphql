import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Model } from 'mongoose';
import { todoCreateInput, todoUpdateInput } from './todo.type';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  async findAll() {
    const todos = await this.todoModel.find().exec();
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ id }).exec();
    return todo;
  }

  async findByUserId(userId: string) {
    const todos = await this.todoModel.find({ userId }).exec();
    return todos;
  }

  async create(input: todoCreateInput) {
    const createdTodo = await new this.todoModel(input);
    return createdTodo.save();
  }

  async update(input: todoUpdateInput) {
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          title: input.title,
          description: input.description,
          status: input.status,
          priority: input.priority,
        },
      },
    );

    return updatedTodo;
  }

  async delete(id: string) {
    const deletedTodo = await this.todoModel.findOneAndDelete({ id });
    return deletedTodo;
  }
}
