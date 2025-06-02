import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>,
  ) {}

  
  async create(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    //in here it will Create and save a new article (status defaults to 'pending')
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }


  async findAll(): Promise<ArticleDocument[]> {
  //and then return all articles that are approved (status==='approved')
  //and if you want to return all regardless of status, remove the filter.
    return this.articleModel.find({ status: 'approved' }).exec();
  }

  
  async findOne(id: string): Promise<ArticleDocument | null> {
    //and it will find one article by its ID
    return this.articleModel.findById(id).exec();
  }

  
  async addComment(id: string, dto: AddCommentDto): Promise<ArticleDocument | null> {
    //here will add a comment to the article’s comments array
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      return null;
    }
    article.comments!.push({
      author: dto.author,
      content: dto.content,
      createdAt: new Date(),
    });
    return article.save();
  }

  
  async updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<ArticleDocument | null> {
    //last it will update only the status field for the article
    const updated = await this.articleModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    return updated;
  }
}


