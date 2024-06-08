// src/resolver.js
const Post = require('./db/post');

const resolvers = {
  Query: {
    // Implement your query resolvers here
    getAllPosts: async() => {
    try {
        const result = await Post.find({});
        if(!result.length){
            throw new Error("No Posts Added!")
        }
        return result;
    } catch (error) {
        throw error;
    }
  },
  getPost: async(_, args) => {
   try {
    const result = await Post.findById(args._id);
        if(!result){
            throw new Error("Post does not exists!")
        }
        return result
    } catch (error) {
        throw error
   }
  },
  },
  Mutation: {
    // Implement your mutation resolvers here
    createPost: async(_, args ) => {  
   try { 
    const result = await Post.create({ 
     title: args.title, 
     content: args.content 
    });
    return result
   } catch (error) {
    throw error
   }
  },
  updatePost: async(_, args) => {
   try {
    const result = await Post.findByIdAndUpdate(args._id, {
     title: args.title,
     content: args.content
    }, { new: true });
    if(!result){
     throw new Error("Post does not exists!")
    }
    return result
   } catch (error) {
    throw error
   }
  },
  deletePost: async(_, args) => {
   try {
    const result = await Post.findByIdAndDelete(args._id);
    if(!result) {
     return false
    }
    return true
   } catch (error) {
    throw error
   }
  },
  },
};

module.exports = resolvers;