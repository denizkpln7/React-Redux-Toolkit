import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'


export const getTodosAsync=createAsyncThunk('todos/getTodosAsync',async ()=>{
    const res= await axios('http://localhost:7000/todos')
    return  res.data;
})

export const addTodosAsync=createAsyncThunk('todos/ddTodosAsync',async (data)=>{
    const res= await axios.post('http://localhost:7000/todos',data)
    return  res.data;
})

export const toggleTodosAsync=createAsyncThunk('todos/toggleTodosAsync',async ({id,data})=>{
    const res= await axios.patch(`http://localhost:7000/todos/${id}`,data)
    return  res.data;
})

export const removeTodosAsync=createAsyncThunk('todos/removeTodosAsync',async ({id})=>{
    const res= await axios.delete(`http://localhost:7000/todos/${id}`)
    return  res.data;
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items:[],
        isLoading:false,
        error:null
    },
    reducers: {
        // addTodo:{
        //     reducer:(state, action) => {
        //         state.items.push(action.payload)
        //     },
        //     prepare:({title})=>{
        //         return{
        //             payload:{
        //                 id:nanoid(),
        //                 completed:false,
        //                 title,
        //             }
        //         }
        //     }
        // },
        toggle: (state, action) => {
            const { id } = action.payload
            const item = state.items.find((item) => item.id === id)
            item.completed = !item.completed
        },
        destory: (state, action) => {
            const  id  = action.payload
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered
        },
        clearCompleted:(state,action)=>{
            const filtered=state.items.filter((item)=>item.completed===false)
            state.items=filtered
        }
    },
    extraReducers:{
        //getTodo
        [getTodosAsync.pending]:(state,action)=>{
           state.isLoading=true;
        },
        [getTodosAsync.fulfilled]:(state,action)=>{
            state.items=action.payload;
            state.isLoading=false
        },
        [getTodosAsync.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
        },
        //addTodo
        [addTodosAsync.fulfilled]:(state,action)=>{
            state.items.push(action.payload)
        },
        //toggleTodo
        [toggleTodosAsync.fulfilled]:(state,action)=>{
            const { id,completed } = action.payload
            const item = state.items.findIndex((item) => item.id === id)
            state.items[item].completed=completed
        },
        [ removeTodosAsync.fulfilled]:(state,action)=>{
            const  {id } = action.payload
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered
        }
       
    }
})

export const selectFilteredTodos=(state)=>{
    if(state.items.completed===true){
        return state.todos.item
    }

}

export const { addTodo, toggle, destory,clearCompleted } = todosSlice.actions;
export default todosSlice.reducer