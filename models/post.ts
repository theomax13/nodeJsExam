import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  postedBy: string;
  postedAt: Date;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  postedBy: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  comments: IComment[];
}

export interface PostDocument extends IPost, Document {
  addComment(text: string, postedBy: string): void;
}

const PostSchema: Schema<PostDocument> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  comments: { type: [CommentSchema], default: [] },
});

PostSchema.methods.addComment = function (text: string, postedBy: string) {
  const comment = {
    text,
    postedBy,
    postedAt: new Date(),
  } as IComment;

  this.comments.push(comment);
};

export default mongoose.model<PostDocument>("Post", PostSchema);
