// Component Author: Nicholas Douso
// Purpose: Data provider for tasks houses functions for delete and saves

/*

Variable storage

*/
let tasks = [];
const eventHub = document.querySelector(".container")

/*

Task Event For Updating State

*/

const dispatchStateChangeEvent = () => {
  const taskStateChangedEvent = new CustomEvent('tasksStateChanged')
  eventHub.dispatchEvent(taskStateChangedEvent)
};

/*

Task State Functions

*/

export const  useTasks = () => {
  return tasks.slice()
}

export const getTasks = () => {
  return fetch("http://localhost:8088/tasks")
    .then( response =>response.json())
    .then(
      parsedTasks => {
        tasks = parsedTasks
      }
    )
};

/*

Task Modification Functions

*/

export const saveTask = (task) => {
  return fetch("http://localhost:8088/tasks",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
  .then(getTasks)
  .then(dispatchStateChangeEvent)
};

export const deleteTask = (taskId) => {
  return fetch(`http://localhost:8088/tasks/${taskId}`,{
    method: "DELETE"
  })
  .then(getTasks)
  .then(dispatchStateChangeEvent)
};


