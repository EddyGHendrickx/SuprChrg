const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
let cards = document.getElementsByClassName("cards");
console.log(cards[1].children);
(function () {
    document.getElementById("run").addEventListener("click", function () {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        getRecipes(ingredientsInput);
    });
})();

async function getRecipes(ingredient) {
    //let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPID + "&from=0&to=9&calories=591-722&health=alcohol-free";
    let path = "tomato.json";

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
    console.log(data);
    console.log(recipeImg, recipeTitle);
    console.log(recipeTime, recipeCals);
    for (let i = 0; i < cards.length; i++) {
        console.log(cards[i]);
        cards[i].children[0].innerHTML = recipeTitle[i];
        cards[i].children[1].children[0].setAttribute("src", recipeImg[i]);

    }
}

