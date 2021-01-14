// Component Author: Nicholas Douso
// Purpose:  HTML of task form

 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
  return `
     <li>
      <div class="task__card">
        <label for="taskLabel--${taskObject.id}">${taskObject.name}</label> <input type="checkbox" id="taskBox--${taskObject.id}" name="completeTask" value="false"> 
        complete by: ${taskObject.completionDate} <button id="deleteTask" value="${taskObject.id}">delete</button>
     </div>
    </li>
  `
 }
 