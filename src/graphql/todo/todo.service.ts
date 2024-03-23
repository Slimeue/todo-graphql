import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import { Model, PipelineStage } from 'mongoose';
import { todoCreateInput, todoUpdateInput } from './todo.type';
import { TodoPaginationInput } from 'src/common.types';
import { TodoCategory } from '../todoCategory/todoCategory.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
    @InjectModel(TodoCategory.name)
    private todoCategoryModel: Model<TodoCategory>,
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

  async create(currentUser: string, input: todoCreateInput) {
    const { categoryId } = input;

    let category: TodoCategory | null = null;

    if (categoryId) {
      category = await this.todoCategoryModel
        .findOne({ id: categoryId })
        .exec();
    }

    const createdTodo = await new this.todoModel({
      categoryId,
      category: category.name,
      userId: currentUser,
      ...input,
    });
    return createdTodo.save();
  }

  async update(input: todoUpdateInput) {
    const { categoryId } = input;

    let category: TodoCategory;

    if (categoryId) {
      category = await this.todoCategoryModel
        .findOne({ id: categoryId })
        .exec();
    }

    const updatedTodo = await this.todoModel.findOneAndUpdate(
      { id: input?.id },
      {
        $set: {
          title: input?.title,
          description: input?.description,
          status: input?.status,
          priority: input?.priority,
          category: category?.name,
          categoryId: category?.id,
        },
      },
    );

    return updatedTodo;
  }

  async delete(id: string) {
    const deletedTodo = await this.todoModel.findOneAndDelete({ id });
    return deletedTodo;
  }

  async search(input: TodoPaginationInput) {
    const { limit, page } = input;

    if (!input.userId) {
      throw new Error('userId is required');
    }

    const aggregate: PipelineStage[] = [];
    const match: PipelineStage.Match = {
      $match: { userId: input.userId },
    };

    aggregate.push(match);

    aggregate.push({
      $facet: {
        meta: [
          {
            $group: {
              _id: null,
              totalDocs: {
                $sum: 1,
              },
            },
          },
          {
            $addFields: {
              page,
              limit,
            },
          },
        ],
        docs: [{ $skip: limit * (page - 1) }, { $limit: limit }],
      },
    });

    const result = await this.todoModel.aggregate(aggregate).exec();

    const meta = result[0].meta[0];
    const items = result[0].docs;

    console.log('result', meta, items);
    return { items: items, meta };
  }
}
