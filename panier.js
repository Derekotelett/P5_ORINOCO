//Stocker la récupération des choix utilisateurs dans le localstorage
let infosTeddy = JSON.parse(localStorage.getItem("productCart"));
console.log(infosTeddy);

//Affichage des prods dans le panier
let totalNumberOfItem = document.getElementById("number-of-items");
console.log(totalNumberOfItem);
if (infosTeddy == 0 || infosTeddy == null) {
  totalNumberOfItem.textContent = "Mon panier est vide";
} else {
  for (let i = 0; i < infosTeddy.length; i++) {
    totalNumberOfItem.textContent = "Votre panier contient : ";

    let productLine = document.createElement("div");
    productLine.classList.add("row", "mb-4", "border-bottom");
    productCard.appendChild(productLine);

    let productImageArea = document.createElement("div");
    productImageArea.classList.add("col-md-6", "col-lg-5", "col-xl-5");
    productLine.appendChild(productImageArea);

    let productImageContainer = document.createElement("div");
    productImageContainer.classList.add("view","zoom","overlay","z-depth-1","rounded","mb-3","mb-md-0");
    productImageArea.appendChild(productImageContainer);

    let productImage = document.createElement("img");
    productImage.classList.add("img-fluid", "w-100");
    productImageContainer.appendChild(productImage);
    productImage.src = infosTeddy[i].imageUrl;

    let productDetails = document.createElement("div");
    productDetails.classList.add("col-md-6", "col-lg-7", "col-xl-7");
    productLine.appendChild(productDetails);

    let productName = document.createElement("h5");
    productName.classList.add("w-100");
    productDetails.appendChild(productName);
    productName.textContent = infosTeddy[i].name;

    let productResume = document.createElement("p");
    productResume.classList.add("mb-3","text-muted","text-uppercase","small","w-100");
    productDetails.appendChild(productResume);
    productResume.textContent = infosTeddy[i].description;

    let productColor = document.createElement("p");
    productColor.classList.add("mb-3","text-muted","text-uppercase","small","w-100");
    productDetails.appendChild(productColor);
    productColor.textContent = "Couleur : " + infosTeddy[i].colors;

    let productPrice = document.createElement("p");
    productPrice.classList.add("mb-3", "text-uppercase", "small", "w-100");
    productDetails.appendChild(productPrice);
    productPrice.textContent = "Prix : " + infosTeddy[i].price + "€";

    let productQuantity = document.createElement("p");
    productQuantity.classList.add("mb-3", "text-uppercase", "small", "w-100");
    productDetails.appendChild(productQuantity);
    productQuantity.textContent = "Quantité : " + infosTeddy[i].quantity;

    let productButton = document.createElement("button");
    productButton.classList.add("btn", "btn-warning", "mb-4");
    productDetails.appendChild(productButton);
    productButton.textContent = "Supprimer";
  }
}
//---------------------Gestion bouton supprimer--------------------//
//Selection des boutons suppr

let cancelButton = document.querySelectorAll(".btn-warning");
console.log(cancelButton);

for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    // Selection du produit à suppr
    let productDelete = {
      id: infosTeddy[i]._id,
      colors: infosTeddy[i].colors,
    };
    let indextodel = false;

    console.log("productDelete");
    console.log(productDelete);

    //let remove_product_localstorage = () => {
    let remove_product_localstorage = function () {
      for (i = 0; i < infosTeddy.length; i++) {
        if (
          infosTeddy[i]._id == productDelete.id &&
          infosTeddy[i].colors == productDelete.colors
        ) {
          indextodel = i;
        }
      }
      if (indextodel !== false) {
        infosTeddy.splice(indextodel, 1);
      }
    };
    remove_product_localstorage();

    //envoi de la variable dans le localstorage
    localStorage.setItem("productCart", JSON.stringify(infosTeddy));

    //Alert produit suppr + rechargement de la page
    alert("Ce produit a été supprimé du panier");
    window.location.href = "panier.html";
  });
}

//-------------------bouton vider panier----------------------//
let deleteButtonContainer = document.getElementById("clear-cart");
let deleteButton = document.createElement("button");
deleteButton.classList.add("btn", "btn-danger");
deleteButtonContainer.appendChild(deleteButton);
deleteButton.textContent = "Vider le panier";

//selection de la ref du bouton "deleteButton"
let deleteBasket = document.querySelector(".btn-danger");
console.log(deleteBasket);

//suppression key "product" du localstorage pour vider panier
deleteBasket.addEventListener("click", (e) => {
  e.preventDefault();

  //removeItem pour vider localstorage
  localStorage.removeItem("productCart");

  //alert le panier a été vider
  alert("Le panier a été vidé");

  //rechargement de la page panier
  window.location.href = "panier.html";
});

////////////////////////calcul total panier////////////////////////
//declaration variable pour mettre les prix presents dans le panier
let totalPrice = [];

//aller chercher prix dans panier
if (infosTeddy == null) {
} else {
  for (let i = 0; i < infosTeddy.length; i++) {
    console.log(infosTeddy);
    console.log(infosTeddy[i].price);

    let detailPrice = infosTeddy[i].price * infosTeddy[i].quantity;
    console.log(detailPrice);

    //mettre prix total dans totalPrice
    totalPrice.push(detailPrice);
    console.log(totalPrice);
  }
}

