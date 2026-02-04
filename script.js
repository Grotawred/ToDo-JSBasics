const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


function saveList(){
    const tasks = [...document.querySelectorAll('#taskList li')].map(li => li.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function loadList(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTask(taskText));
}

function addTask(taskText){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.className = 'deleteBtn';
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        li.remove();
        saveList();
    });

    li.textContent = taskText;
    li.appendChild(delBtn);
    taskList.appendChild(li);
    input.value = '';

}
loadList();

addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if(taskText){
        addTask(taskText);
        saveList();
        input.value = '';
    }
});
