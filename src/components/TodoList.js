import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = ({ todos, completeTodo, removeTodo, editTodo }) => {
    return (
        <section className='todo-list'>
            {todos.map((todo) => {
                const { id, title} = todo
                return (
                    <article key={id} className={todo.completed ? 'todo-item complete' : 'todo-item'}>
                        
                        <p className='title' onClick={() => completeTodo(id)}>{title}</p>

                        <div className="btn-container">
                            <button
                                type='button'
                                className="edit-btn"
                                onClick={() => editTodo(id)}
                            >
                                <FaEdit />
                            </button>
                            <button 
                                type='button' 
                                className="delete-btn"
                                onClick={() => removeTodo(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}

export default TodoList