//addition des prix dans le tabl de la variable"totalPrice" avec reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const additionPrice = totalPrice.reduce(reducer, 0);
console.log(additionPrice);

//Afficher prix total
let totalDisplay = document.getElementById("total-amount-order");
totalDisplay.textContent = "Total: " + additionPrice + " €";

//----------------------------Formulaire-----------------------------//
//selection bouton valider ma commande
let submitForm = document.getElementById("submitButton");
console.log(submitForm);

//addEvenListener
submitForm.addEventListener("click", (e) => {
  e.preventDefault();

  //création d'un objet pour récup données form
  let formvalues = {
    firstname: document.querySelector("#firstname").value,
    lastname: document.querySelector("#lastname").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    zipcode: document.querySelector("#zipcode").value,
    email: document.querySelector("#email").value,
  };

  console.log("formvalues");
  console.log(formvalues);

  //-------------gestion validation form-------------//
  let textAlert = function (value) {
    return (
      value +
      " : Chiffres et symboles non autorisés \nDe 2 à 20 caractères autorisés "
    );
  };

  let regexfirstlastNameandCity = function (value) {
    return /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/.test(value);
  };
  let regexzipCode = (value) => {
    return /^[0-9]{5}$/.test(value);
  };
  let regexEmail = (value) => {
    return /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/.test(value);
  };
  let regexAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,100}$/.test(value);
  };

  function controlfirstName() {
    let validfirstName = formvalues.firstname;
    if (regexfirstlastNameandCity(validfirstName)) {
      return true;
    } else {
      alert(textAlert("Prénom"));
      return false;
    }
  }
  function controllastName() {
    let validlastName = formvalues.lastname;
    if (regexfirstlastNameandCity(validlastName)) {
      return true;
    } else {
      alert(textAlert("Nom"));
      return false;
    }
  }
  function controlCity() {
    let validCity = formvalues.city;
    if (regexfirstlastNameandCity(validCity)) {
      return true;
    } else {
      alert(textAlert("Ville"));
      return false;
    }
  }
  function controlzipCode() {
    let validzipCode = formvalues.zipcode;
    if (regexzipCode(validzipCode)) {
      return true;
    } else {
      alert("Code Postal : doit être composé de 5 chiffres");
      return false;
    }
  }
  function controlEmail() {
    let validEmail = formvalues.email;
    if (regexEmail(validEmail)) {
      return true;
    } else {
      alert("Email : non valide");
      return false;
    }
  }
  function controlAddress() {
    let validAddress = formvalues.address;
    if (regexAddress(validAddress)) {
      return true;
    } else {
      alert("Adresse : doit contenir uniquement des chiffres et des lettres");
      return false;
    }
  }
  //Contrôle du formulaire avant envoie dans le localstorage
  if (controlfirstName() && controllastName() && controlAddress() && controlCity() && controlzipCode() && controlEmail()) {
    //mettre formvalues + prix total dans localstorage
    localStorage.setItem("formvalues", JSON.stringify(formvalues));

    //Envoi  de products + contact vers serveur
    // objet contact
    let contact = {
      firstName: firstname.value,
      lastName: lastname.value,
      address: address.value,
      email: email.value,
      city: city.value,
    };

    // tableau des produits
    let products = [];
    if (infosTeddy === null || infosTeddy == 0) {
      alert("Votre panier est vide");
    } else {
      for (let i = 0; i < infosTeddy.length; i++) {
        products.push(infosTeddy[i]._id);
      }

      function sendtoServer() {
        //Envoie de l'objet "toSend" vers le serveur
        let promise = fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          body: JSON.stringify({ contact: contact, products: products }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        //Gestion erreur
        promise.then(async (response) => {
          //Si la promesse n'est pas résolue ou rejetée
          try {
            const contenu = await response.json();
            console.log("contenu de response");
            console.log(contenu);

            if (response.ok) {
              console.log(`Resultat de response.ok : ${response.ok}`);

              //Récupération de l'id de la response du serveur
              console.log("id de response");
              console.log(contenu.orderId);

              //Mettre l'id dans le local storage
              localStorage.setItem("orderId", contenu.orderId);

              //Aller vers la page confirmation-commande
              window.location = "confirm.html";
            } else {
              console.log(`Réponse du serveur : ${response.status}`);
              alert(`Problème du serveur : erreur ${response.status}`);
            }
          } catch (e) {
            console.log("ERREUR qui vient du catch()");
            console.log(e);
            alert(`Erreur provenant du catch() ${e}`);
          }
        });
      }
      sendtoServer();
      localStorage.setItem("additionPrice", JSON.stringify(additionPrice));
    }
  } else {
    alert("Veuillez compléter le formulaire");
  }
});

//----------- mettre contenu du localstorage dans champs form ------------//
//recup key dans localstorage et la mettre dans une variable
let valuelocalstorage = JSON.parse(localStorage.getItem("formvalues"));

console.log("valuelocalstorage");
console.log(valuelocalstorage);

//fonction pour remplir champs form avec les values du localstorage
function completeInput(input) {
  if (valuelocalstorage == null) {
    console.log("storage = 0");
  } else {
    document.querySelector(`#${input}`).value = valuelocalstorage[input];
  }
}
completeInput("firstname");
completeInput("lastname");
completeInput("address");
completeInput("city");
completeInput("zipcode");
completeInput("email");
