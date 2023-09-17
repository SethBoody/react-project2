import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost , deletePost, updatePost } from '../redux/postsSlice';

export default function Posts() {
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [isEdit , setIsEdit] = useState(false);
  const [id , setId]= useState(null);

  const [updatedTitle , setUpdatedTitle] = useState("");
  const [updatedDescription , setUpdatedDescription] = useState("");


  const posts1 =useSelector((state) => state.posts.items);
  const dispatch =useDispatch();
  return (
    <div>
        <div className='form'>
            <input type="text"  placeholder ="Enter post title" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text"  placeholder ="Enter post Desc" onChange={(e) => setDescription(e.target.value)}/>
            <button onClick ={()=>{ dispatch(addPost( {id : posts1.length +1 , title:title  , description:description}))
              setDescription("")
              setTitle("")  
              }}>Add post</button>
        </div>

        <div className="posts">
            
                {posts1.length > 0 ? posts1.map(post => <div key= {post.id} className='post'>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <button onClick={() => {setIsEdit(true) 
                     setId(post.id)}}>Edit</button>
                    <button onClick = {() =>dispatch(deletePost({id :   post.id}))}> Delete</button>

                    {isEdit && id == post.id && (
                      <>
                        <input type="text" placeholder='updated title' onClick={(e) => setUpdatedTitle(e.target.value)}/>
                        <input type="text" placeholder='updated description' onClick={(e) => setUpdatedDescription(e.target.value)}/>
                        <button onClick={() =>{dispatch(updatePost({id:post.id , title : updatedTitle , description: updatedDescription}))
                          setIsEdit(false)
                      }}>updated</button>

                      </>
                    )}
                  </div>
                  ) : "Opss !! There is no posts. "
                }
        </div>
    </div>
  )
}
