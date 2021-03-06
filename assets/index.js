/*
*   BluDood <bludood@bludood.com>
*   https://bludood.com
*   Now you know who to blame if you hate the code ;)
*/

// API address
var api = "https://FreshCydiaAPI.bludood.repl.co/parcility"

// PullToRefresh https://www.boxfactura.com/pulltorefresh.js/
PullToRefresh.init({
    mainElement: 'body',
    onRefresh() {
      window.location.reload();
    }
});

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
    card.innerHTML = `<div class="filler"></div> <div class="install"> <img src="${icon}" alt="Icon for repo ${name}"> <h3 class="title">${name}</h3> <div class="filler"></div> <a href="cydia://url/https://cydia.saurik.com/api/share#?source=${repo}" target="_blank" class="get"> <span>ADD</span> </a> </div>`
    document.querySelector(".popular").append(card)
}

// Function for displaying iOS-styled alerts
function iOSalert(option, title, content, buttons) {
    if (option === 'add') {
        const btnArray = []
        buttons.forEach(item => {
            if (item.newtab) var newtab = ' target="_blank"'
            if (item.onclick) var onclick = ` onclick="${item.onclick}"`
            btnArray.push(`<a href="${item.link}"${newtab || ''}${onclick || ''}>${item.name}</a>`)
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
    iOSalert("add", 'Notice', `Add ${url} to install ${name}!<br>If you already have this repository added, you can tap "Install Tweak".`, [
        {
            "name": "Add Repository",
            "link": `cydia://url/https://cydia.saurik.com/api/share#?source=${url}`,
            "newtab": true,
            "onclick": `saveRepo('${url}', '${id}')`
        },
        {
            "name": "Install Tweak",
            "link": `cydia://package/${id}`,
            "newtab": true
        }
    ])
}

// https://stackoverflow.com/a/69879862/17115986
function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
// Since Cydia refreshes the home page after adding a tweak,
// we need to set a temporary cookie to install the tweak after the refresh
if (getCookie('cydia')) {
    if (getCookie('cydia').split(',')[0] === 'addrepoTrue') {
        iOSalert('add', 'Installing Tweak', 'You were installing a tweak! Please tap "Install Tweak" to finish installing.', [
            {
                "name": "Install Tweak",
                "link": `cydia://package/${getCookie('cydia').split(',')[1]}`,
                "newtab": true
            }
        ])
        document.cookie = 'cydia=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    }
}
async function saveRepo(repo, id) {
    const current = new Date()
    current.setDate(current.getDate() + 1)
    document.cookie = `cydia=addrepoTrue,${id}; expires=${current.toUTCString()}`;
}

async function showDebug() {
    var section = document.querySelector('.debug')
    var agentSection = document.querySelector('.debug-useragent')
    var errorSection = document.querySelector('.debug-errors')
    var headerSection = document.querySelector('.debug-headers')
    agentSection.innerText = navigator.userAgent
    errorSection.innerText = errors
    headerSection.innerText = headers

    if (section.style.display === 'none') {
        section.style.display = 'block'
    } else[
        section.style.display = 'none'
    ]
}

// Set the date for the header
var now = new Date()

var date = now.toLocaleDateString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
})

document.querySelector('.h-date').innerText = date

// Display errors in the debug element
var errors = []
window.onerror = function (msg, source, lineNo, columnNo, error) {
    errors.push(msg)
    return false;
}

var headers = []
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
headers.push(req.getAllResponseHeaders())