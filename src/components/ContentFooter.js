import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearCompleted } from '../redux/todos/todosSlice'

const ContentFooter = () => {

  const items = useSelector((state) => state.todos.items)
  const dispatch = useDispatch()

  const itemsLeft=items.filter((item)=>item.completed==true).length;
  console.log(itemsLeft)
  return (
    <div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft}</strong>
          items left
        </span>

        <ul class="filters">
          <li>
            <a href='#' className="selected">All</a>
          </li>
          <li>
            <a href='#'>Active</a>
          </li>
          <li>
            <a href='#'>Completed</a>
          </li>
        </ul>

        <button onClick={()=>dispatch(clearCompleted())} className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  )
}

export default ContentFooter