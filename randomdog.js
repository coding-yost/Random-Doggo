// DogAPI Endpoints
const random_url =  'https://dog.ceo/api/breeds/image/random'
const breed_list_url = 'https://dog.ceo/api/breeds/list/all'

// Other data
if(sessionStorage.getItem("breed_key") === undefined) {
    let breed_selection = "random"
    sessionStorage.setItem("breed_key", breed_selection)
}


// Randomly generate a dog photo from DogAPI stored in img id dog-img
const img_container = document.getElementById("container") 
const dog_img = document.createElement('img')
dog_img.id = "dog-img"
dog_img.alt = "A random picture of a good buddy."
fetch(random_url)
.then((result) => result.json())
.then((result) => {
    dog_img.src = result.message 
    img_container.appendChild(dog_img)
})


// Generate a list of all breeds
const breed_container = document.getElementById("breeds-container")
fetch(breed_list_url)
.then((result) => result.json())
.then((result) => {
    breed_list = Object.keys(result.message)
    breed_list.forEach((item) => {
        createListItems(item)
    })
    createListItems("random")
})

// Get random img of random breed or specific
function getBreedImg(breed) {
    if(breed_selection === "" || breed_selection === "random") {
        fetch(random_url)
        .then((result) => result.json())
        .then((result) => {
            dog_img.src = result.message 
            img_container.appendChild(dog_img)
        })
    } else {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((result) => result.json())
        .then((result) => dog_img.src=result.message)
    }
}

function createListItems(item) {
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.innerText = item
    li.appendChild(button)
    breed_container.appendChild(li)
    button.onclick = () => {
        breed_selection = item
        sessionStorage.setItem("breed_key", breed_selection)
        getBreedImg(item);
    }
}
setTimeout(() => {
    window.location.reload(1)
    getBreedImg(sessionStorage.getItem("breed_key"))
}, 8000);