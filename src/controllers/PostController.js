import Boom from 'boom';

class PostController {

    constructor(Post) {
        this.Post = Post;
    }

    async find(req) {
        const { id } = req.params;
        const query = {};

        if (id) {
            query._id = id;
        }

        try {

            const posts = await this.Post.find(query);
            return { posts };

        } catch (err) {
            return Boom.badRequest('Failed to find post');
        }
    }

    async create(req, h, err) {

        try {

            const newPost = new this.Post(req.payload);
            await newPost.save();

            return h.response().code(201);

        } catch (error) {
            return Boom.badRequest(error);
        }
    }

    async update(req, h) {

        const { id } = req.params;

        try {

            const updatedUser = await this.Post.findOneAndUpdate({ _id: id }, req.payload, { new: true });

            if (updatedUser) {
                return h.response().code(200);
            }

            return Boom.badRequest('Could not update the post');

        } catch (err) {
            return Boom.badRequest(err);
        }

    }

    async del(req, h) {

        const { id } = req.params;

        try {

            const deletedPost = await this.Post.findOneAndDelete({ _id: id });

            if (deletedPost) {
                return h.response().code(200);
            }

        } catch (err) {
            return Boom.badRequest('Could not delete the post');
        }

        return Boom.notImplemented();
    }
};

export default PostController;