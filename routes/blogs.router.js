const express=require("express")
const {BlogsModel}=require("../Model/blogs.model")
const BlogsRouter=express.Router()
 
BlogsRouter.post("/create", async (req, res) => {
  try {
    const blog = new BlogsModel(req.body);
    await blog.save();
    res.json({ message: "Blogs added" }); // Return a JSON object
  } catch (error) {
    res.send(error);
  }
});
 
 
 
BlogsRouter.delete("/:id"  , async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
 
      const blog = await BlogsModel.findOne({ _id: id, userId });
  
      if (!blog) {
  
        return res.status(404).json({ error: "Note not found" });
      }
   
      await BlogsModel.findByIdAndDelete(id);
      res.send({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 
module.exports={
    BlogsRouter
}