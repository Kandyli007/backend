import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

<<<<<<< HEAD
@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  comment: string;
=======
@Schema({ _id: false })
export class Comment {
  @Prop({ required: true })
  author: string;
  @Prop({ required: true })
  content: string;
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09

  @Prop({ default: Date.now })
  createdAt: Date;
}

<<<<<<< HEAD
const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
=======
export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
export class Article {
  @Prop({ required: true })
  title: string;

<<<<<<< HEAD
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
=======
  @Prop()
  authors?: string;

  @Prop()
  abstract?: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
<<<<<<< HEAD

=======
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
