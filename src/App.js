import React, { useState, useEffect } from 'react'
import List from './components/TodoList'
import Alert from './components/Alert';

const getLocalStorage = () => {
  const todos = localStorage.getItem('todos')
  if (todos) {
    return JSON.parse(localStorage.getItem('todos'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [todos, setTodos] = useState(getLocalStorage());
  const [editItem, setEditItem] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show:false,
    msg: '',
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //set alert if name is empty
      showAlert(true, 'danger', 'please enter what todo')
    } else if (name && editItem) {
      //set item to edit
      setTodos(todos.map((item) => {
        if (item.id === editID) {
          return {...item, title:name}
        }
        return item;
      }))
      setName('')
      setEditID(null)
      setEditItem(false)
      showAlert(true, 'success', 'todo changed');
    } else {
      showAlert(true, 'success', 'todo added to the list');
      const newItem = {id: new Date().getTime().toString(), title:name};
      setTodos([...todos, newItem]);
      setName('');
    }
  }
  //show alert of danger or success
  const showAlert = (show=false,type='',msg='') => {
    setAlert({show,type, msg})
  }
  //complete todo function
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  //clear all list item;
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setTodos([])
  }
  //delete an item from the list
  const removeTodo = (id) => {
    showAlert(true, 'danger', 'item removed')
    setTodos(todos.filter((item) => item.id !== id))
  }
  //edit an item in the list
  const editTodo = (id) => {
    const specificItem = todos.find((todo) => todo.id === id);
    setEditItem(true)
    setEditID(id);
    setName(specificItem.title)
  }
  //set item to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit} >
        {alert.show && <Alert {...alert} removeAlert={showAlert} todos={todos}/>}
        <h1>what's the plan for today?</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add a todo..."
            className='todo-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className='submit-btn'>
            {editItem ? 'edit todo' : 'add todo'}
          </button>
        </div>
      </form>
      {todos.length > 0 && (
        <article className="todo-container">
          <List 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
          <button
            className="clear-btn"
            onClick={clearList}
          >
            clear items
          </button>
        </article>
      )}
    </section>
  );
}

export default App;
