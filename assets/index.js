/*
*   BluDood <bludood@bludood.com>
*   https://bludood.com
*   Now you know who to blame if you hate the code ;)
*/

// API address
var api = "https://FreshCydiaAPI.bludood.repl.co/parcility"

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
        addFeatured(element.name, element.icon, element.banner, element.repo, element.id)
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
async function addFeatured(name, icon, banner, repo, id) {
    const card = document.createElement('div')
    card.classList.add("card")
    card.style.backgroundImage = `url(${banner})`
    card.innerHTML = ` <div class="filler"></div> <div class="install"> <img src="${icon}" alt="Icon for package ${name}"> <h3 class="title">${name}</h3> <div class="filler"></div> <a href="" onclick="repoPrompt('${name}', '${repo}', '${id}'); return false" class="get"> <span>GET</span> </a> </div>`
    document.querySelector(".featured").append(card)
}

// Add popular repos to the page
async function addRepos(name, icon, repo) {
    const card = document.createElement('div')
    card.classList.add("card", "small")
    card.innerHTML = `<div class="filler"></div> <div class="install"> <img src="${icon}" alt="Icon for repo ${name}"> <h3 class="title">${name}</h3> <div class="filler"></div> <a href="cydia://url/https://cydia.saurik.com/api/share#?source=${repo}" class="get"> <span>ADD</span> </a> </div>`
    document.querySelector(".popular").append(card)
}

// Function for displaying iOS-styled alerts
function iOSalert(option, title, content, buttons) {
    if (option === 'add') {
        const btnArray = []
        buttons.forEach(item => {
            btnArray.push(`<a href="${item.link}">${item.name}</a>`)
        });
        const notification = document.createElement('div')
        notification.classList.add('notification')
        notification.id = "notification"
        notification.innerHTML = `<div class="inner"> <h2 class="title">${title}</h2> <span class="content">${content}</span> <div class="filler"></div> <div class="actions"> ${btnArray.join(" ")} <a href="" onclick="iOSalert('remove'); return false" class="default">Close</a> </div> </div>`
        document.body.append(notification)
        setTimeout(() => {
            document.getElementById('notification').classList.add('shown')
        }, 50);
    } else {
        document.getElementById('notification').classList.remove('shown')
        setTimeout(() => {
            document.getElementById('notification').remove()
        }, 250);
    }
}

// Prompt for adding a repository when adding a tweak, using the iOSalert function
async function repoPrompt(name, url, id) {
    if (localStorage.getItem('directGet') === 'true') return window.location = `cydia://package/${id}`
    iOSalert("add", 'Notice', `Add ${url} to install ${name}!`, [{
        "name": "Add Repository and Open",
        "link": `javascript:getTweak('${url}', '${id}')`
    },
    {
        "name": "Do not show this again",
        "link": "javascript:localStorage.setItem('directGet', 'true'); iOSalert('remove')"
    }])
}

// Add a repo and get a tweak
async function getTweak(url, id) {
    window.location = `cydia://url/https://cydia.saurik.com/api/share#?source=${url}`
    setTimeout(() => {
        window.location = `cydia://package/${id}`
        iOSalert('remove')
    }, 1000);
}

// Set the date for the header
var now = new Date()

var date = now.toLocaleDateString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
})

document.querySelector('.h-date').innerText = date