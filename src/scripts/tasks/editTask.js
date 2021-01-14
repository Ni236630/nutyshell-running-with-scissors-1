import { editTask } from "./taskDataProvider.js";

const eventHub = document.querySelector(".container")
  const id = customEvent.detail.taskId
 eventHub.addEventListener("checkTaskOff", customEvent => {
   
  const name = document.getElementById("taskName").value;
    const completionDate = document.getElementById("taskDate").value;
    const userId = parseInt(sessionStorage.getItem('activeUser'))
    const isComplete = "true"
  
  
  const completedTask = {
    
    id:id,
    userId:userId,
    name:name,
    completionDate:completionDate,
    isComplete:isComplete
  }
  
 return editTask(completedTask)
 })