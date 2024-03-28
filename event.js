
const ENDPOINT = "https://striveschool-api.herokuapp.com/api/agenda"

// Recuperiamo l'id dall'URL
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
// Se abbiamo un id (ovvero se id è truthy, allora siamo in modifica)
const isEdit = !!id

console.table({ id, isEdit })

window.onload = async () => {

    // Se non c'è l'id, siamo in creazione di un nuovo evento
    if (!id) return

    // Se l'id c'è, il titolo diventa "Edit"
    document.querySelector('h1').innerText = 'Edit Event'

    // ...andiamo a recuperare l'evento dal server
    const response = await fetch(ENDPOINT + '/' + id)
    const data = await response.json()

    // ...e infine andiamo a precompilare il nostro form 
    document.querySelector("#name").value = data.name
    document.querySelector("#description").value = data.description
    document.querySelector("#price").value = data.price
    document.querySelector("#time").value = data.time.split('.')[0]

}

async function handleSubmit(event) {
    event.preventDefault()

    // Andiamo a recuperare i dati che l'utente ha inserito nei vari campi

    // Sintassi più avanzata: 
    // const [name, description, price, time] = ["#name", "#description", "#price", "#time"].map(
    //     id => document.querySelector(id).value
    // )

    // Oppure più semplicemente, recuperiamo il valore di ciascun campo in questo modo:
    const name = document.querySelector("#name").value
    const description = document.querySelector("#description").value
    const price = document.querySelector("#price").value
    const time = document.querySelector("#time").value

    // Qui invece inoltriamo la richiesta al server, che si occuperà
    // di creare o modificare la nostra risorsa.

    // Se non stiamo modificando un evento (e quindi siamo in creazione) dobbiamo usare l'endpoint senza id
    // Se stiamo modificando un evento dobbiamo aggiungere l'id che identifica l'evento da modificare all'url dell'endpoint
    const endpoint = !isEdit ? ENDPOINT : ENDPOINT + '/' + id

    const response = await fetch(endpoint,
        {
            method: !isEdit ? "POST" : "PUT", // specifichiamo il metodo della richiesta, POST per la creazione, PUT per la modifica
            headers: {
                "Content-Type": "application/json", // specifichiamo il tipo di contenuto
            },
            body: JSON.stringify({                 // alleghiamo il contenuto vero e proprio
                name, description, price, time
            })
        }
    )

    if (response.ok) {
        const message = "Evento " + (isEdit ? "modificato" : "aggiunto") + " con successo!"
        alert(message)
        window.location.assign("/index.html")
    } else {
        const { error } = await response.json()
        switch (error.code) {
            case 11000:
                return alert("Errore: il tuo evento ha un nome già esistente.")
            default:
                return alert("Errore nella richiesta. Verifica la network tab")
        }
    }

}
