const express=require("express")
const {BlogsModel}=require("../Model/blogs.model")
const GetBlogsRouter=express.Router()

GetBlogsRouter.get("/",async(req,res)=>{
    try {
        let filters = {};
        let sort = {};
    
        // Search by title
        const { search, page } = req.query;
        if (search) {
          filters.title = { $regex: search, $options: 'i' };
        }
    
        // Filter by category
        const { category } = req.query;
        if (category) {
          filters.category = category;
        }
    
        // Sort by date
        const { sortBy } = req.query;
        if (sortBy === 'asc') {
          sort.date = 1;
        } else if (sortBy === 'desc') {
          sort.date = -1;
        }

        const limit = 5;
        const skip = (page - 1) * limit;
        const blogs = await BlogsModel.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    
        let totalPage= Math.ceil(blogs.length / limit);
        res.send({blogs,totalPage});
  
    } catch (error) {
        res.send(error)
    }
})

module.exports =  {
    GetBlogsRouter
}