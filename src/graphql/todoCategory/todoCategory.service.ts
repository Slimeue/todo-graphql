import { Injectable } from '@nestjs/common';
import {
  TodoCategoryCreateInput,
  TodoCategoryUpdateInput,
} from './todoCategory.types';
import { InjectModel } from '@nestjs/mongoose';
import { TodoCategory } from './todoCategory.schema';
import { Model, PipelineStage } from 'mongoose';
import { TodoCategoryPaginationInput } from 'src/common.types';
import { get } from 'lodash';

@Injectable()
export class TodoCategoryService {
  constructor(
    @InjectModel(TodoCategory.name)
    private todoModel: Model<TodoCategory>,
  ) {}

  async create(userId: string, input: TodoCategoryCreateInput) {
    //TODO create todo category
    const createdTodoCategory = await new this.todoModel({ userId, ...input });
    return createdTodoCategory.save();
  }

  async update(input: TodoCategoryUpdateInput) {
    const { id, name, description } = input;

    if (!id) {
      throw new Error('No Id');
    }

    const updatedTodoCategory = await this.todoModel.findOneAndUpdate(
      { id },
      {
        $set: {
          name,
          description,
        },
      },
    );

    return updatedTodoCategory;
  }

  async find(id: string) {
    if (!id) {
      throw new Error('Id is required');
    }

    const todoCategory = await this.todoModel.findOne({ id });

    return todoCategory;
  }

  async findAll() {
    const todoCategories = await this.todoModel.find();
    return todoCategories;
  }

  async search(input: TodoCategoryPaginationInput) {
    const { userId, limit, page, search } = input;

    if (!userId) {
      throw new Error('userId is required');
    }

    const aggregate: PipelineStage[] = [];
    const match: PipelineStage.Match = {
      $match: {
        userId,
      },
    };

    aggregate.push(match);
    aggregate.push({
      $facet: {
        meta: [
          { $group: { _id: null, totalDocs: { $sum: 1 } } },
          { $addFields: { page, limit } },
        ],
        docs: [{ $skip: limit * (page - 1) }, { $limit: limit }],
      },
    });

    const result = await this.todoModel.aggregate(aggregate);

    const meta = result[0].meta[0];
    const items = result[0].docs;

    console.log('result', meta, items);

    return { items, meta };
  }
}
