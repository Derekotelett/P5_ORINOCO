//---------------récupération des données du local storage------------------//
//récupération de orderId
let orderId = localStorage.getItem("orderId");
console.log(orderId);
//récupération du prix total
let additionPrice = localStorage.getItem("additionPrice");
console.log(additionPrice);

//-------------------------affichage des données----------------------------//
let cartContainer = document.getElementById('order-information-container');

let introduction = document.createElement('div');
cartContainer.appendChild(introduction);
introduction.textContent="Le numéro de votre commande est :";

let order = document.createElement('div');
cartContainer.appendChild(order);
order.innerHTML = (" "+ orderId +" pour un montant total de "+ additionPrice +" € <br> a bien été enregistrée .");

//-------------------effacer localstorage sauf formulaire---------------------//
function deleteStorage(key){
    localStorage.removeItem(key);
};
deleteStorage("productCart");
deleteStorage("additionPrice");
deleteStorage("orderId");
