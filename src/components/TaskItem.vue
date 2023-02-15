<template>
  <div
    :class="
      props.task.is_complete
        ? 'task-container task-background-completed'
        : 'task-container task-background-default'
    "
  >
    <!-- Logic to change classes when to mark task as completed -->
    <div class="task-heading-container" @click="showDetails">
      <div class="task-heading">
        <h3 :class="props.task.is_complete ? 'completed-task' : 'clase1'">
          {{ taskTitleModifier() }}
        </h3>
        <i v-if="detailsToggle" class="fa-solid fa-caret-up"></i>
        <i v-else class="fa-solid fa-caret-down"></i>
      </div>
      <template class="show-task-details" v-if="detailsToggle">
        <div class="task-description-container">
          <p
            :class="
              task.description.length > 25 ? 'task-description' : 'short-text'
            "
          >
            {{ task.description }}
          </p>
        </div>
      </template>
    </div>
    <div class="actions">
      <div @click="setTaskComplete" class="action-icon">
        <!-- <i class="fa-regular fa-badge-check"></i>

        <i class="fa-solid fa-arrow-up"></i>
        <i class="fa-solid fa-badge-check"></i> -->
        <img src="../../public/checked.png" alt="task completed" />
      </div>
      <div @click="activateEdit" class="action-icon">
        <!-- <i class="fa-regular fa-pen-to-square"></i> -->

        <img src="../../public/edit.png" alt="edit task" />
      </div>
      <div @click="activateDelete" class="action-icon">
        <!-- <i class="fa-regular fa-trash-xmark"></i> -->

        <img src="../../public/cancel.png" alt="delete post" />
      </div>
    </div>
    <!-- DELETE WARNING SCREEN -->
    <template v-if="deleteToggle">
      <DeleteWarning
        @emit-delete-task="deleteTaskTest"
        @emit-close-modal="closeModalParent"
        :boolean-prop="deleteToggle"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      />
    </template>
    <!-- EDIT INPUTS -->
    <template class="edit-input" v-if="editToggle">
      <input type="text" v-model="taskTitle" placeholder="Edit title" />
      <div class="scrollbar-container">
        <textarea
          class="edit-textarea"
          v-model="taskContent"
          cols="30"
          rows="5"
        ></textarea>
      </div>
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

//Short title for display purposes

const taskTitleModifier = () => {
  if (detailsToggle.value === true) {
    return props.task.title;
  }
  if (props.task.title.length > 8) {
    return props.task.title.substring(0, 8) + "...";
  } else {
    return props.task.title;
  }
};

// const shortTitle = ref(
//   props.task.title.length > 8
//     ? props.task.title.substring(0, 8) + "..."
//     : props.task.title
// );

// userEmail.value = useUserStore().user.email;
// {{ userEmail.substring(0, 15) + "..." }}

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

const deleteTaskTest = async () => {
  await taskStore.deleteTask(props.task.id);
  deleteToggle.value = !deleteToggle.value;
};

// CLOSE MODAL FROM DELETWARNING EMITTED EVENT WITH INFO STORING A FALSE VALUE TO PASS ON TO THE deleteToggle variable.
const closeModalParent = (valueFromChildEvent) => {
  deleteToggle.value = valueFromChildEvent;
  // alert(valueFromChildEvent);
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
  color: var(--colorBrokenWhite);
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
