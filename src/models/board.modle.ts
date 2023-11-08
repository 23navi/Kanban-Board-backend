import mongoose from 'mongoose';
import { UserDoc } from './user.model';
import { ColumnDoc } from './column.model';

interface BoardAttrs {
  title: string;
  user: UserDoc | mongoose.Schema.Types.ObjectId;
  columns?: [ColumnDoc | mongoose.Schema.Types.ObjectId];
}

interface BoardModel extends mongoose.Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

export interface BoardDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  columns?: [mongoose.Schema.Types.ObjectId];
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
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'columns',
        require: false,
      },
    ],
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
