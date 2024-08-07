import { useState, useEffect } from 'react';
import './App.css';
import Delete from './logo/delete.svg';
import CheckIcon from './logo/check-icon.jpg';

function App() {
  //state to manage weather the completed task screen is active. 
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  //state to manage list of all todos.
  const [allTodos, setTodos] = useState([]);
  //state tomanage the new todo tiltle input.
  const [newTitle, setNewTitle] = useState("");
  //state to manage the new todo descrriptioninput.
  const [newDescription, setNewDescription] = useState("");
  //state to manage the list of completed todos.
  const [completedTodo,setCompletedTodos]=useState([]);

  // useEffect to load todos and completed todos from local storage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedtodo = JSON.parse(localStorage.getItem('completedTodo'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    if(savedCompletedtodo){
      setCompletedTodos(savedCompletedtodo);
    }

  }, []);

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("")
    setNewDescription("")
  };

   // Function to handle deleting a todo
 const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }
  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd + '-'+ mm + "-" + yyyy + ' at ' + h + ':'+ m + ':' + s;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }
    // Remove the item from the allTodos array
    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));

    // Add the item to the completedTodo array
    let updatedCompletedArr=[...completedTodo];
      updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr)
      localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr));
  
  }
  // Add the item to the completedTodo array
  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodo];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodo',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
  }
  return (
    <div className="App">
      <h1>Todos App</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description?" />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primary-btn' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secndry-btn ${isCompleteScreen === false ? 'active' : ''}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secndry-btn ${isCompleteScreen === true ? 'active' : ''}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          { isCompleteScreen===false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div>
                  <img src={Delete} alt='delete-icon'  onClick={()=>{handleDeleteTodo(index)}} className='icon' />
                  <img src={CheckIcon} alt='check-icon' onClick={()=>{handleComplete(index)}} className='check-icon' />
                </div>
              </div>
            );
          })}

           { isCompleteScreen===true && completedTodo.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p><italic>completed on: {item.completedOn}</italic></p>
                </div>
                <div>
                  <img src={Delete} alt='delete-icon'  onClick={()=>{handleDeleteCompletedTodo(index)}} className='icon' />
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
