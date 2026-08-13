const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const taskList = document.querySelector('#taskList');
const modal = document.querySelector('#signupModal');
const emailInput = document.querySelector('#email');
const formMessage = document.querySelector('#formMessage');

function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

function updateProgress() {
  const tasks = [...taskList.querySelectorAll('.task')];
  const complete = tasks.filter((task) => task.classList.contains('done')).length;
  const percentage = tasks.length ? Math.round((complete / tasks.length) * 100) : 0;
  document.querySelector('.progress-text strong').textContent = `${percentage}%`;
  document.querySelector('.progress-track span').style.width = `${percentage}%`;
}

function addTask(name) {
  const task = document.createElement('div');
  task.className = 'task';
  task.innerHTML = `<button class="check" type="button" aria-label="Mark ${name} complete"></button><div><strong></strong><small>Just added</small></div><span class="tag blue">New</span><button class="delete-task" type="button" aria-label="Delete ${name}">×</button>`;
  task.querySelector('strong').textContent = name;
  taskList.append(task);
  updateProgress();
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelector('#addTask').addEventListener('click', () => {
  const taskName = window.prompt('What would you like to add to your day?');
  if (taskName && taskName.trim()) addTask(taskName.trim());
});

taskList.addEventListener('click', (event) => {
  const task = event.target.closest('.task');
  if (!task) return;
  if (event.target.closest('.check')) {
    task.classList.toggle('done');
    const check = task.querySelector('.check');
    check.textContent = task.classList.contains('done') ? '✓' : '';
    updateProgress();
  }
  if (event.target.closest('.delete-task')) {
    task.remove();
    updateProgress();
  }
});

document.querySelector('.signup-button').addEventListener('click', () => {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  emailInput.focus();
});

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.querySelector('#signupForm').addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = `Thanks! Your welcome email will be sent to ${emailInput.value}.`;
  event.currentTarget.reset();
});

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); closeModal(); } });
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
