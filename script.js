(() => {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        async function getRecipes() {
            let path = `https://www.recipepuppy.com/api/?i=${ingredientsInput}`;
            const recipes = await fetch(path);
            const data = await recipes.json();
            console.log(data);
        }
        getRecipes();
    })
})();