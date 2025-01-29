/*import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
  deleteDoc,
} from "firebase/firestore";*/

/*const firebaseConfig = {
  apiKey: "AIzaSyA3v10UFzZ_HGbIIJwItHDiCdnZPBjnbZ8",
  authDomain: "first-pwa-fd641.firebaseapp.com",
  projectId: "first-pwa-fd641",
  storageBucket: "first-pwa-fd641.firebasestorage.app",
  messagingSenderId: "1026685908541",
  appId: "1:1026685908541:web:1f145ccf10a80e7f295c54",
  measurementId: "G-E55YXDLFSV",
};*/

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add Task
addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
    taskInput.value = "";
  }
});

// Remove Task on Click
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});
