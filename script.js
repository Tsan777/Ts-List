// DOM Elements
const taskInput = document.getElementById('task-name');
const topicInput = document.getElementById('topic');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
// Load tasks from LocalStorage on page load

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
  
  // Notify main task
  function sendNotification(task) {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Nhiệm Vụ Tiếp Theo:', {
          body: `Tên: ${task}\n`,
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
      sendNotification(mainTask.name);
    }
  }, 120000); //25 giây = 25 000 ms
  
// Lấy các phần tử DOM
const todoInput = document.getElementById('todo-name');
const timeSelect = document.getElementById('time');
const addTodoBtn = document.getElementById('add-todo');
const morningTodoList = document.getElementById('morning-todo-list');
const afternoonTodoList = document.getElementById('afternoon-todo-list');
const eveningTodoList = document.getElementById('evening-todo-list');

// Tải danh sách Todo từ LocalStorage khi trang được tải
document.addEventListener('DOMContentLoaded', loadTodos);

// Hàm tải và hiển thị Todo
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos(todos);
}

// Hàm hiển thị Todo theo thời gian
function renderTodos(todos) {
    // Xóa danh sách hiện tại
    morningTodoList.innerHTML = '';
    afternoonTodoList.innerHTML = '';
    eveningTodoList.innerHTML = '';

    // Lặp qua từng Todo và phân loại
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.name}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
        `;

        // Thêm Todo vào danh sách tương ứng
        if (todo.time === 'morning') {
            morningTodoList.appendChild(li);
        } else if (todo.time === 'afternoon') {
            afternoonTodoList.appendChild(li);
        } else if (todo.time === 'evening') {
            eveningTodoList.appendChild(li);
        }
    });
}

// Hàm xóa Todo
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1); // Xóa Todo tại vị trí index
    localStorage.setItem('todos', JSON.stringify(todos)); // Cập nhật LocalStorage
    renderTodos(todos); // Hiển thị lại danh sách
}

// Thêm sự kiện click cho nút "Add Todo"
addTodoBtn.addEventListener('click', () => {
    const todoName = todoInput.value.trim();
    const todoTime = timeSelect.value;

    // Kiểm tra nếu trường nhập không trống
    if (todoName) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ name: todoName, time: todoTime }); // Thêm Todo mới
        localStorage.setItem('todos', JSON.stringify(todos)); // Lưu vào LocalStorage
        todoInput.value = ''; // Xóa giá trị trong ô input
        renderTodos(todos); // Hiển thị lại danh sách
    } else {
        alert('Please enter a todo name!'); // Cảnh báo nếu không nhập
    }
});

// Lấy các phần tử DOM
const goalInput = document.getElementById('goal-name');
const addGoalBtn = document.getElementById('add-goal');
const goalList = document.getElementById('goal-list');

// Thêm sự kiện click cho nút Add Goal
addGoalBtn.addEventListener('click', () => {
    const goalName = goalInput.value.trim();

    // Kiểm tra nếu trường nhập không trống
    if (goalName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${goalName}</span>
            <button onclick="deleteGoal(this)">Delete</button>
        `;
        goalList.appendChild(li);
        goalInput.value = ''; // Xóa giá trị input sau khi thêm
    } else {
        alert('Please enter a goal!');
    }
});

// Hàm xóa goal
function deleteGoal(button) {
    const li = button.parentElement;
    li.remove();
}

// Lấy các phần tử DOM
const queueInput = document.getElementById('queue-name');
const addQueueBtn = document.getElementById('add-queue');
const queueList = document.getElementById('queue-list');

