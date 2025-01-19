document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load saved todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render existing todos
    todos.forEach(todo => addTodoToDOM(todo));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const todoText = input.value.trim();
        
        if (todoText) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            // Add to array
            todos.push(newTodo);
            
            // Save to localStorage
            localStorage.setItem('todos', JSON.stringify(todos));
            
            // Add to DOM
            addTodoToDOM(newTodo);
            
            // Clear input
            input.value = '';
        }
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#888';
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            // Remove from array
            todos = todos.filter(t => t.id !== todo.id);
            
            // Update localStorage
            localStorage.setItem('todos', JSON.stringify(todos));
            
            // Remove from DOM
            li.remove();
        });
        
        span.addEventListener('click', function() {
            // Toggle completed status
            todo.completed = !todo.completed;
            
            // Update localStorage
            localStorage.setItem('todos', JSON.stringify(todos));
            
            // Update style
            if (todo.completed) {
                span.style.textDecoration = 'line-through';
                span.style.color = '#888';
            } else {
                span.style.textDecoration = 'none';
                span.style.color = '#333';
            }
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }
});
