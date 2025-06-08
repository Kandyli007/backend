import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ _id: false })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop()
  author?: string;

  @Prop({ default: () => new Date() })
  createdAt?: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);


export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  authors: string;

  @Prop()
  year?: number;

  @Prop()
  sePractice?: string;

  @Prop()
  claim?: string;

  @Prop()
  evidence?: string;

  @Prop()
  type?: string;

  @Prop()
  participants?: string;

  @Prop({ 
    required: true, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  })
  status: 'pending' | 'approved' | 'rejected';

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments?: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);


