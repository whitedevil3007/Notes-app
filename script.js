const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `<div class="notes">
      <div class="tools">
        <button class="edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="trash">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="main ${text ? '' : 'hidden'}"></div>
      <textarea class='${text ? 'hidden' : ''}'></textarea>
    </div>`;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.trash');
  // const add = document.querySelector('.add');

  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });
  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    // or
    // main.innerHTML = textArea.value;

    updateLS();
  });

  document.body.appendChild(note);
}

// const notesEl = document.querySelector('.notes');
function updateLS() {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}
