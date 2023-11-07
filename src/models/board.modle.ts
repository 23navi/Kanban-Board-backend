import mongoose from 'mongoose';
import { UserDoc } from './user.model';

interface BoardAttrs {
  title: string;
  user: UserDoc | mongoose.Schema.Types.ObjectId;
}

interface BoardModel extends mongoose.Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

export interface BoardDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
}

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

boardSchema.statics.build = (attrs: BoardAttrs) => {
  return new Board(attrs);
};

const Board = mongoose.model<BoardDoc, BoardModel>('Board', boardSchema);

export default Board;
