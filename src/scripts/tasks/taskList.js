/* 

Imports for function use

*/

import {useTasks} from "./taskDataProvider.js";
import { taskHTMLConverter } from "./TaskHTML.js";


/* 

variables for events and injection

*/
let tasks =[]


const eventHub = document.querySelector(".dashboard")


/* 

events to render

*/

eventHub.addEventListener("tasksStateChanged",() => {
  taskList();
})




/* 

initial list of tasks

*/
export const taskList = () => {
  
      const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
      tasks = useTasks()
        return tasks.map((task)=>{
          if(task.userId === activeUserId){
            
             return  taskHTMLConverter(task)
          }
           
        //looping over tasksObjects to create HTML
      }).join("")
}
