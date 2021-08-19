let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// MY ANSWER CODE
const fetchUrl = 'http://localhost:3000/toys'

function fetchToys() {
  fetch(fetchUrl)
  .then((res) => res.json())
  .then((toysData) => toysData.forEach(renderToys))
} 

const renderToys = (toysData) => {
  const divContainer = document.querySelector('#toy-collection')
 
  const toyCard = document.createElement('div')
  toyCard.className = 'card'

  const toyName = document.createElement('h2')
  toyName.textContent = toysData.name

  const toyImg = document.createElement('img')
  toyImg.src = toysData.image
  toyImg.className = 'toy-avatar'

  const toyLikes = document.createElement('p')
  toyLikes.textContent = `${toysData.likes} Likes`
  
  const toyBtn = document.createElement('button')
  toyBtn.className = 'like-btn'
  toyBtn.id = toysData.id
  toyBtn.textContent = 'Like <3'
  toyBtn.addEventListener('click', () => increaseLikes(toysData, toyLikes))
    
  toyCard.append(toyName, toyImg, toyLikes, toyBtn)
  divContainer.appendChild(toyCard)
}

function increaseLikes(toysData, toyLikes) {
  ++toysData.likes
  toyLikes.textContent = `${toysData.likes} Likes`
}

const toyForm = document.querySelector('.add-toy-form')

const createToy = (e) => {
  e.preventDefault()
  let toy = {
    name: e.target.name.value, 
    image: e.target.image.value ,
    likes: 0
  }
  renderToys(toy)
  toyForm.reset()
}

function invokeAllFunctions(){
  fetchToys()
  toyForm.addEventListener('submit', createToy)
}

invokeAllFunctions()
