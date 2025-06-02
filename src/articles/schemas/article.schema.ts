import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string;

  @Prop()
  year: number;

  @Prop()
  sePractice: string;  
  // here is the software engineering practice/category

  @Prop()
  claim: string;      
//and then claim or hypothesis of the article

  @Prop()
  evidence: string;    
//then evidence summary of the article

  @Prop()
  type: string; 
  //type of study/article (e.g. Journal, Conference, Experiment, etc.)


  @Prop()
  participants: string; 
  // participants info or sample size

  @Prop({ default: 'pending' })
  status: string;      
  // it will response as 'pending', 'approved', or 'rejected'

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

