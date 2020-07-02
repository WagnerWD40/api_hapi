import Boom from 'boom';

class UserController {

    constructor(User) {
        this.User = User;
    }

    async find(req) {
        const { id } = req.params;
        const query =  {};

        if (id) {
            query._id = id;
        }

        try {

            const users = await this.User.find(query);
            return { users };

        } catch (err) {
            return Boom.badRequest('Failed to find user');
        }
    }

    async create(req, h, err) {

        try {

            const newUser = new this.User(req.payload);
            await newUser.save();

            return h.response().code(201);

        } catch (error) {
            return Boom.badRequest(error);
        }

    }

    async update(req, h) {

        const { id } = req.params;

        try {

            const updatedUser = await this.User.findOneAndUpdate({ _id: id }, req.payload, { new: true});

            if (updatedUser) {
                return h.response().code(200);
            }

            return Boom.badRequest('Could not update the user');

        } catch (err) {
            return Boom.badRequest(error); 
        }

    }

    async del(req, h) {

        const { id } = req.params;

        try {

            const deletedUser = await this.User.findOneAndDelete({ _id: id });

            if (deletedUser) {
                return h.response().code(200);
            }

        } catch (err) {
            return Boom.badRequest('Could not delete the user');
        }

        return Boom.notImplemented();
    }
}

export default UserController;