// Component Author: Nicholas Douso
// Purpose: provide an unintrusive way to create a new task

/*    Imports     */

//import { saveTask } from "./taskDataProvider.js";


/*    Listeners     */

const eventHub = document.querySelector(".container")
//listens for save button to be clicked
// const dialogClose = document.querySelector(".dashboard")

/*    events     */


eventHub.addEventListener("click", event =>{
  if (event.target.id === "addTask"){
    console.log(addtask)
    // const taskDialog = document.getElementById("#taskDialog")
    // //targets div to render add task form
    // const taskDialogText = document.querySelector("#parkDialog__form")
    
    // taskDialogText.innerHTML = `
    //   <div>
    //     <form class="addingTask" action="">
    //       <fieldset class="taskForm">
    //       <label for="taskName">Task Name:/<label>
    //       <input class="taskNameInput" type"text" name="taskName" id="taskName">
    //       <label for="completionDate">Due Date:/<label>
    //       <input class="taskDateInput" type"date" name="completionDate" id="taskDate">
    //       <button id="saveTask">Save</button>
    //     </form>
    //   </div>
    // `
    // taskDialog.showModal()
  }
})




export const taskDialog = () => {
  return `
  <dialog id="taskDialog">
    <div id="taskDialog__form"></div>
  </dialog>
  `
}