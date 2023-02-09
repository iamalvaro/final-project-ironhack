<template>
  <div
    :class="
      props.task.is_complete
        ? 'task-container task-background-completed'
        : 'task-container task-background-default'
    "
  >
    <!-- Logic to change classes when to mark task as completed -->
    <div class="task-heading" @click="showDetails">
      <h3 :class="props.task.is_complete ? 'completed-task' : 'clase1'">
        {{ task.title }}
      </h3>
      <template class="show-task-details" v-if="detailsToggle">
        <p class="task-description">{{ task.description }}</p>
      </template>
    </div>
    <div class="actions">
      <div @click="setTaskComplete" class="action-icon">
        <img src="../../public/checked.png" alt="task completed" />
      </div>
      <div @click="activateEdit" class="action-icon">
        <img src="../../public/edit.png" alt="edit task" />
      </div>
      <div @click="activateDelete" class="action-icon">
        <img src="../../public/cancel.png" alt="delete post" />
      </div>
    </div>
    <!-- DELETE WARNING SCREEN -->
    <template v-if="deleteToggle">
      <DeleteWarning />
    </template>

    <!-- <button @click="deleteTask">Delete {{ task.title }}</button>
    <button @click="activateEdit">Edit {{ task.title }}</button>
    <button @click="setTaskComplete">Completed</button> -->
    <!-- EDIT INPUTS -->
    <template class="edit-input" v-if="editToggle">
      <input type="text" v-model="taskTitle" placeholder="Edit title" />
      <textarea
        class="edit-textarea"
        v-model="taskContent"
        cols="30"
        rows="5"
      ></textarea>
      <!-- <input type="text" v-model="taskContent" placeholder="Edit text" /> -->
      <button @click="submitEdit">Edit Task</button>
    </template>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
import DeleteWarning from "../components/DeleteWarning.vue";

// to access task store
const taskStore = useTaskStore();

// variable to receive info from task through prop object
const props = defineProps({
  task: Object,
});

// Emits to send info to the parent components
const emit = defineEmits(["taskItemComplete", "editTask"]);

//Show task details
const detailsToggle = ref(false);
const showDetails = () => {
  detailsToggle.value = !detailsToggle.value;
};

//Edit task
const editToggle = ref(false);
const taskTitle = ref("");
const taskContent = ref("");

// function to toggle edit input fields
const activateEdit = () => {
  editToggle.value = !editToggle.value;
  taskTitle.value = props.task.title;
  taskContent.value = props.task.description;
};
//function to validate edit and send data to parent through emit
const submitEdit = () => {
  console.log("Click clack MF");
  if (taskTitle.value.length === 0 || taskContent.value.length === 0) {
    alert("Title or description cannot be empty");
  } else {
    const newTaskEdit = {
      title: taskTitle.value,
      description: taskContent.value,
      id: props.task.id,
    };
    emit("editTask", newTaskEdit);
    editToggle.value = false;
  }
};

const setTaskComplete = () => {
  emit("taskItemComplete", props.task);
};

//DELETE TASK ITEM
const deleteToggle = ref(false);
const activateDelete = () => {
  deleteToggle.value = !deleteToggle.value;
};
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const errorMsg = ref("");
</script>

<style>
.completed-task {
  text-decoration: line-through;
  /* background-color: green;
  color: white; */
}
.task-background-completed {
  background-color: rgb(112, 234, 112);
  color: white;
}
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputField used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
