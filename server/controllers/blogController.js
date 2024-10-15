import blogModel from '../models/blogModel.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';

// Get all blogs
export const getAllBlogsController = async(req, res) => {
    console.log('Received request for all blogs'); 
    try {
        const blogs = await blogModel.find({}).populate("user");
        if(!blogs){
            return res.status(200).send({
                success: false,
                message:'No blogs Found'
            }) 
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message:'All Blogs lists',
            blogs,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while Getting blogs',
            error
        })
        
    }
}
// Create blog
// export const createBlogController = async(req,res) => {
//     try {
//         const {title, description, image, user} = req.body;
//         // validation
//         if(!title || ! description || !image || !user){
//             return res.status(400).send({
//                 success: false,
//                 message:'Please provide All Fields'
//             })
//         }
//         const exisitingUser = await userModel.findById(user);
//         if(!exisitingUser){
//             return res.status(404).send({
//                 success: false,
//                 message:'Unable to find user'
//             })
//         }
//         const newBlog = new blogModel({title, description, image, user})

//         // const session = await mongoose.startSession()
//         // session.startTransaction()
//         // await newBlog.save({session})
//         // exisitingUser.blogs.push(newBlog)

//         // await exisitingUser.save({session})
//         // await session.commitTransaction();

//         const savedBlog = await newBlog.save();
//         exisitingUser.blogs.push(savedBlog._id)
//         await exisitingUser.save();
//         return res.status(201).send({
//             success: true,
//             message: "Blog Created!",
//             newBlog,
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).send({
//             success: false,
//             message: 'Error while creating blog',
//             error
//         })
//     }
// }



export const createBlogController = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
  
      // Validation
      if (!title || !description || !image || !user) {
        return res.status(400).send({
          success: false,
          message: "Please provide all fields.",
        });
      }
  
      // Find the existing user
      const existingUser = await userModel.findById(user);
      if (!existingUser) {
        return res.status(404).send({
          success: false,
          message: "Unable to find user.",
        });
      }
  
      // Create a new blog
      const newBlog = new blogModel({ title, description, image, user });
      
      // Save the new blog
      const savedBlog = await newBlog.save();
  
      // Push the new blog's ID to the user's blogs array
      existingUser.blogs.push(savedBlog._id);
  
      // Save the updated user
      await existingUser.save();
  
      return res.status(201).send({
        success: true,
        message: "Blog created!",
        newBlog: savedBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while creating blog.",
        error,
      });
    }
  };
  

// Update blog
export const updateBlogController = async(req, res) => {
    try {
        const {id} = req.params
        const {title, description, image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body}, {new:true})
        return res.status(200).send({
            success: true,
            message: 'Blog Updated!',
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while Updating blog',
            error
        })
    }
}
//single blog
export const getBlogByIdController = async(req,res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success: false,
                message:'Blog not found with this is'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Fetch single blog',
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message: 'Error while getting single blog',
            error
        })
    }
}
//delete blog
export const deleteBlogController = async(req,res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:'Blog deleted'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while deleting blog',
            error
        })
    }
}

export const userBlogController = async(req,res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs')
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'Blogs not found with this id'
            })
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
          });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in user blog',
            error
        })
    }
}