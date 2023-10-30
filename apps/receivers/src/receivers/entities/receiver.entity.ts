import mongoose, { ObjectId } from 'mongoose';
function transformValue(doc, ret: { [key: string]: unknown }) {
  delete ret._id;
  delete ret.password;
}

export interface IReceiverSchema extends mongoose.Document {
  accountId: ObjectId;
  remindName: string;
}

export const ReceiverSchema = new mongoose.Schema<IReceiverSchema>(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'accounts',
    },
    remindName: String,
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  }
);
