/*
*   BluDood <bludood@bludood.com>
*   https://bludood.com
*   Now you know who to blame if you hate the code ;)
*/

// API address
var api = "http://127.0.0.1:8080/parcility"

/*
*   Getting Data
*/
async function getData() {
    // Get featured packages from the API
    const featured = (await fetch(api)).json()
    // Only get first 5 items
    const featuredArr = (await featured).featured.slice(0, 5)
    document.querySelector(".featured").innerHTML = ''
    featuredArr.forEach(element => {
        addFeatured(element.name, element.icon, element.banner)
    })

    // Get popular repos from the API
    const popular = (await fetch(api)).json()
    const popularArr = (await popular).popular.slice(0, 10)
    document.querySelector(".popular").innerHTML = ''
    popularArr.forEach(element => {
        addRepos(element.name, element.icon, element.repo)
    })
}

// Run the getData function
getData()

// Add featured packages to the page
async function addFeatured(name, icon, banner) {
    const card = document.createElement('div')
    card.classList.add("card")
    card.style.backgroundImage = `url(${banner})`
    card.innerHTML = ` <div class="filler"></div> <div class="install"> <img src="${icon}" alt="Icon for package ${name}"> <h3 class="title">${name}</h3> <div class="filler"></div> <a href="#" class="get"> <span>GET</span> </a> </div>`
    document.querySelector(".featured").append(card)
}

// Add popular repos to the page
async function addRepos(name, icon, repo) {
    const card = document.createElement('div')
    card.classList.add("card", "small")
    card.innerHTML = `<div class="filler"></div> <div class="install"> <img src="${icon}" alt="Icon for repo ${name}"> <h3 class="title">${name}</h3> <div class="filler"></div> <a href="cydia://url/https://cydia.saurik.com/api/share#?source=${repo}" class="get"> <span>ADD</span> </a> </div>`
    document.querySelector(".popular").append(card)
}

/*
function showAlert() {
    var notification = document.querySelector(".notification")
    if (notification.classList.contains("shown")) {
        notification.classList.remove("shown")
    } else {
        notification.classList.add("shown")
    }
    return false
}
document.querySelector('.notification').addEventListener('click', function (event) {
    const array = []
    for (i in event.path) {
        array.push(event.path[i].className)
    }
    if (!array.join(" ").includes("inner")) {
        showAlert()
    }
})
*/