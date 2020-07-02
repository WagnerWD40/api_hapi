import Joi from '@hapi/joi';

import PostController from '../controllers/PostController';
import Post from '../models/Post';

const postController = new PostController(Post);

const postRoute = (server) => {
    
    server.route({
        method: 'GET',
        path: '/posts/{id?}',
        handler: (req, h) => postController.find(req, h),
    });

    server.route({
        method: 'POST',
        path: '/posts',
        handler: (req, h) => postController.create(req, h),
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    author: Joi.string().required(),
                    content: Joi.string().required(),
                }),
            },
        },
    });

    server.route({
        method: 'PUT',
        path: '/posts/{id}',
        handler: (req, h) => postController.update(req, h),
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string(),
                    author: Joi.string(),
                    content: Joi.string(),
                }),
            },
        },
    });

    server.route({
        method: 'DELETE',
        path: '/posts/{id}',
        handler: (req, h) => postController.del(req, h),
    });
}

export default postRoute;