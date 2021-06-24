//-------------récupération de la chaîne de requête dans l'url-------------//
let queryString_url_id = window.location.search;
console.log("queryString_url_id");
console.log(queryString_url_id);

//-------------méthode pour extraire uniquement l'id----------------//
let urlSearchParams = new URLSearchParams(queryString_url_id);

let idTeddy = urlSearchParams.get("id");
console.log("idTeddy");
console.log(idTeddy);

//------------Affichage du produit délectionné par son id--------------//
fetch("http://localhost:3000/api/teddies/" + idTeddy)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function createCard(myTeddy) {
    // STRUCTURE HTML DES CARDS
    //Cette ligne crée une balise img
    let imgCard = document.createElement("img");
    imgCard.classList.add("card-image-top", "img-fluid", "w-100");
    imgCard.setAttribute("src", "element.imageUrl");
    //Insertion nu nouveau contenu :
    // On sélectionne la div
    let selectcontainerCard = document.querySelector("#containerCard");
    // On insère la balise img après la div
    selectcontainerCard.appendChild(imgCard);
    imgCard.src = myTeddy.imageUrl;

    let bodyCard = document.createElement("div");
    bodyCard.setAttribute("id", "bodyCard");
    bodyCard.classList.add("card-body");
    selectcontainerCard.appendChild(bodyCard);

    let titleCard = document.createElement("h3");
    titleCard.setAttribute("id", "titleCard");
    titleCard.classList.add("card-title");
    bodyCard.appendChild(titleCard);
    titleCard.textContent = myTeddy.name;

    let priceCard = document.createElement("h4");
    bodyCard.appendChild(priceCard);
    priceCard.textContent = myTeddy.price / 100 + "€";

    let descriptionCard = document.createElement("p");
    descriptionCard.classList.add("card-text");
    bodyCard.appendChild(descriptionCard);
    descriptionCard.textContent = myTeddy.description;

    let colorCard = document.createElement("h4");
    colorCard.setAttribute("id", "colorCard");
    colorCard.classList.add("mt-5", "mb-4");
    bodyCard.appendChild(colorCard);
    colorCard.textContent = "Choisissez votre couleur :";

    let listColorCard = document.createElement("select");
    listColorCard.id = "selectColor";
    listColorCard.setAttribute("name", "select");
    bodyCard.appendChild(listColorCard);

    let allColors = myTeddy.colors;
    //BOUCLE POUR CREER LES OPTIONS COULEUR
    for (i = 0; i < allColors.length; i++) {
      let optionColor = document.createElement("option");
      listColorCard.appendChild(optionColor);
      optionColor.textContent = allColors[i];
    }

    let quantityCard = document.createElement("h4");
    quantityCard.setAttribute("id", "quantityCard");
    quantityCard.classList.add("mt-5", "mb-4");
    bodyCard.appendChild(quantityCard);
    quantityCard.textContent = "Choisissez votre quantité :";

    let productQuantity = document.createElement("select");
    productQuantity.id = "selectQuantity";
    productQuantity.setAttribute("number", "select");
    bodyCard.appendChild(productQuantity);

    //BOUCLE POUR CREER LES OPTIONS DE QUANTITE
    for (i = 1; i < 6; i++) {
      let optionQuantity = document.createElement("option");
      optionQuantity.setAttribute("value", i);
      productQuantity.appendChild(optionQuantity);
      optionQuantity.textContent = i;
    }

    //CREATION DU BOUTON D'AJOUT DES PRODUITS AU PANIER
    let buttonCard = document.createElement("button");
    selectcontainerCard.appendChild(buttonCard);
    buttonCard.classList.add("btn", "btn-warning", "streched-success");
    buttonCard.setAttribute("id", "buttonCard");
    buttonCard.textContent = "Ajouter au panier";

    //----------------------Gestion du panier----------------------//
    //Récuparation des données selectionnées et envoie au panier

    //Sélection couleur et quantité
    let tedColor = document.getElementById("selectColor");
    let tedQuantity = document.getElementById("selectQuantity");

    //Ecouter le bouton "Ajouter" et envoyer le panier
    buttonCard.addEventListener("click", (Event) => {
      Event.preventDefault();
      //Mettre le choix de la couleur dans une variable
      let choiceColor = tedColor.value;
      console.log(choiceColor);
      //Mettre le choix de la quantité dans une variable
      let choiceQuantity = tedQuantity.value;
      console.log(choiceQuantity);
      //Récupération des valeurs du produit selectionné
      let optionTeddy = {
        _id: myTeddy._id,
        name: myTeddy.name,
        colors: choiceColor,
        price: myTeddy.price / 100,
        imageUrl: myTeddy.imageUrl,
        description: myTeddy.description,
        quantity: choiceQuantity,
      };
      console.log("optionTeddy");
      console.log(optionTeddy);

      //-----------------------Local Storage------------------//
      //Fonction popup
      function popup() {
        if (
          window.confirm(
            `${myTeddy.name} , couleur : ${tedColor.value} , quantité : ${tedQuantity.value} , a été ajouté au panier .
Aller au panier "OK" ou Continuer vos achats "Annuler"`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      }
      //-----Stocker la récupération des choix utilisateurs dans le localstorage----//
      let infosTeddy = JSON.parse(localStorage.getItem("productCart"));
      console.log("infosTeddy");
      console.log(infosTeddy);
      //vérification de la présence ou non de produits dans le localstorage
      if (infosTeddy === false || infosTeddy === null) {
        infosTeddy = [];
      }
      console.log("infosTeddy1");
      console.log(infosTeddy);
      
      //Si des produits sont déjà présents avec la même id dans le localstorage
      let exist = false;
      for (i = 0; i < infosTeddy.length; i++) {
        if (
          infosTeddy[i]._id == optionTeddy._id &&
          infosTeddy[i].colors == optionTeddy.colors
        ) {
          exist = true;
          infosTeddy[i].quantity =
            parseInt(infosTeddy[i].quantity) + parseInt(optionTeddy.quantity);
          //popup();
        }
        console.log("infosTeddy");
        console.log(infosTeddy);
        //Si pas de produits déjà présents avec la même id dans le localstorage
      }
      if (!exist) {
        infosTeddy.push(optionTeddy);
        //popup();
      }
      popup();
      console.log("infosTeddy");
      console.log(infosTeddy);
      //---Mise au format JSON et envoi de la key "product" dans le localstorage---//
      localStorage.setItem("productCart", JSON.stringify(infosTeddy));
    });
  })
  .catch(function (error) {
    // Une erreur est survenue
    console.log(error);
  });