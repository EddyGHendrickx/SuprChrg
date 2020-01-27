(() => {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        async function getRecipes() {
            let path = `http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3`;
            const recipes = await fetch(path, { mode: 'no-cors', headers: {'accept': '*/*'}});
            const data = await recipes.json();
            console.log(data);
        }
        getRecipes();
    })
})();