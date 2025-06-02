import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
<<<<<<< HEAD
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
=======
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(query: { search?: string; page?: number; limit?: number }): Promise<Article[]> {
    const { search = '', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
  
    const filter = search
      ? { title: { $regex: search, $options: 'i' } }  
      : {};
  
    return this.articleModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
  }
  
  
  async updateStatus(id: string, status: string): Promise<Article> {
    const updated = await this.articleModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return updated;
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
<<<<<<< HEAD
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

=======
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }
  async addComment(id: string, dto: AddCommentDto): Promise<Article> {
    const article = await this.articleModel.findById(id);
    if (!article) throw new NotFoundException('Article not found');
  
    article.comments.push({ ...dto, createdAt: new Date() });
    return article.save();
  }
  async updateArticle(id: string, updateDto: Partial<Article>): Promise<Article> {
    const updated = await this.articleModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Article ${id} not found`);
    return updated;
  }
  
  
  
}
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
