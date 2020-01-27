const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        getRecipes();
    });
})();

async function getRecipes() {
    let path = "https://api.edamam.com/search?q=chicken,carrot,potato&" + APPID + "&from=0&to=3&calories=591-722&health=alcohol-free";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);
}
