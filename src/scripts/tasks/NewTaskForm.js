// Component Author: Nicholas Douso
// Purpose: provide an unintrusive way to create a new task

/*    Imports     */

import { saveTask } from "./taskDataProvider.js";


/*    Listeners     */

const eventHub = document.querySelector(".container")
//listens for save button to be clicked
const dialogClose = document.querySelector(".container")


//listener for saving tasks

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveTask") {
    const name = document.getElementById("taskName").value;
    const completionDate = document.getElementById("taskDate").value;
    const userId = parseInt(sessionStorage.getItem('activeUser'))
    const isComplete = "false"

    const newTask = {
      userId:userId,
      name:name,
      completionDate:completionDate,
      isComplete:isComplete
    }
  clickEvent.preventDefault()
   return saveTask(newTask)

  }
});
/*    events     */

//closes dialog box
dialogClose.addEventListener("click",event =>{
  if(event.target.id === "closeDialog__task"){
    const dialog = document.getElementById("taskDialog")
    return dialog.close()
  }
})

//opens dialog box
eventHub.addEventListener("newTaskClicked", customEvent =>{

    const taskDialog = document.getElementById("taskDialog")
    //targets div to render add task form
    const taskDialogText = document.getElementById("taskDialog__form")
    
    taskDialogText.innerHTML = `
      <div id="taskDialog">
        <form class="addingTask" action="">
          <fieldset class="taskForm">
          <label for="taskName">Task Name:<label>
          <input class="taskNameInput" type"text" name="taskName" id="taskName">
          <label for="completionDate">Due Date:<label>
          <input class="taskDateInput" type="date" name="completionDate" id="taskDate">
          <button id="saveTask">Save</button>
          
            <i class="taskClose--btn btn fas fa-window-close fa-2x" id="closeDialog__task"></i>
          
        </form>
      </div>`
     taskDialog.showModal()
})




export const taskDialog = () => {
  return `
  <dialog id="taskDialog">
    <div id="taskDialog__form"></div>
   
  </dialog>
  `
}