import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API


export const useTaskStore = defineStore("tasks", () => {
  const tasksArr = ref(null);
  const completeArr = ref(null);
  const incompleteArr = ref(null);
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    completeArr.value = tasks.filter((task) => task.is_complete);
    incompleteArr.value = tasks.filter((task) => !task.is_complete);
    return tasksArr.value;
  };
  
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        // deadline: deadline,
      },
    ]);
  };
  //Edit existing tasks 
  const editTask = async (id, title, description) => {
    let {data: tasks, error} = await supabase
    .from("tasks")
    .update({
      title: title,
      description: description
    })
    .match({id: id})
  };


  //Completar tarea de Supabase - apuntando al valor booleano is_complete
  const taskCompleted = async (id, boolValue) => {
      let { data: tasks, error} = await supabase
      .from('tasks')
      .update({is_complete: boolValue})
      .match({id: id});
  };



  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return  {fetchTasks, addTask, deleteTask, tasksArr, taskCompleted, editTask, completeArr, incompleteArr}
});
