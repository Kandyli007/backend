import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ArticleDocument } from './schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}


  @Post()
    // here will create a new article
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(
      @Body() createArticleDto: CreateArticleDto
    ): Promise<ArticleDocument> {
      console.log('🔔 Received create payload:', createArticleDto);
      return this.articlesService.create(createArticleDto);
    }
  


  @Get()
    // and then retrieve all approved articles (or all if no filters)
  async findAll(): Promise<ArticleDocument[]> {
    return this.articlesService.findAll();
  }


  @Get(':id')
    // then retrieve a single article by ID
  async findOne(@Param('id') id: string): Promise<ArticleDocument> {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }


  @Post(':id/comments')
  
  // last here is to add a comment to an existing article
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto,
  ): Promise<ArticleDocument> {
    const updated = await this.articlesService.addComment(id, addCommentDto);
    if (!updated) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return updated;
  }

  
  @Patch(':id/status')
  // and then update an article’s status (approve or reject)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<ArticleDocument> {
    const updated = await this.articlesService.updateStatus(id, updateStatusDto.status);
    if (!updated) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return updated;
  }
}


