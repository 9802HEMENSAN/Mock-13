const mongoose=require("mongoose")
 
const BlogsSchema=mongoose.Schema({
    userId:{ 
        type:String,
        required:true
    },
     username: {
        type: String ,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      likes: {
        type: Number,
        default: 0,
      },
      comments: [
        {
          username: String,
          content: String,
        },
      ],
})

const BlogsModel=mongoose.model("blog",BlogsSchema)



module.exports={
    BlogsModel
}