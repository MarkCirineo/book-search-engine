const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, _, context) => {
            return User.findOne({ _id: context.user._id }).populate("savedBooks")
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(   
                    { _id: context.user },
                    {
                        $addToSet: {
                            savedBooks: { authors, description, title, bookId, image, link },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            savedBooks: { bookId: bookId }
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;