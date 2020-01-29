let buttons = document.querySelectorAll(".carouselBtn");
let nxtBtn = document.getElementById("nxtBtn");
let prvBtn = document.getElementById("prvBtn");
let cards = document.getElementsByClassName("cards");
let chosenImg = document.getElementById("chosenImg");
let chosenIngr = document.getElementById("ingr");
let chosenCals = document.getElementById("cals");
let chosenCaut = document.getElementById("caut");
let chosenRecipe = document.getElementById("fullRecipe");
const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFYSECRETID = "bbda1903d8584c76bcb59a98ba731031";
const SPOTIFYCLIENTID = "client_id=8f700bce8751463db952c79260589c04";
const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'redirect_uri=http://localhost:12345/';
const TOKEN_TYPE = 'response_type=token';
let page = 1;

(function () {

    // Hide carousel buttons


    document.getElementById("run").addEventListener("click", function () {

        // Set recipes by keyword and activate buttons for spotify and wine
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        getRecipes(ingredientsInput).catch(error => {
            console.log(error);
        });

        document.getElementById('spotify').addEventListener('click', function () {
            loginSpotify(ingredientsInput).catch(error => {
                console.log(error);
            });
        })
    });
})();


async function getRecipes(ingredient) {

    // Button stuff, Handmade carousel
    for (let btn of buttons) {
        btn.style.visibility = "visible";
    }
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            console.log(page);
            if (btn.id === "prvBtn") {
                page--;
                if (page === 0){
                    page = 3;
                }
            } else {
                page++;
                if (page === 4){
                    page = 1;
                }
            }
            if (page === 1) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.display = "block";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
            if (page === 2) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.display = "block";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }

            if (page === 3) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.display = "none";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.display = "block";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
        })
    });

    // Fetch data
    //let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + "&from=0&to=9&calories=591-722&health=alcohol-free";
    let path = "onion.json";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);

    // Adding info to cards
    for (let i = 0; i < cards.length; i++) {
        cards[i].children[0].innerHTML = data.hits[i].recipe.label;
        cards[i].children[1].children[0].setAttribute("src", data.hits[i].recipe.image);

        // Listen to cards for when recipe is chosen
        cards[i].addEventListener("click", function () {
            console.log(cards[i].id);

            let clickedIngr = [];
            let clickedCautions = [];
            for (let j = 0; j < data.hits[i].recipe.ingredientLines.length; j++) {
                clickedIngr.push(data.hits[i].recipe.ingredientLines[j]);
            }
            for (let j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
                clickedCautions.push(data.hits[i].recipe.healthLabels[j]);
            }

            console.log("ingr:", clickedIngr);
            console.log("caut:", clickedCautions);

            chosenImg.setAttribute("src", data.hits[i].recipe.image);
            chosenRecipe.setAttribute("href", data.hits[i].recipe.url);
            chosenRecipe.innerHTML = "Get the full recipe";
            chosenIngr.innerHTML = clickedIngr[i];
            chosenCals.innerHTML = `${Math.floor(data.hits[i].recipe.calories)} kCal`;
            chosenCaut.innerHTML = clickedCautions[i];
        });
    }
    for (let i = 3; i < 9; i++) {
        cards[i].style.opacity = "0";
        cards[i].style.display = "none";

    }
}

// check for an accesskey, otherwise get one
token = window.location.hash.substr(1).split('&')[0].split("=")[1];
if (token) {
    window.opener.spotifyCallback(token)
}

// Popup a window and return the key that spotify returned
function loginSpotify(ingredient) {
    let path = AUTH_BASE_URL + '?' + SPOTIFYCLIENTID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;
    let popup = window.open(path, 'Login in with Spotify', 'width=600, height=400');

    window.spotifyCallback = function(accessKey) {
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
        document.getElementById('spotifyDescription').innerHTML = 'Sorry no playlists available';
    }
    else {
        let playlistArray = playlistObj.playlists.items;
        let playlistId = playlistArray[0].id;
        console.log(playlistId);
        let playlistPicture = playlistArray[0].images[0].url;
        console.log(playlistPicture);
        let playlistName = playlistArray[0].name;
        console.log(playlistName);
        let playlistExternalUrl = playlistArray[0].external_urls.spotify;
        console.log(playlistExternalUrl);
        let playlistDescription = playlistArray[0].description;
        console.log(playlistDescription);

        document.getElementById('spotifyImg').src = playlistPicture;
        document.getElementById('spotifyDescription').innerHTML = playlistDescription;
        document.getElementById('spotifyImg').addEventListener('click', function () {
            window.open(playlistExternalUrl, playlistName, 'width=600, height=600');
        });
    }
}