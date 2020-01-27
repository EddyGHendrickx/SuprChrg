const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
const SPOTIFYCLIENTID = "8f700bce8751463db952c79260589c04";
const SPOTIFYSECRETID = "bbda1903d8584c76bcb59a98ba731031";

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        getRecipes(ingredientsInput);
    });
})();

async function getRecipes(ingredient) {
    let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + "&from=0&to=3&calories=591-722&health=alcohol-free";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);
}
