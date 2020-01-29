const API_KEY = "c7a302895e054e629add1f2d96bf5b3f";

document.getElementById("run").addEventListener("click", function () {
    let ingredientsInput = document.getElementById("ingredientsInput").value;

    async function getWine() {
        let response = await fetch(`https://api.spoonacular.com/food/wine/pairing?food=${ingredientsInput}&apiKey=${API_KEY}`);
        console.log(response);
        let data = await response.json();
        console.log(data);
    }

    getWine().catch(error => {
        console.log(error);
    });


    async function getRecipes() {
        let response2 = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsInput}&apiKey=${API_KEY}`);
        console.log(response2);
        let data = await response2.json();
        console.log(data);
    }

    getRecipes().catch(error => {
        console.log(error);
    });

});
//https://api.spoonacular.com/recipes/findByIngredients?ingredients
