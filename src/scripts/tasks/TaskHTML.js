// Component Author: Nicholas Douso
// Purpose:  HTML of task form



 /* 
 
HTML of a single task
 
 */

 export const taskHTMLConverter = (taskObject) => {
   
  return `
     
      <div class="task__card">
        <div class="task__card--data">
          <label for="taskLabel--${taskObject.id}" id="taskCardName"><b>${taskObject.name}</b></label> <input type="checkbox" id="taskCheckbox--${taskObject.id}" name="completeTask" value=""> 
          <div class="taskDate" id=${taskObject.completionDate}>complete by: ${taskObject.completionDate}
            <i class="fas btn fa-trash-alt fa" id="deleteTask" value="${taskObject.id}"></i>
          </div> 
        </div>
     </div>
    
  `
 }
 
 
