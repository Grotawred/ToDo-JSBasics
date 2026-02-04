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
    const div = document.createElement('div');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';
    editBtn.textContent = 'Edit';
    delBtn.className = 'deleteBtn';
    delBtn.textContent = 'Delete';

    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', taskText);
        if(newText && newText.trim()){
            li.firstChild.textContent = newText.trim();
            saveList();
        }
    });
    delBtn.addEventListener('click', () => {
        li.remove();
        saveList();
    });

    li.textContent = taskText;
    div.appendChild(editBtn);
    div.appendChild(delBtn);
    li.appendChild(div);
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
