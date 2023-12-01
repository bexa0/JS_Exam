const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')
wrapper.classList.add('block')

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`
    https://api.github.com/users/${inputsValue.name}
  `);

  if (response.ok) {
    const data = await response.json();
    wrapper.appendChild(createProfileEl(data)) // appendChild () добавляет узел в качестве последнего дочернего узла в указанный родительский элемент
    mainEl.appendChild(wrapper);
    inputEl.value = '';
  } else {
    alert("Пользователь не найден")
  }
})

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name') // setAttribute () объекта Element позволяет добавить новый атрибут

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit'); // setAttribute () объекта Element позволяет добавить новый атрибут
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
  const element = document.createElement('div');
  element.classList.add('profile');
  element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url}>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
  `
  element.appendChild(createDeleteBtnEl())
  return element;
}

function createDeleteBtnEl() {
  const element = document.createElement('button');
  element.classList.add('delete-button');
  element.innerText = "Удалить";
  element.addEventListener('click', (e) => {
    wrapper.innerHTML = ''
  })

  return element
}