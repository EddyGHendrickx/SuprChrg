let buttons = document.querySelectorAll(".carouselBtn");
let nxtBtn = document.getElementById("nxtBtn");
let prvBtn = document.getElementById("prvBtn");
let cards = document.getElementsByClassName("cards");
let chosenImg = document.getElementById("chosenImg");
let chosenCals = document.getElementById("cals");
let chosenRecipe = document.getElementById("fullRecipe");
let ingrList = document.getElementById("ingrList");
let cautList = document.getElementById("cautList");
let chosenLabel = document.getElementById("chosenLabel");
let recipeButton = document.getElementById("fullRecipeButton");
let healthInput = document.getElementById("healthLabel");
const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFYCLIENTID = "client_id=8f700bce8751463db952c79260589c04";
const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'redirect_uri=http://localhost:12345/';
const TOKEN_TYPE = 'response_type=token';
let page = 1;

(function () {

    document.getElementById("run").addEventListener("click", function () {

        // Set recipes by keyword and activate buttons for spotify and wine
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        healthInput = `&health=${document.getElementById("healthLabel").value}`;
        if (healthInput === "&health=0") {
            healthInput = "";
            getRecipes(ingredientsInput, healthInput).catch(error => {
                console.log(error);
                chosenLabel.innerHTML = "Sorry, no recipes were found with these filters."
            })
        } else {
            getRecipes(ingredientsInput, healthInput).catch(error => {
                console.log(error);
                chosenLabel.innerHTML = "Sorry, no recipes were found with these filters."
            })
        }


        document.getElementById('spotify').addEventListener('click', function () {

            loginSpotify(ingredientsInput).catch(error => {
                console.log(error);
            });
        })
    });
})();


async function getRecipes(ingredient, healthLabel) {
    for (let i = 0; i < 3; i++) {
        cards[i].style.opacity = "1";
    }
    // Button stuff, Handmade carousel
    for (let btn of buttons) {
        btn.style.visibility = "visible";
    }
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (btn.id === "prvBtn") {
                page--;
                if (page === 0) {
                    page = 3;
                }
            } else if (btn.id === "nxtBtn") {
                page++;
                if (page === 4) {
                    page = 1;
                }
            }
            // carousel
            if (page === 1) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.zIndex = "100";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
            if (page === 2) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.zIndex = "100";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }

            if (page === 3) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.zIndex = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.zIndex = "100";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
        })
    });
    for (let i = 3; i < 9; i++) {
        cards[i].style.opacity = "0";
        cards[i].style.zIndex = "0";
    }

    // Fetch data
    let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + healthLabel;
    //let path = "tomato.json";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);

    // Adding info to cards
    let clickedIngr = [];
    let clickedCautions = [];

    for (let i = 0; i < cards.length; i++) {
        cards[i].children[0].innerHTML = data.hits[i].recipe.label;
        cards[i].children[1].children[0].setAttribute("src", data.hits[i].recipe.image);

        // Listen to cards for when recipe is chosen
        cards[i].addEventListener("click", function () {
            recipeButton.style.visibility = "visible";
            console.log(cards[i].id);

            // Remove child nodes on new load
            if (ingrList.hasChildNodes()) {
                for (let j = 0; j < clickedIngr.length; j++) {
                    ingrList.removeChild(ingrList.childNodes[0]);
                }
            }
            if (cautList.hasChildNodes()) {
                for (let i = 0; i < clickedCautions.length; i++) {
                    cautList.removeChild(cautList.childNodes[0]);
                }
            }

            // Make arrays and fill with ingredients and cautions
            clickedIngr = [];
            clickedCautions = [];
            for (let j = 0; j < data.hits[i].recipe.ingredientLines.length; j++) {
                clickedIngr.push(data.hits[i].recipe.ingredientLines[j]);
            }
            for (let j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
                clickedCautions.push(data.hits[i].recipe.healthLabels[j]);
            }

            // Append the list of cautions and ingredients to the html
            for (let j = 0; j < clickedIngr.length; j++) {
                ingrList.innerHTML += `<li> ${clickedIngr[j]}</li>`;
            }
            for (let j = 0; j < clickedCautions.length; j++) {
                cautList.innerHTML += `<li>${clickedCautions[j]}</li>`;
            }

            // Set information to divs when recipe is chosen
            chosenImg.setAttribute("src", data.hits[i].recipe.image);
            chosenRecipe.setAttribute("href", data.hits[i].recipe.url);
            chosenLabel.innerHTML = data.hits[i].recipe.label;
            chosenRecipe.innerHTML = "Get the full recipe";
            chosenCals.innerHTML = `${Math.floor(data.hits[i].recipe.calories)} kCal`;
        });
    }
}

// Spotify Code
// Check for an accesskey, otherwise get one
token = window.location.hash.substr(1).split('&')[0].split("=")[1];
if (token) {
    window.opener.spotifyCallback(token)
}

// Popup a window and return the key that spotify returned
function loginSpotify(ingredient) {
    let path = AUTH_BASE_URL + '?' + SPOTIFYCLIENTID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;

    let popup = window.open(path, 'Login in with Spotify', 'width=600, height=400');
    window.spotifyCallback = function(accessKey) {
        console.log(accessKey);
        popup.close();



        ingredient = 'q=' + ingredient;
        fetch('https://api.spotify.com/v1/search?' + ingredient + '&type=playlist', {
            headers: {
                'Authorization': `Bearer ${accessKey}`
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            setSpotifyInfo(data);
        })
    }
}

// Set Playlist info in Div
function setSpotifyInfo(playlistObj) {

    if (playlistObj.error) {
        document.getElementById('spotifyInfoBox').innerHTML = 'Sorry no playlists available';
    } else {
        let playlistArray = playlistObj.playlists.items;

        // Randomize playlist choice
        let playlistId = playlistArray[Math.floor(Math.random() * playlistArray.length)].id;

        document.getElementById('embeddedPlaylist').src = 'https://open.spotify.com/embed/playlist/' + playlistId + '/';
    }
}