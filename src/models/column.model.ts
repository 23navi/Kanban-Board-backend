import mongoose from 'mongoose';
import { UserDoc } from './user.model';
import { BoardDoc } from './board.modle';

interface ColumnAttrs {
  title: string;
  user: UserDoc | mongoose.Schema.Types.ObjectId;
  dueDate?: Date;
  board: BoardDoc | mongoose.Schema.Types.ObjectId;
  //   items?: [ItemsDoc | mongoose.Schema.Types.ObjectId];
  items?: [mongoose.Schema.Types.ObjectId];
}

interface ColumnModel extends mongoose.Model<ColumnDoc> {
  build(attrs: ColumnAttrs): ColumnDoc;
}

export interface ColumnDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  dueDate?: Date;
  board: mongoose.Schema.Types.ObjectId;
  items?: [mongoose.Schema.Types.ObjectId];
}

const columnSchema = new mongoose.Schema(
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
    dueDate: {
      type: Date,
      required: false,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'boards',
      require: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        require: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

columnSchema.statics.build = (attrs: ColumnAttrs) => {
  return new Column(attrs);
};

const Column = mongoose.model<ColumnDoc, ColumnModel>('Column', columnSchema);

export default Column;
