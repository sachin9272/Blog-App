import React, {useState, useEffect} from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const getUserBlogs = async() => {
        try {
            const id = localStorage.getItem('userId');
            const {data} = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`)
            if(data?.success){
              setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
      getUserBlogs();
    },[]);
  return (
    <div>
      {blogs && blogs.length>0 ? (blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            name={blog.user?.name || "Unknown Author"}
            time={new Date(blog.createdAt).toLocaleString()}
          />))) : (<h1>You haven't created a blog.</h1>)
      }
        
    </div>
  )
}

export default UserBlogs
