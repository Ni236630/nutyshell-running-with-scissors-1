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
  else if(customEvent.target.id.startsWith("deleteTask--")){
    const [prefix, taskId] = customEvent.target.id.split("--")
    const deleteEvent = new CustomEvent("deleteTaskClicked",{
      detail: {
        taskId: taskId
      }
    })
  return eventHub.dispatchEvent(deleteEvent)
    }
  })
  
  /*    Event for completing tasks      */
  
  eventHub.addEventListener('change',  event =>{
    
    if(event.target.id.startsWith("taskCheckbox--")){
      const [prefix, taskId] = event.target.id.split("--")
      const checkbox = document.querySelector(".task__card");
      if (!checkbox.checked && event.target.id.includes(taskId)) {
        return taskComplete(taskId)
      } else {
       
        return 
      }}
  });
  
export const taskList = () => {
  
      const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
      tasks = useTasks()
      //looping over tasksObjects to create HTML
        return` 
        <div class="task__container">
        <i id="addTask" class="btn fas fa-plus-circle fa-2x"></i>
         ${tasks
          .sort((a,b)=>a.completionDate.localeCompare(b.completionDate))
          .map((task)=>{
          if(task.userId === activeUserId && task.isComplete === "false"){
            
             return  taskHTMLConverter(task)
          }
      }).join("")}
        
        ${taskDialog()}
      </div>`
}



