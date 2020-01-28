let buttons = document.querySelectorAll(".carouselBtn");
let nxtBtn = document.getElementById("nxtBtn");
let prvBtn = document.getElementById("prvBtn");
let cards = document.getElementsByClassName("cards");
const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFYSECRETID = "bbda1903d8584c76bcb59a98ba731031";
const SPOTIFYCLIENTID = "client_id=8f700bce8751463db952c79260589c04";
const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'redirect_uri=http://localhost:12345/';
const TOKEN_TYPE = 'response_type=token';
let page = 1;

(function () {
    document.getElementById("run").addEventListener("click", function () {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        //getRecipes(ingredientsInput);
        loginSpotify(ingredientsInput).catch(error => {
            console.log(error);
        });
    });
})();

for (let btn of buttons) {
    btn.style.visibility = "hidden";
}

async function getRecipes(ingredient) {
    //let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + "&from=0&to=9&calories=591-722&health=alcohol-free";
    let path = "onion.json";
    for (let btn of buttons) {
        btn.style.visibility = "visible";
    }
    const recipes = await fetch(path);
    const data = await recipes.json();
    let recipeTitle = [];
    let recipeImg = [];
    let recipeIngr = [];
    let recipeTime = [];
    let recipeCals = [];
    for (let i = 0; i < data.hits.length; i++) {
        recipeTitle.push(data.hits[i].recipe.label);
        recipeImg.push(data.hits[i].recipe.image);
        recipeTime.push(data.hits[i].recipe.totalTime);
        recipeCals.push(Math.floor(data.hits[i].recipe.calories));
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].children[0].innerHTML = recipeTitle[i];
        cards[i].children[1].children[0].setAttribute("src", recipeImg[i]);
    }
    for (let i = 3; i < 9; i++) {
        cards[i].style.opacity = "0";
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
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
            if (page === 2) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }

            if (page === 3) {
                for (let i = 0; i < 3; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 3; i < 6; i++) {
                    cards[i].style.opacity = "0";
                    cards[i].style.transition = "all 0.5s linear";
                }
                for (let i = 6; i < 9; i++) {
                    cards[i].style.opacity = "1";
                    cards[i].style.transition = "all 0.5s linear";
                }
            }
        })
    });
}

// create url for spotify authentication
function buildLink(ingredient) {
    let link = AUTH_BASE_URL + '?' + SPOTIFYCLIENTID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;
    return link;
}

// check for an accesskey, otherwise get one
token = window.location.hash.substr(1).split('&')[0].split("=")[1];
if (token) {
    window.opener.spotifyCallback(token)
}

// Popup a window and return the key that spotify returned
function loginSpotify(ingredient) {
    let path = buildLink(ingredient);
    let popup = window.open(path, 'Login in with Spotify', 'width=600, height=400');

    window.spotifyCallback = function(accessKey) {
        popup.close();

        fetch('https://api.spotify.com/v1/search?q=pizza,chicken&type=playlist', {
            headers: {
                'Authorization': `Bearer ${accessKey}`
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
        })
    }
}