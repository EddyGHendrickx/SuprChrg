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
        getSpotify(ingredientsInput).catch(error => {
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

async function getSpotify(ingredient) {
    let path = buildLink();
    console.log(path);
    loginSpotify(path);
    console.log(playlists);
}

function buildLink() {
    let link = AUTH_BASE_URL + '?' + SPOTIFYCLIENTID + '&' + REDIRECT_URI + '&' + TOKEN_TYPE;
    return link;
}

function loginSpotify(path) {
    let popup = window.open(path, 'Login in with Spotify', 'width=600, height=400');
    

}
