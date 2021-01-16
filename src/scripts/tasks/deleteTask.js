// Component Author: Nicholas Douso
import { deleteTask } from "./taskDataProvider.js";


const eventHub = document.querySelector(".container")

eventHub.addEventListener("deleteTaskClicked", (clickEvent) =>{
  
     deleteTask(clickEvent.detail.taskId)

})