// Thêm sự kiện click cho nút Add Queue
addQueueBtn.addEventListener('click', () => {
    const queueName = queueInput.value.trim();

    // Kiểm tra nếu trường nhập không trống
    if (queueName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${queueName}</span>
            <button onclick="deleteQueue(this)">Delete</button>
        `;
        queueList.appendChild(li);
        queueInput.value = ''; // Xóa giá trị input sau khi thêm
    } else {
        alert('Please enter a task for the queue!');
    }
});

// Hàm xóa mục trong queue
function deleteQueue(button) {
    const li = button.parentElement;
    li.remove();
}

function loadTodoFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found: ' + fileName);
            }
            return response.text();
        })
        .then(data => {
            // Phân loại nội dung thành các phần morning, afternoon, evening
            const todoData = parseTodoFile(data);

            // Gắn nội dung vào các danh sách
            updateTodoList('morning-todo-list', todoData.morning);
            updateTodoList('afternoon-todo-list', todoData.afternoon);
            updateTodoList('evening-todo-list', todoData.evening);
        })
        .catch(error => {
            console.error('Error loading todo file:', error);
        });
}

function parseTodoFile(data) {
    // Phân tích dữ liệu từ tệp
    const lines = data.split('\n');
    const todoData = { morning: [], afternoon: [], evening: [] };
    let currentSection = null;

    lines.forEach(line => {
        if (line.startsWith('morning:')) {
            currentSection = 'morning';
        } else if (line.startsWith('afternoon:')) {
            currentSection = 'afternoon';
        } else if (line.startsWith('evening:')) {
            currentSection = 'evening';
        } else if (currentSection && line.trim()) {
            todoData[currentSection].push(line.trim());
        }
    });

    return todoData;
}

function updateTodoList(listId, items) {
    const listElement = document.getElementById(listId);
    if (!listElement) {
        console.error(`Element with id "${listId}" not found.`);
        return;
    }

    // Xóa nội dung cũ
    listElement.innerHTML = '';

    // Thêm các mục mới
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });
}

// Gọi hàm tải tệp khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadTodoFile('./todo.txt');
});

// Hàm load tasks từ file task.txt
function loadTasksFromFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found: ' + fileName);
            }
            return response.text();
        })
        .then(data => {
            // Phân tích dữ liệu từ task.txt
            const lines = data.trim().split('\n');
            const tasks = lines.map(line => {
                const [topic, main, name] = line.split(',');
                return {
                    topic: topic === '0.None' ? 'None' : topic,
                    isMainTask: main === '1',
                    name: name.trim()
                };
            });

            // Lưu tasks vào localStorage và render
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
}

// Hàm render tasks ra giao diện
function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current tasks

    // Group tasks by topic
    const groupedTasks = groupTasksByTopic(tasks);

    // Render mỗi group
    Object.keys(groupedTasks).forEach(topic => {
        const topicGroup = document.createElement('div');
        topicGroup.classList.add('topic-group');

        // Thêm tiêu đề topic
        const topicTitle = document.createElement('h2');
        topicTitle.textContent = topic;
        topicGroup.appendChild(topicTitle);

        // Render tasks trong topic
        groupedTasks[topic].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;

            // Tạo checkbox cho Main Task
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.isMainTask;

            // Checkbox change event
            checkbox.addEventListener('change', () => {
                toggleMainTask(task, tasks);
            });

            li.prepend(checkbox);

            // Nút delete
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => {
                removeTask(task.name, task.topic);
            };

            li.appendChild(delBtn);
            topicGroup.appendChild(li);
        });

        taskList.appendChild(topicGroup);
    });
}

// Group tasks theo topic
function groupTasksByTopic(tasks) {
    return tasks.reduce((groups, task) => {
        if (!groups[task.topic]) {
            groups[task.topic] = [];
        }
        groups[task.topic].push(task);
        return groups;
    }, {});
}

// Toggle trạng thái Main Task
function toggleMainTask(selectedTask, allTasks) {
    allTasks.forEach(task => {
        task.isMainTask = false;
    });
    selectedTask.isMainTask = true;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    renderTasks(allTasks);
}

// Xóa một task
function removeTask(taskName, topic) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.name === taskName && task.topic === topic));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

// Load tasks khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromFile('./task.txt');
});

// Hàm load goals từ file
function loadGoalsFromFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found: ' + fileName);
            }
            return response.text();
        })
        .then(data => {
            // Phân tích dữ liệu từ file goal
            const lines = data.trim().split('\n');
            const goals = lines.map(line => line.trim());

            // Lưu goals vào localStorage và render
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals(goals);
        })
        .catch(error => {
            console.error('Error loading goals:', error);
        });
}

// Hàm render goals ra giao diện
function renderGoals(goals) {
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = ''; // Xóa nội dung hiện tại

    // Tạo danh sách các goals
    goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;

        // Nút delete
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
            removeGoal(goal);
        };

        li.appendChild(delBtn);
        goalList.appendChild(li);
    });
}

// Hàm thêm goal mới
function addGoal() {
    const goalInput = document.getElementById('goal-name');
    const newGoal = goalInput.value.trim();

    if (newGoal) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(newGoal);

        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals(goals);

        // Reset input
        goalInput.value = '';
    }
}

// Hàm xóa một goal
function removeGoal(goalToRemove) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals = goals.filter(goal => goal !== goalToRemove);

    // Lưu lại goals và render
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals(goals);
}

// Load goals khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadGoalsFromFile('./goal.txt'); // Đường dẫn tới file goal.txt

    // Gắn sự kiện cho nút Add Goal
    document.getElementById('add-goal').addEventListener('click', addGoal);
});
// Hàm load queues từ file


// Hàm load thông tin từ file info.txt
function loadInfoFromFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found: ' + fileName);
            }
            return response.text();
        })
        .then(data => {
            // Phân tích dữ liệu từ file info.txt
            const info = parseInfoData(data);

            // Cập nhật thông tin vào HTML
            updateInfo(info);
            // Cập nhật biểu đồ
            updateCharts(info);
        })
        .catch(error => {
            console.error('Error loading info:', error);
        });
}

// Hàm phân tích dữ liệu info.txt
function parseInfoData(data) {
    const lines = data.trim().split('\n');
    const info = {};

    lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        if (key === 'bar' || key === 'pie') {
            info[key] = JSON.parse(value);
        } else {
            info[key] = value;
        }
    });

    return info;
}

// Hàm cập nhật thông tin vào các label
function updateInfo(info) {
    document.querySelector('label[for="name"]').textContent = info.name;
    document.querySelector('label[for="money"]').textContent = info.money;
    document.querySelector('label[for="level"]').textContent = `Lv ${info.level}`;
    
    const progressBar = document.getElementById('current-progress');
    progressBar.value = info.value * 100;
}

// Hàm cập nhật biểu đồ
function updateCharts(info) {
    // Biểu đồ cột
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Tasks Completed',
                data: info.bar,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(100, 200, 150, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(100, 200, 150, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Tasks Completed During the Week'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Biểu đồ tròn
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Work', 'Study', 'Exercise', 'Leisure'],
            datasets: [{
                label: 'Daily Activities',
                data: info.pie,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribution of Daily Activities'
                }
            }
        }
    });
}

// Gắn sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadInfoFromFile('./info.txt'); // Đường dẫn tới file info.txt
});
function loadQueuesFromFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found: ' + fileName);
            }
            return response.text();
        })
        .then(data => {
            // Phân tích dữ liệu từ file queue
            const queues = data.trim().split('\n');

            // Render danh sách queues
            renderQueues(queues);
        })
        .catch(error => {
            console.error('Error loading queues:', error);
        });
}

// Hàm render queues ra giao diện
function renderQueues(queues) {
    const queueList = document.getElementById('queue-list');
    queueList.innerHTML = ''; // Xóa nội dung hiện tại

    // Tạo danh sách các queues
    queues.forEach(queue => {
        const li = document.createElement('li');
        li.textContent = queue;

        queueList.appendChild(li);
    });
}

// Hàm thêm queue mới
function addQueue() {
    const queueInput = document.getElementById('queue-name');
    const newQueue = queueInput.value.trim();

    if (newQueue) {
        const queueList = document.getElementById('queue-list');

        // Thêm vào danh sách hiển thị
        const li = document.createElement('li');
        li.textContent = newQueue;
        queueList.appendChild(li);

        // Reset input
        queueInput.value = '';
    }
}

// Gắn sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadQueuesFromFile('./queue.txt'); // Đường dẫn tới file queue.txt

    // Gắn sự kiện cho nút Add Queue
    document.getElementById('add-queue').addEventListener('click', addQueue);
});



document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-name');
    const addNoteButton = document.getElementById('add-note');
    const noteList = document.getElementById('note-list');
  
    // Hàm tải ghi chú từ Local Storage
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach(note => addNoteToList(note));
    }
  
    // Hàm lưu ghi chú vào Local Storage
    function saveNote(note) {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    // Hàm xóa ghi chú khỏi Local Storage
    function deleteNoteFromStorage(note) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes = notes.filter(n => n !== note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    // Hàm thêm ghi chú vào danh sách hiển thị
    function addNoteToList(note) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = note;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Xóa';
      deleteButton.addEventListener('click', function() {
        noteList.removeChild(li);
        deleteNoteFromStorage(note);
      });
      li.appendChild(span);
      li.appendChild(deleteButton);
      noteList.appendChild(li);
    }
  
    // Xử lý sự kiện khi nhấn nút "Thêm ghi chú"
    addNoteButton.addEventListener('click', function() {
      const note = noteInput.value.trim();
      if (note) {
        addNoteToList(note);
        saveNote(note);
        noteInput.value = '';
        noteInput.focus();
      }
    });
  
    // Tải các ghi chú khi trang được tải
    loadNotes();
  });
  