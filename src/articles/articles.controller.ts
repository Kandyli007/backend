<<<<<<< HEAD
import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
=======
import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Query } from '@nestjs/common';
import { AddCommentDto } from './dto/add-comment.dto';
import { Article } from './schemas/article.schema';
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

<<<<<<< HEAD

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

=======
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articlesService.findAll({
      search,
      page: parseInt(page || '1'),
      limit: parseInt(limit || '10'),
    });
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.articlesService.findOne(id);
}
@Patch(':id')
updateArticle(@Param('id') id: string, @Body() dto: Partial<Article>) {
  return this.articlesService.updateArticle(id, dto);
}

@Post(':id/comments')
addComment(@Param('id') id: string, @Body() dto: AddCommentDto) {
  return this.articlesService.addComment(id, dto);
}
  @Patch(':id/review')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.articlesService.updateStatus(id, updateStatusDto.status);
  }
}
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
