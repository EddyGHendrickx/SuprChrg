let buttons = document.querySelectorAll(".carouselBtn");
let nxtBtn = document.getElementById("nxtBtn");
let prvBtn = document.getElementById("prvBtn");
let page = 1;
const APPID = "app_id=dead107b&app_key=f41a8806635125b308ec8fb021456e20";
let cards = document.getElementsByClassName("cards");
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

