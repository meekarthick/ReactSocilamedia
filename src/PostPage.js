import { Link, useParams } from "react-router-dom"
const PostPage = ({post,handleDelete}) => {
  const {id} = useParams();
  const posts = post.find(posts =>(posts.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {posts &&
        <>
            <h2>{posts.title}</h2>
            <p className='postBody'>{posts.body}</p>
            <Link to={`/edit/${posts.id}`}>
            <button
             style={{backgroundColor : "red",outline : "none"}}
            >Edit Posts</button>
            </Link>
            <button 
            style={{backgroundColor : "green",outline : "none"}}
            onClick={() =>handleDelete(posts.id)}>Delete Post</button>
        </>
          }
          {!posts &&
                <>
                      <h2>Page not found</h2>
                      <p>Visit Homepage</p>
                </>
          }
      </article>
    </main>
  )
}

export default PostPage 