

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

//in here you create an article, and the article starus will stay as pending in the beginning
  async create(createDto: CreateArticleDto): Promise<ArticleDocument> {
    try {
      const created = new this.articleModel(createDto);
      return await created.save();
    } catch (err: any) {

      throw new BadRequestException(err.message);
    }
  }

//you can filter the articles based on their satus
async findAll(filter?: { status?: string }): Promise<ArticleDocument[]> {
  const query: any = {};
  if (filter?.status) {
    query.status = filter.status;
  } else {
    query.status = 'approved';
  }
  return this.articleModel.find(query).exec();
}

//in here you can find the article with id
  async findOne(id: string): Promise<ArticleDocument> {
    const art = await this.articleModel.findById(id).exec();
    if (!art) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return art;
  }

//here is the function to add the comment
  async addComment(
    id: string,
    dto: AddCommentDto,
  ): Promise<ArticleDocument> {
    const art = await this.articleModel.findById(id).exec();
    if (!art) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    art.comments.push({
      author: dto.author,
      content: dto.content,
      createdAt: new Date(),
    });
    return art.save();
  }

  //in we update the article status
  async updateStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected',
  ): Promise<ArticleDocument> {
    const art = await this.articleModel.findById(id).exec();
    if (!art) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    art.status = status;
    return art.save();
  }
}


