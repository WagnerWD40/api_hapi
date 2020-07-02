import Mongoose from 'mongoose';

const schema = new Mongoose.Schema({
    title: String,
    auhor: String,
    content: String,
    publishDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false,
});

const Post = Mongoose.model('Post', schema);

export default Post;