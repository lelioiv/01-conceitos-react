import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import webpack from 'webpack';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList(): any {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const nome: any = document.getElementById('title')?.innerText;
    let title: string;
    if(nome != '') {
      title = nome;
    }
    else
    {
      return;
    }
    const novo:Task = {id:Math.random(), title:title, isComplete: false};

    setTasks(tasks.concat(novo));
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const alterar:Task = tasks[tasks.findIndex(i=>i.id == id)];
    alterar.isComplete = !alterar.isComplete;
    setTasks(tasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(t=>t.id != id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            id="title"
            placeholder="Adicionar novo todo" 
            onChange={(e: { target: { value: any; }; }) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task: { id: number; isComplete: any; title: any; }) => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}