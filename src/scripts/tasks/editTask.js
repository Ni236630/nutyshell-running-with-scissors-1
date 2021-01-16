// Component Author: Nicholas Douso
import { editTask } from "./taskDataProvider.js";


 export const taskComplete = (taskId)=>{
   
  
  const name = document.getElementById("taskCardName").innerHTML;
  const completionDate = document.querySelector(".taskDate").id;
  const userId = parseInt(sessionStorage.getItem('activeUser'))
  const isComplete = "true"
  
  
  const completedTask = {
    
    id:taskId,
    userId:userId,
    name:name,
    completionDate:completionDate,
    isComplete:isComplete
  }
  
 return editTask(completedTask)
 }
 
