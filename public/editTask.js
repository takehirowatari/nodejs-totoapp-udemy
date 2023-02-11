const TaskIDDOM = document.querySelector(".task-edit-id");
const TaskNameWDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

// 一つのタスクをGET
const showTasks = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    TaskIDDOM.textContent = _id;
    TaskNameWDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {}
};

showTasks();
//タスクの編集

editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = TaskNameWDOM.value;
    taskCpmpleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCpmpleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
