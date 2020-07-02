import Joi from '@hapi/joi';

import UserController from '../controllers/UserController';
import User from '../models/User';

const userController = new UserController(User);

const userRoute = (server) => {

    server.route({
        method: 'GET',
        path: '/users/{id?}',
        handler: (req, h) => userController.find(req, h),
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: (req, h) => userController.create(req, h),
        options: {
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().email().required(),
                }),
            },
        },
    });

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: (req, h) => userController.update(req, h),
        options: {
            validate: {
                payload: Joi.object({
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    email: Joi.string().email(),
                }),
            },
        },
    });

    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        handler: (req, h) => userController.del(req, h),
    });

}

export default userRoute;