const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFYSECRETID = "bbda1903d8584c76bcb59a98ba731031";
const SPOTIFYCLIENTID = "client_id=8f700bce8751463db952c79260589c04";
const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'redirect_uri=http://localhost:12345/';
const TOKEN_TYPE = 'response_type=token';

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        //getRecipes(ingredientsInput);
        loginSpotify(ingredientsInput).catch(error => {
            console.log(error);
        });
    });
})();

async function getRecipes(ingredient) {
    let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + "&from=0&to=3&calories=591-722&health=alcohol-free";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);
}

// check for an accesskey, otherwise get one
token = window.location.hash.substr(1).split('&')[0].split("=")[1];
if (token) {
    window.opener.spotifyCallback(token)
}

// create url for spotify authentication
function buildLink(ingredient) {
    let link = AUTH_BASE_URL + '?' + SPOTIFYCLIENTID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;
    return link;
}

// Popup a window and return the key that spotify returned
function loginSpotify(ingredient) {
    let path = buildLink(ingredient);
    let popup = window.open(path, 'Login in with Spotify', 'width=600, height=400');

    window.spotifyCallback = function(accessKey) {
        popup.close();

        fetch('https://api.spotify.com/v1/search?q=pizza&type=playlist', {
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

