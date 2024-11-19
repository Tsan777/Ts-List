// DOM Elements
const taskInput = document.getElementById('task');
const rewardInput = document.getElementById('reward');
const topicInput = document.getElementById('topic');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');
const importBtn = document.getElementById('import-btn');
const importPopup = document.getElementById('import-popup');
const closePopup = document.getElementById('close-popup');
const importFileInput = document.getElementById('import-file');
const importTextInput = document.getElementById('import-text');
const importSubmitBtn = document.getElementById('import-submit');

// Load tasks from LocalStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
}

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const reward = rewardInput.value.trim();
    const topic = topicInput.value.trim();

    if (task && reward && topic) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Add new task with 'isMainTask' set to false by default
        tasks.push({ name: task, reward: reward, topic: topic, isMainTask: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
        rewardInput.value = '';
        topicInput.value = '';

        renderTasks(tasks);
    }
});

// Render tasks in the list, grouped by topic
function renderTasks(tasks) {
    taskList.innerHTML = ''; // Clear current tasks

    // Group tasks by topic
    const groupedTasks = groupTasksByTopic(tasks);

    // Render each group
    Object.keys(groupedTasks).forEach(topic => {
        const topicGroup = document.createElement('div');
        topicGroup.classList.add('topic-group');

        // Add topic title
        const topicTitle = document.createElement('h2');
        topicTitle.textContent = topic;
        topicGroup.appendChild(topicTitle);

        // Render tasks for this topic
        groupedTasks[topic].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;

            // Reward display
            const rewardSpan = document.createElement('span');
            rewardSpan.textContent = `(Reward: ${task.reward})`;
            li.appendChild(rewardSpan);

            // Create checkbox for Main Task
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.isMainTask;
            checkbox.disabled = task.isMainTask; // Only one checkbox can be checked at a time

            // Checkbox change event
            checkbox.addEventListener('change', () => {
                toggleMainTask(task, tasks);
            });

            li.prepend(checkbox);

            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => {
                removeTask(task.name, task.reward, task.topic);
            };

            li.appendChild(delBtn);
            topicGroup.appendChild(li);
        });

        taskList.appendChild(topicGroup);
    });
}

// Group tasks by topic
function groupTasksByTopic(tasks) {
    return tasks.reduce((groups, task) => {
        if (!groups[task.topic]) {
            groups[task.topic] = [];
        }
        groups[task.topic].push(task);
        return groups;
    }, {});
}

// Toggle the Main Task status
function toggleMainTask(selectedTask, allTasks) {
    // Uncheck all tasks and set the selected one as main
    allTasks.forEach(task => {
        task.isMainTask = false;
    });
    selectedTask.isMainTask = true;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    renderTasks(allTasks);
}

// Remove a single task
function removeTask(taskName, reward, topic) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.name === taskName && task.reward === reward && task.topic === topic));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    const confirmation = confirm('Are you sure you want to clear all tasks?');
    if (confirmation) {
        localStorage.removeItem('tasks');
        renderTasks([]);
    }
});

// Import tasks popup
importBtn.addEventListener('click', () => {
    importPopup.style.display = 'block';
    importTextInput.value = ''; // Reset textarea content on opening
});

// Close the import popup
closePopup.addEventListener('click', () => {
    importPopup.style.display = 'none';
});

// Handle file import
importSubmitBtn.addEventListener('click', () => {
    const file = importFileInput.files[0];
    const text = importTextInput.value.trim();

    let tasks = [];

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            tasks = parseTasks(reader.result);
            updateLocalStorage(tasks);
        };
        reader.readAsText(file);
    } else if (text) {
        tasks = parseTasks(text);
        updateLocalStorage(tasks);
    }

    importPopup.style.display = 'none'; // Close the popup after import
});

// Parse task data
function parseTasks(data) {
    const taskRegex = /Task:\s*(.*?)\s*Reward:\s*(.*?)\s*Topic:\s*(.*?)\s*<BREAK>/gs;
    const tasks = [];
    let match;

    while ((match = taskRegex.exec(data)) !== null) {
        const taskName = match[1].trim();
        const reward = match[2].trim();
        const topic = match[3].trim();

        tasks.push({ name: taskName, reward: reward, topic: topic, isMainTask: false });
    }
    return tasks;
}

// Update localStorage and re-render
function updateLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

// script.js

// Request notification permission
if (Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.error('Notification permission denied.');
      }
    });
  }
  
  // Notify main task and reward
  function sendNotification(task, reward) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Nhiệm Vụ Tiếp Theo:', {
          body: `Tên: ${task}\n->Thưởng: ${reward}`,
          icon: './icon.png',
        });
      });
    }
  }
  
  // Check every 25 seconds for main task notification
  setInterval(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const mainTask = tasks.find((task) => task.isMainTask);
  
    if (mainTask) {
      sendNotification(mainTask.name, mainTask.reward);
    }
  }, 120000); //25 giây = 25 000 ms
  
