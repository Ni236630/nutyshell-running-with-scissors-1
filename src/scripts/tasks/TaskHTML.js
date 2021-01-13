// Component Author: Nicholas Douso
// Purpose:  HTML of task form

 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
  return `
    <div class="task__card"> 
      <h2>${taskObject.name}</h2>
    
    </div>
  `
 }
 