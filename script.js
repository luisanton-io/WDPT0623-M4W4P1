// In questo script andremo a implementare il CRUD
// sull'endpoint dell'Agenda di EPICODE.

// https://striveschool-api.herokuapp.com/api/agenda
const ENDPOINT = "https://striveschool-api.herokuapp.com/api/agenda"

async function getAgenda() {

    // throw new Error("Boom!")

    try {
        const response = await fetch(ENDPOINT)

        const data = await response.json()
        return data

    } catch (error) {
        console.log('here')
        console.error(error)
    }
}


function displayAgenda(entries) {
    const tableBody = document.querySelector("tbody")

    tableBody.innerHTML = entries.map((entry, i) => /*html*/`
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${entry._id}</td>
            <td>${entry.name}</td>
            <td>${entry.description}</td>
            <td>${entry.price}</td>
            <td>${entry.time}</td>
        </tr>
    `).join("")
}

window.onload = async () => {
    displayAgenda(await getAgenda())
}