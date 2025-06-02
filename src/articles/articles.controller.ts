import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}


  @Post()
  // here submit a new article suggestion
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articlesService.create(createArticleDto);
    return { message: 'Article submitted successfully', article };
  }


  @Get()
  // also get all articles (with optional search and filter queries)
  async getAllArticles(
    @Query('search') search?: string,
    @Query('sePractice') sePractice?: string,
    @Query('status') status?: string
  ) {
    const articles = await this.articlesService.findAll({ search, sePractice, status });
    return articles;
  }


  @Get(':id')
   // and then get a specific article by ID
  async getArticleById(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);
    return article;
  }

 
  @Post(':id/comments')
  // also Add a comment/review to an article
  async addComment(@Param('id') id: string, @Body() addCommentDto: AddCommentDto) {
    const updatedArticle = await this.articlesService.addComment(id, addCommentDto);
    return { message: 'Comment added successfully', article: updatedArticle };
  }

  
  @Patch(':id/status')
   // laso approve or reject an article (update its status)
  async updateArticleStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    const updatedArticle = await this.articlesService.updateStatus(id, updateStatusDto);
    return { message: `Article ${updateStatusDto.status}`, article: updatedArticle };
  }
}

