import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const PostLayout = () => {
  return (
    <>
        <ul>
          <li><Link to="/postpage/1">Post1</Link></li>
          <li><Link to="/postpage/2">Post2</Link></li>
          <li><Link to="/postpage/3">Post3</Link></li>
          <li><Link to="/postpage/4">Post4</Link></li>
          <li><Link to="/newpost">NewPost</Link></li>
        </ul>
        <Outlet />
    </>
  )
}

export default PostLayout