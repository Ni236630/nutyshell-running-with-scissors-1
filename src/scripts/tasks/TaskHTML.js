// Component Author: Nicholas Douso
// Purpose:  HTML of task form

 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
  return `
    <div class="task__card"> 
     <li><label for="task--${taskObject.id}">${taskObject.name}</label> <input type="checkbox" id="task--${taskObject.id}" name="vehicle1" value="TaskComplete"> <button>delete</button>
     </li>
    
    </div>
  `
 }
 