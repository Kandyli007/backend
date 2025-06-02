import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop()
  author?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop()
  author?: string;

  @Prop({ default: false })
  hidden?: boolean;

  @Prop({ type: [CommentSchema], default: [] })
  comments?: Comment[];
}
export const ArticleSchema = SchemaFactory.createForClass(Article);

