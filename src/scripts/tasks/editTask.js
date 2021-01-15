import { editTask } from "./taskDataProvider.js";


 export const taskComplete = ()=>{
  const id = parseInt(document.getElementById("deleteTask").value)
  const name = document.getElementById("taskName").innerHTML.value;
  const completionDate = document.getElementById("taskDate").innerHTML.value;
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