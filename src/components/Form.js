import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { addTodo,addTodosAsync } from '../redux/todos/todosSlice'

const Form = () => {
  const [title,setTitle]=useState('')
  const dispatch = useDispatch()

const handleSubmit= async (e)=>{
  e.preventDefault();
  await dispatch(addTodosAsync({title}))
  setTitle("")
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
			<input value={title} onChange={(e)=>setTitle(e.target.value)} className="new-todo" placeholder="What needs to be done?" autofocus/>
		</form>
    </div>
  )
}

export default Form