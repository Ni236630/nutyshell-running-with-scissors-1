// Component Author: Nicholas Douso
// Purpose:  HTML of task form



 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
   
  return `
     <li>
      <div class="task__card">
        <label for="taskLabel--${taskObject.id}" id="taskName">${taskObject.name}</label> <input type="checkbox" id="taskCheckbox" name="completeTask" value="false"> 
        <div id="taskDate" value = ${taskObject.completionDate}>complete by: ${taskObject.completionDate}<div> <button id="deleteTask" value="${taskObject.id}">delete</button>
     </div>
    </li>
  `
 }
 
 
