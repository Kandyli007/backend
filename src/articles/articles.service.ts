import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createDto: CreateArticleDto): Promise<Article> {
    // in here a new articles are created with status 'pending' by default
    const newArticle = new this.articleModel(createDto);
    return newArticle.save();
  }

  async findAll(query?: { search?: string; sePractice?: string; status?: string }): Promise<Article[]> {
    const { search, sePractice, status } = query || {};
    const filter: any = {};

    
    if (status) {
      // and then if only return approved articles unless status filter is explicitly provided
      filter.status = status;
    } else {
      filter.status = 'approved';
    }
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { authors: regex },
        { sePractice: regex },
        { claim: regex },
        { evidence: regex }
      ];
    }
    if (sePractice) {
      // also if a specific practice is specified, filter by it (exact match)
      filter.sePractice = sePractice;
    }
    return this.articleModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async addComment(id: string, addCommentDto: AddCommentDto): Promise<Article> {
    // last then push a new comment into the comments array of the article
    const updated = await this.articleModel.findByIdAndUpdate(
      id,
      { $push: { comments: { name: addCommentDto.name, comment: addCommentDto.comment } } },
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException('Article not found');
    }
    return updated;
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<Article> {
    const updated = await this.articleModel.findByIdAndUpdate(
      id,
      { status: updateStatusDto.status },
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException('Article not found');
    }
    return updated;
  }
}

