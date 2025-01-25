import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
  deleteDoc,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Add Task

addTaskBtn.addEventListener("click", async () => {
  const task = taskInput.value.trim();
  if (task) {
    const taskText = sanitizeInput(task);

    // Saving the to-do list
    await addTaskToFirestore(taskText);
    renderTasks();
    taskInput.value = "";
  }
});

async function addTaskToFirestore(taskText) {
  await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false,
  });
}

// Retrieving to-do list
async function renderTasks() {
  var tasks = await getTaskFromFirestore();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.textContent = task.data().text;
      taskList.appendChild(taskItem);
    }
  });
}

async function getTaskFromFirestore() {
  var data = await getDocs(collection(db, "todos"));
  let userData = [];
  data.forEach((doc) => {
    userData.push(doc);
  });
  return userData;
}

// Remove Task on Click
taskList.addEventListener("click", async (e) => {
  if (e.target.tagName === "LI") {
    const taskId = e.target.id;
    await deleteTaskFromFirestore(taskId); // delete from firestore
    e.target.remove(); // remove from UI
  }
});

// delete task from firestore
async function deleteTaskFromFirestore(taskId) {
  const taskRef = doc(db, "todos", taskId);
  await deleteDoc(taskRef);
}

const sw = new URL("service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
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
}
