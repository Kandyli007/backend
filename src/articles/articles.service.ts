import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<ArticleDocument> {
    return this.articleModel.findById(id).exec();
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<ArticleDocument> {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true }).exec();
  }

  async remove(id: string): Promise<ArticleDocument> {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}

