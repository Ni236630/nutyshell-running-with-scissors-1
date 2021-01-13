/* 

Imports for function use

*/

import { getTasks,useTasks} from "./taskDataProvider.js";
import { taskHTMLConverter } from "./TaskHTML.js";

/* 

variables for events and injection

*/
let tasks =[]

const contentTarget = document.querySelector(".task-list")
const eventHub = document.querySelector(".dashboard")


/* 

events to render

*/

eventHub.addEventListener("tasksStateChanged",() => {
  taskList();
})





/* 

Render tasks to DOM

*/

const render = (allTasks) =>{
 allTasks.map((task)=>{
    //looping over tasksObjects to create HTML
    
    return taskHTMLConverter(task)
  }).join("")
}
/* 

initial list of tasks

*/
export const taskList = () => {
  getTasks()
    .then(() =>{
      tasks = useTasks()
      console.log(tasks)
      render(tasks)
     })
}
