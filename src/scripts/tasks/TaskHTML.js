// Component Author: Nicholas Douso
// Purpose:  HTML of task form

 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
  return `
     <li>
      <div class="task__card"> 
        <label for="task--${taskObject.id}">${taskObject.name}</label> <input type="checkbox" id="task--${taskObject.id}" name="vehicle1" value="TaskComplete"> <button>delete</button>
     </div>
    </li>
  `
 }
 