// Component Author: Nicholas Douso
import { editTask } from "./taskDataProvider.js";

const eventHub = document.querySelector(".container")

 export const taskComplete = ()=>{
  const id = parseInt(document.getElementById("deleteTask").value)
  const name = document.getElementById("taskCardName").innerHTML;
  const completionDate = document.querySelector(".taskDate").id;
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
 }
 
