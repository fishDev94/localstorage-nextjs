"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { nanoid } from "nanoid";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const inputEl = useRef(null);
  const router = useRouter()

  useEffect(() => {
    console.clear();
    const tasksFromStorage = localStorage.getItem("tasks");

    if (tasksFromStorage) {
      const parsedTasks = JSON.parse(tasksFromStorage);
      
      setTasks(parsedTasks);
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
    setTasks([]);
  };

  const handleAddClick = () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasks, inputEl.current.value])
    );
    setTasks([...tasks, { title: inputEl.current.value, id: nanoid(2) }]);
    inputEl.current.value = ""
  };

  const removeTask = (id) => {
    console.log(id);
    localStorage.setItem(
      "tasks", JSON.stringify(tasks.filter(t => t.id !== id))
    )

    setTasks(tasks.filter(t => t.id !== id))
    
  };

  return (
    <main>
      <h1>sono qui</h1>
      <button onClick={handleClick}>Clear All</button>
      <div>
        <input
          ref={inputEl}
          type="text"
          placeholder="inserisci qualcosa"
        ></input>
        <button onClick={handleAddClick}>add</button>
      </div>

      <ul>
        {tasks.map((task, idx) => {
          return (
            <li key={idx}>
              {task.title} <button onClick={() => removeTask(task.id)}>remove</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
