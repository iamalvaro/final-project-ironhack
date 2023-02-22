<template>
  <div class="wrapper">
    <Nav @view-completed="sortTasks" />
    <div class="add-task-wrapper">
      <NewTask @refreshTasks="getTasks" />
      <ViewSelect @view-task-option="sortTasks" />
    </div>
    <div class="task-wrapper">
      <TaskItem
        v-for="task in displayedTasks"
        :key="task.id"
        :task="task"
        @task-item-complete="completeTaskData"
        @editTask="editTaskData"
        @refresh-tasks="getTasks"
      />
    </div>
    <ScrollUp />
    <TaskFooter />
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted, watchEffect } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import TaskFooter from "../components/TaskFooter.vue";
import ScrollUp from "../components/ScrollUp.vue";
import ViewSelect from "../components/ViewSelect.vue";
const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);
const completedTasks = ref([]);
const uncompletedTasks = ref([]);
const displayedTasks = ref([]);
const viewTaskOption = ref("pending");

// funcion conectada a un custom event que viene de el ocmp viewSelect apra recibir info de la prioridad de la tarea

// const displayOption = (infoDeEmit) => {
//   console.log(viewTaskOption.value);

//   viewTaskOption.value = infoDeEmit;
//   console.log(viewTaskOption.value);
// };

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  await taskStore.fetchTasks();
  tasks.value = taskStore.tasksArr;
  completedTasks.value = taskStore.completeArr;
  uncompletedTasks.value = taskStore.incompleteArr;
  sortTasks("all");
  // console.log(uncompletedTasks.value, completedTasks.value);
};

getTasks();

const sortTasks = (option) => {
  viewTaskOption.value = option;

  if (viewTaskOption.value === "all") {
    // console.log("something");
    displayedTasks.value = tasks.value;
  }
  if (viewTaskOption.value === "completed") {
    // console.log("completed tasks");
    displayedTasks.value = tasks.value;
    displayedTasks.value = completedTasks.value;
    console.log(displayedTasks.value);
  }
  if (viewTaskOption.value === "pending") {
    displayedTasks.value = uncompletedTasks.value;
  }
};

/* onUpdated(() => {
  getTasks();
}); */

//Connect to supabase to mark task as complete
const completeTaskData = async (taskObject) => {
  console.log("click");
  // console.log(taskObject.id);
  let changeTaskBool = !taskObject.is_complete;
  let taskId = taskObject.id;
  //Add setTimeout or set interval to wait a few seconds before completed task dissapears
  await taskStore.taskCompleted(taskId, changeTaskBool);
  getTasks();
};

//Function to send edit task back to database
const editTaskData = async (editTaskObject) => {
  console.log("click");
  console.log(editTaskObject);
  await taskStore.editTask(
    editTaskObject.id,
    editTaskObject.title,
    editTaskObject.description
  );
  getTasks();
};
</script>

<style></style>
