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
              task.description.length > 35 ? 'task-description' : 'short-text'
            "
          >
            {{ task.description }}
          </p>
        </div>
      </template>
    </div>
    <div class="actions">
      <div
        @click="setTaskComplete"
        :class="editToggle ? 'disabled action-icon' : 'check action-icon'"
      >
        <i v-if="completeIcon" class="fa-solid fa-square-check"></i>
        <i v-else class="fa-regular fa-square-check"></i>
      </div>
      <div
        @click="activateEdit"
        :class="completeIcon ? 'disabled action-icon' : 'action-icon edit'"
      >
        <i v-if="editToggle" class="fa-solid fa-pen-to-square"></i>
        <i v-else class="fa-regular fa-pen-to-square"></i>
      </div>
      <div
        @click="activateDelete"
        :class="
          editToggle || completeIcon
            ? 'disabled action-icon'
            : 'delete action-icon'
        "
      >
        <i v-if="deleteToggle" class="fa-solid fa-square-minus"></i>
        <i v-else class="fa-regular fa-square-minus"></i>
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

      <textarea
        class="edit-textarea"
        v-model="taskContent"
        cols="30"
        rows="5"
      ></textarea>

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
const emit = defineEmits(["taskItemComplete", "editTask", "refreshTasks"]);

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
  if (completeIcon.value) {
    return null;
  } else {
    editToggle.value = !editToggle.value;
    taskTitle.value = props.task.title;
    taskContent.value = props.task.description;
  }
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

//Set task complete and bolean to change icon
const completeIcon = ref(props.task.is_complete);

const setTaskComplete = () => {
  if (editToggle.value) {
    return null;
  } else {
    emit("taskItemComplete", props.task);
    completeIcon.value = !completeIcon.value;
  }
};
//Emits to refresh tasks when one is deleted

//DELETE TASK ITEM
const deleteToggle = ref(false);
const activateDelete = () => {
  if (editToggle.value || completeIcon.value) {
    return null;
  } else {
    deleteToggle.value = !deleteToggle.value;
  }
};
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const deleteTaskTest = async () => {
  await taskStore.deleteTask(props.task.id);
  deleteToggle.value = !deleteToggle.value;
  emit("refreshTasks");
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
  background-color: rgba(130, 238, 130, 0.7);

  /* color: var(--colorLightGrey); */
}
</style>
