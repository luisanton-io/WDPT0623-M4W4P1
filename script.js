// In questo script andremo a implementare il CRUD
// sull'endpoint dell'Agenda di EPICODE.

// https://striveschool-api.herokuapp.com/api/agenda
const ENDPOINT = "https://striveschool-api.herokuapp.com/api/agenda"

async function getAgenda() {

    // throw new Error("Boom!")

    const tableBody = document.querySelector("tbody")
    try {
        tableBody.innerHTML = /*html*/`
            <tr>
                <td colspan="6">
                    <div class="d-flex my-5">
                        <div class="spinner-border mx-auto" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </td>
            </tr>
        `

        const response = await fetch(ENDPOINT)

        const data = await response.json()
        return data

    } catch (error) {
        console.log('here')
        console.error(error)
        tableBody.innerHTML = error.message
    }
}


function displayAgenda(entries) {
    const tableBody = document.querySelector("tbody")

    tableBody.innerHTML = entries.map((entry, i) => /*html*/`
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${entry.name}</td>
            <td>${entry.description}</td>
            <td>${entry.price}</td>
            <td>${entry.time}</td>
            <td>
                <a href="/event.html?id=${entry._id}" class="btn btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <button class="btn btn-outline-danger" onclick="handleDelete('${entry._id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join("")
}

async function handleDelete(id) {

    // Ci assicuriamo che l'utente confermi la cancellazione
    // È normale per le operazioni distruttive assicurarsi di avere informato l'utente
    if (!confirm("Sei sicuro di voler cancellare questo evento?")) return

    const response = await fetch(ENDPOINT + '/' + id, {
        method: "DELETE"
    })

    if (response.ok) {
        alert("Evento cancellato!")
        displayAgenda(await getAgenda())
    }
}

async function handleFilter(filterString) {
    const filterType = document.querySelector('select').value // "name" or "description"

    // recupero i dati...
    const events = await getAgenda()

    displayAgenda(events.filter(
        event => event[filterType].toLowerCase().includes(filterString.toLowerCase())
        // event => event["name"].includes(filterString)
        // event => event["description"].includes(filterString)
    ))
}

window.onload = async () => {
    displayAgenda(await getAgenda())
}