import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destory, getTodosAsync,toggleTodosAsync,removeTodosAsync } from '../redux/todos/todosSlice'

const TodoList = () => {


    const items = useSelector((state) => state.todos.items)
    const isLoading = useSelector((state) => state.todos.isLoading)
    const dispatch = useDispatch()
    console.log(items)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch]);

    if(isLoading){
        return <div>isLoading</div>
    }

    const handleToggle = async(id,completed)=>{
     await dispatch(toggleTodosAsync({id,data:{completed}}))
    }
    const handleDestroy = async(id)=>{
        await dispatch(removeTodosAsync({id}))
       }

    return (
        <div>
            <ul className="todo-list">
                {
                    items.map((item) => (
                        <li key={item.id}>
                            <div className="view">
                                <input className="toggle" type="checkbox" onChange={() =>handleToggle(item.id,!item.completed)} />
                                <label>{item.title}</label>
                                <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                            </div>
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList