const openBtn = document.querySelector('#dialog__open');
const closeBtn = document.querySelector('#dialog__close');
const modal = document.querySelector('dialog');
const card = document.querySelector('.a');
const ul = document.querySelector('ul');

// dialog eventlistners
openBtn.addEventListener('click', ()=> {
    modal.showModal();
});

modal.addEventListener("close", ()=>{
    if (modal.returnValue === 'save') extractFormData();
    modal.querySelector('form').reset();
});

closeBtn.addEventListener('click', (e)=> {
    modal.close();
});

ul.addEventListener('click', e => {
  if (e.target.closest('.card__remove')) {
    removeBook(e);
  }
});

ul.addEventListener('click', e => {
  if (e.target.closest('.card__checkbox')) {
    cardColorChange(e);
  }
});

// extract data from form
function extractFormData() {
    const form = modal.querySelector('form');
    const data = new FormData(form);
    const formData = Object.fromEntries(data.entries());

    form.reset();
    addBookToDOM(formData);
}

//book array
const myLibrary = [];

// Book class
class Book {
    constructor(title, author, pages, read) {
        this.cardDeepCopy = card.cloneNode(true);
        this.id = crypto.randomUUID();
        this.cardDeepCopy.classList = `card ${this.id}`;
        this.cardDeepCopy.querySelector('.title').textContent += title;
        this.cardDeepCopy.querySelector('.author').textContent += author;
        this.cardDeepCopy.querySelector('.pages').textContent += pages;
        this.cardDeepCopy.querySelector('.card__checkbox').checked = read == 'on'? true:false;
    }

    addBook () {
        card.before(this.cardDeepCopy);
        myLibrary.push(this.cardDeepCopy);
    }
}

//AddBookToLibrary & remove 
function addBookToDOM(formData) {
    const book = new Book (formData.book_title, formData.book_author, formData.book_pages, formData.book_read);
    book.addBook();
}   

function removeBook(e) {
  const itemToRemove = e.target.closest('.card');
  const index = myLibrary.indexOf(itemToRemove);
  myLibrary.splice(index, 1);
  itemToRemove.remove();
}

// transition card
function cardColorChange(e) {
    if (e.target.checked) {
        e.target.parentElement.parentElement.style.background = "rgba(0,0,0,0.4)";
        e.target.nextElementSibling.style.background = 'rgba(0,0,0,0.2)'; 
    }
    else {
        e.target.parentElement.parentElement.style.background ='linear-gradient(to right, rgb(203, 203, 230), rgb(166, 110, 195))';
        e.target.nextElementSibling.style.background = '#ccc';
    }
} 