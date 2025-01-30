import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3v10UFzZ_HGbIIJwItHDiCdnZPBjnbZ8",
  authDomain: "first-pwa-fd641.firebaseapp.com",
  projectId: "first-pwa-fd641",
  storageBucket: "first-pwa-fd641.firebasestorage.app",
  messagingSenderId: "1026685908541",
  appId: "1:1026685908541:web:1f145ccf10a80e7f295c54",
  measurementId: "G-E55YXDLFSV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sw = new URL("service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(sw.href, { scope: "/First-PWA/" })
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.error("Service Worker Error:", err));
}
/*if ("serviceWorker" in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: "/First-PWA/",
  })
    .then((_) =>
      console.log(
        "Service Worker Registered for scope:",
        sw.href,
        "with",
        import.meta.url
      )
    )
    .catch((err) => console.error("Service Worker Error:", err));
}*/

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add Task
addTaskBtn.addEventListener("click", async () => {
  const taskText = taskInput.value.trim();

  if (taskText) {
    await addTaskToFirestore(taskText);
    renderTasks();
    taskInput.value = "";
  }
});

async function addTaskToFirestore(taskText) {
  try {
    await addDoc(collection(db, "todos"), {
      text: taskText,
      completed: false,
    });
    console.log("Task successfully added");
  } catch (error) {
    console.error("Error adding task: ", error);
  }
}

// Fetch and Render Tasks
async function renderTasks() {
  const tasks = await getTasksFromFirestore();
  console.log("Tasks fetched from Firestore: ", tasks);
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the list before rendering

  tasks.forEach((task) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.textContent = task.data().text;
      taskList.appendChild(taskItem);
    }
  });
}

// Get Tasks from Firestore
async function getTasksFromFirestore() {
  const data = await getDocs(collection(db, "todos"));
  const userData = [];
  data.forEach((doc) => {
    userData.push(doc);
  });
  return userData;
}

// Call renderTasks when the app loads
window.addEventListener("load", () => {
  renderTasks();
});

// Sanitize User Input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

const taskText = sanitizeInput(taskInput.value.trim());
//await addTaskToFirestore(taskText);

// Remove Task on Click
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});
