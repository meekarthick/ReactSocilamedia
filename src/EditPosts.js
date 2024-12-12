import { useEffect } from "react"
import { useParams } from "react-router-dom"

const EditPosts = ({post,handleEdit,editBody,updateBody,editTitle,updateTitle
}) => {
    const {id} = useParams()
    const posts = post.find(post =>  post.id.toString() === id)

    useEffect(()=>{
        if(posts){
            updateTitle(posts.title)
            updateBody(posts.body)
        }
    },[post,updateTitle,updateBody])

  return (
    <main className="NewPost">
    
    <>
            <h2>Edit Post</h2> 
            <form className="newPostForm"
            onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) =>updateTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) =>updateBody(e.target.value)}/>
                    <button type="submit" onClick={()=>handleEdit(posts.id)}>Submit</button>
            </form>
    </>


    </main>
  )
}

export default EditPosts