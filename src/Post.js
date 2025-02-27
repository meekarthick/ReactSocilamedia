import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
    
  return (
      <article>
            <Link to={`post/${post.id}`}style={{textDecoration :'none', color: 'black'}}>
            <h2>{post.title}</h2>
            </Link>
            <p className='postBody'>{
            (post.body).length <= 25 ?
            post.body
            : `${(post.body).slice(0,25)}...`
            }</p>
      </article>
  )
}

export default Post