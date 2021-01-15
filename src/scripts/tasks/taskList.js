// Component Author: Nicholas Douso
// Purpose: maps over tasks to help create a list
// dispatches ids for save/delete buttons


/*  Imports for function use    */
import {useTasks} from "./taskDataProvider.js";
import { taskHTMLConverter } from "./TaskHTML.js";
import { taskDialog } from "./NewTaskForm.js";
import "./deleteTask.js"
import { taskComplete } from "./editTask.js"

/*  variables for events and injection    */

let tasks =[]

const eventHub = document.querySelector(".container")

/*  events to render    */

eventHub.addEventListener("tasksStateChanged",() => {
  taskList();
})

/*  events dispatch click   */
eventHub.addEventListener("click", customEvent => {
  if(customEvent.target.id === "addTask"){
    const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
    const customEvent = new CustomEvent("newTaskClicked",{
      detail: {
        userId: activeUserId
      }
    })
  return eventHub.dispatchEvent(customEvent)}
  else if(customEvent.target.id ==="deleteTask"){
     const taskId = customEvent.target.value
    const deleteEvent = new CustomEvent("deleteTaskClicked",{
      detail: {
        taskId: taskId
      }
    })
  return eventHub.dispatchEvent(deleteEvent)
    }
  })
  
  //dispatch event for checkbox!
  
//  eventHub.addEventListener("checkbox", customEvent => {
//    const button = customEvent.target.id.split("--")[0]
//    const buttonId = customEvent.target.id.split("--")[1]
//    if(button ==="taskBox"){
//      const makeComplete = new CustomEvent("checkTaskOff",{
//        detail: {
//          taskId: buttonId
//        }
//      })
//      eventHub.dispatchEvent(makeComplete)
//    }
//  }) 

/*  initial list of tasks   */

export const taskList = () => {
  
      const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
      tasks = useTasks()
      //looping over tasksObjects to create HTML
        return` 
        <div class="task__container">
        <button id="addTask">Add New Task</button>
         <ul>${tasks.map((task)=>{
          if(task.userId === activeUserId && task.isComplete === "false"){
            
             return  taskHTMLConverter(task)
          }
      }).join("")}
        </ul>
        ${taskDialog()}
      </div>`
}


eventHub.addEventListener('change',  event =>{
  const checkbox = document.getElementById('taskCheckbox');
    if (!checkbox.checked) {
      return console.log("i am false")
    } else {
      console.log("my value is not checked")
      return taskComplete()
    }
});
