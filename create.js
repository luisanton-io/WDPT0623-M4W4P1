
const ENDPOINT = "https://striveschool-api.herokuapp.com/api/agenda"


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
    // di creare la nostra risorsa.
    const response = await fetch(ENDPOINT, {
        method: "POST", // specifichiamo il metodo della richiesta, POST
        headers: {
            "Content-Type": "application/json", // specifichiamo il tipo di contenuto
        },
        body: JSON.stringify({                 // alleghiamo il contenuto vero e proprio
            name, description, price, time
        })
    })

    if (response.ok) {
        alert("Inserimento avvenuto con successo!")
        window.location.assign("/index.html")
    } else {
        // bisognerebbe mostrare un messaggio di errore.
        alert("Errore nell'inserimento. Verifica la network tab")
    }

}