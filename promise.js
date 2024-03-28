// Promises
// Una promessa è un contenitore del cui contenuto non conosciamo ancora il valore.
// Quando una promessa si risolve, abbiamo la possibilità di gestire il valore risolto con una funzione di callback.
// La "promessa" generalmente attende che altre operazioni in background siano concluse.
// Quando finalmente abbiamo un valore che viene risolto, allora la nostra promessa si definisce "fulfilled".
// Talvolta può capitare che all'interno della promessa ci sia un errore. In tal caso la promessa risulterà essere "rejected".

// promise
//     .then(
//         // callback fx
//         function (response) {
//         }
//     ) // gestiamo il valore risolto della nostra promessa.
//     .catch(
//         // callback fx
//         function (error) {
//         }
//     )