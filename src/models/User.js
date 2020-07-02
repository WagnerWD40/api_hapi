import Mongoose from 'mongoose';

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [regex, 'Please fill a valid email address.']
    },
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

const User = Mongoose.model('User', schema)

export default User;