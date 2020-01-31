const BUTTONS = document.querySelectorAll(".carouselBtn");
const CARDS = document.getElementsByClassName("cards");
const INGR_INPUT = document.getElementById('ingredientsInput');
const CHOSEN_IMG = document.getElementById("chosenImg");
const CHOSEN_CALS = document.getElementById("cals");
const CHOSEN_RECIPE = document.getElementById("fullRecipe");
const CHOSEN_LABEL = document.getElementById("chosenLabel");
const INGR_LIST = document.getElementById("ingrList");
const CAUT_LIST = document.getElementById("cautList");
const RECIPE_BUTTON = document.getElementById("fullRecipeButton");
const SPOTIFY_INFO = document.getElementById('spotifyInfoBox');
const SPOTIFY_PLAYLIST = document.getElementById('embeddedPlaylist');
const WINE_API_KEY = "c7a302895e054e629add1f2d96bf5b3f";
const EDAMAM_APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFY_CLIENT_ID = "client_id=8f700bce8751463db952c79260589c04";
const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'redirect_uri=http://localhost:12345/';
const TOKEN_TYPE = 'response_type=token';
let HEALTH_INPUT = document.getElementById("healthLabel");
let page = 1;

(function () {

    document.getElementById("run").addEventListener("click", function () {

        // Set recipes by keyword and activate buttons for spotify and wine
        let ingredientsInput = INGR_INPUT.value;
        HEALTH_INPUT = `&health=${HEALTH_INPUT.value}`;
        if (HEALTH_INPUT === "&health=0") {
            HEALTH_INPUT = "";
            getRecipes(ingredientsInput, HEALTH_INPUT).catch(error => {
                console.log(error);
                CHOSEN_LABEL.innerHTML = "Sorry, no recipes were found with these filters.";
            });
        } else {
            getRecipes(ingredientsInput, HEALTH_INPUT).catch(error => {
                console.log(error);
                CHOSEN_LABEL.innerHTML = "Sorry, no recipes were found with these filters.";
            });
        }
        getWine(ingredientsInput).catch(error => {
            console.log(error);
        });

        // Listen to Spotify Button to prompt for login
        document.getElementById('spotify').addEventListener('click', function () {

            loginSpotify(ingredientsInput).catch(error => {
                console.log(error);
                SPOTIFY_INFO.innerHTML = 'Sorry no playlists available';
            });
        })
    });
})();


async function getRecipes(ingredient, healthLabel) {
    for (let i = 0; i < 3; i++) {
        CARDS[i].style.opacity = "1";
    }
    CHOSEN_LABEL.innerHTML = "";

    // Button stuff, Handmade carousel
    for (let btn of BUTTONS) {
        btn.style.visibility = "visible";
    }
    BUTTONS.forEach(function (btn) {
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
                    CARDS[i].style.opacity = "1";
                    CARDS[i].style.zIndex = "100";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
            }
            if (page === 2) {
                for (let i = 0; i < 3; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    CARDS[i].style.opacity = "1";
                    CARDS[i].style.zIndex = "100";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
            }

            if (page === 3) {
                for (let i = 0; i < 3; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    CARDS[i].style.opacity = "0";
                    CARDS[i].style.zIndex = "0";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    CARDS[i].style.opacity = "1";
                    CARDS[i].style.zIndex = "100";
                    CARDS[i].style.transition = "all 0.5s linear";
                }
            }
        })
    });
    for (let i = 3; i < 9; i++) {
        CARDS[i].style.opacity = "0";
        CARDS[i].style.zIndex = "0";
    }

    // Fetch data
    let path = "https://api.edamam.com/search?q=" + ingredient + "&" + EDAMAM_APPID + healthLabel;
    //let path = "tomato.json";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);

    // Adding info to cards
    let clickedIngr = [];
    let clickedCautions = [];

    for (let i = 0; i < CARDS.length; i++) {
        CARDS[i].children[0].innerHTML = data.hits[i].recipe.label;
        CARDS[i].children[1].children[0].setAttribute("src", data.hits[i].recipe.image);

        // Listen to cards for when recipe is chosen
        CARDS[i].addEventListener("click", function () {

            RECIPE_BUTTON.style.display = "block";
            RECIPE_BUTTON.style.visibility = "visible";

            console.log(CARDS[i].id);

            // Remove child nodes on new load
            if (INGR_LIST.hasChildNodes()) {
                for (let j = 0; j < clickedIngr.length; j++) {
                    INGR_LIST.removeChild(INGR_LIST.childNodes[0]);
                }
            }
            if (CAUT_LIST.hasChildNodes()) {
                for (let i = 0; i < clickedCautions.length; i++) {
                    CAUT_LIST.removeChild(CAUT_LIST.childNodes[0]);
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
                INGR_LIST.innerHTML += `<li> ${clickedIngr[j]}</li>`;
            }
            for (let j = 0; j < clickedCautions.length; j++) {
                CAUT_LIST.innerHTML += `<li>${clickedCautions[j]}</li>`;
            }

            // Set information to divs when recipe is chosen
            CHOSEN_IMG.setAttribute("src", data.hits[i].recipe.image);
            CHOSEN_RECIPE.setAttribute("href", data.hits[i].recipe.url);
            CHOSEN_LABEL.innerHTML = data.hits[i].recipe.label;
            CHOSEN_RECIPE.innerHTML = "Get the full recipe";
            CHOSEN_CALS.innerHTML = `${Math.floor(data.hits[i].recipe.calories)} kCal`;
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
    let path = AUTH_BASE_URL + '?' + SPOTIFY_CLIENT_ID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;

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

        let playlistArray = playlistObj.playlists.items;

        // Randomize playlist choice
        let playlistId = playlistArray[Math.floor(Math.random() * playlistArray.length)].id;
        SPOTIFY_PLAYLIST.src = 'https://open.spotify.com/embed/playlist/' + playlistId + '/';
        SPOTIFY_INFO.style.visibility = 'visible';

}

// Wine API
async function getWine() {
    //let response = await fetch(`https://api.spoonacular.com/food/wine/pairing?food=${ingredientsInput}&apiKey=${WINE_API_KEY}`);
    let tempResponse = "blueCheese.json";
    const wines = await fetch(tempResponse);
    let data = await wines.json();
    //data = await response.json();
    printWine(data);
}

function printWine(param) {
    if (param.pairedWines.length == 0 && param.productMatches.length == 0 && param.pairingText == "") {
        document.getElementById("pairingText").innerHTML = "freestyle your drinks";
    } else if (param.pairedWines.length == 0 && param.productMatches.length == 0){
        document.getElementById("pairingText").innerHTML = param.pairingText;
    }
    else {
        document.getElementById("pairingText").innerText = param.pairingText;
        for (let i = 0; i < param.pairedWines.length; i++)
        {
            document.getElementById("pairedWines").innerHTML = param.pairedWines[i];
        }
    }

    return param;
}