import { Link, useNavigate, Route, Router, Routes } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import { Header } from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import api from './api/posts'
import EditPosts from "./EditPosts";

function App() {
  const navigate = useNavigate();
const [post,setPost] = useState([])
const [editBody,updateBody]= useState('')
const [search,setSearch] = useState('')
const [searchResults,setSearchResults] = useState([])
const [postTitle,setPostTitle] = useState('')
const [editTitle,updateTitle] = useState('')
const[postBody,setPostBody] = useState('')

useEffect(() => {
  const fetchPosts = async () =>{
   try{
     const response = await api.get('/posts')
     setPost(response.data)
   } catch(err){
     if(err.response){
       console.log(err.response.data);
       console.log(err.response.status);
       console.log(err.response.headers);
     }
     else{
       console.log(`Error:${err.message}`);
     }
   }
  }
  fetchPosts()
},[]);

useEffect(() => {
  const filterItems = post.filter(post => 
      ((post.body && post.body.toLowerCase().includes(search.toLowerCase())) ||
      (post.title && post.title.toLowerCase().includes(search.toLowerCase())))
  );

  setSearchResults(filterItems.reverse());
}, [post, search]);



const handleSubmit =async (e) =>{
  e.preventDefault();
  const id = post.length ? post[post.length-1].id + 1 : 1
  const newPost = {id,title:postTitle,body:postBody}
  try{
    const response = await api.post('/posts',newPost)
    const allPosts = [...post,newPost]
    setPost(allPosts);
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }catch(err){
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
    else{
      console.log(`Error:${err.message}`);
    } 
  }

}

const handleDelete = async(id) => {
  try{
    await api.delete(`posts/${id}`)
    const filterItems = post.filter(posts => (posts.id) != id)
    setPost(filterItems)
    navigate('/')
  }catch(err){
    console.log(`Error:${err.message }`);
  }
}

const handleEdit = async (id) =>{
   const updatedPost = {id,title:editTitle,body:editBody}
   try{
    const response = await api.put(`/posts/${id}`,updatedPost)
    setPost(post.map(posts => posts.id === id ? {
      ...response.data}:posts))
    updateTitle('')
    updateBody('')
    navigate('/')
   }catch(err){ 
      console.log(`Error:${err.message}`);
   }
}
 
  return (
    <div className="App">

        <Header title="Social Media"  />
        <Nav
            search={search}
            setSearch={setSearch}
        />
        <Routes>
                <Route path="/" element={<Home post={searchResults}/>}></Route>
                <Route path="post"> 
                      <Route index element={
                      <NewPost
                      handleSubmit={handleSubmit}
                      postBody={postBody}
                      postTitle={postTitle}
                      setPostBody={setPostBody}
                      setPostTitle={setPostTitle} />}></Route>
                      <Route path=":id" element={<PostPage post={post} handleDelete = {handleDelete} />}></Route>
                </Route>
                <Route path="/edit/:id" element={<EditPosts
                      handleEdit = {handleEdit}
                      post = {post}
                      editTitle={editTitle}
                      editBody={editBody}
                      updateBody = {updateBody}
                      updateTitle={updateTitle}
                />}></Route>
                  <Route path="about" element={
                  <About />
                  }></Route>
                <Route path="*" element={
                    <Missing />
                }></Route>
        </Routes>
        
        <Footer />  
    </div>
  );
}

export default App;
