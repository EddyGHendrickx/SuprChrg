const API_KEY = "c7a302895e054e629add1f2d96bf5b3f";
let data;

document.getElementById("run").addEventListener("click", function () {
    let ingredientsInput = document.getElementById("ingredientsInput").value;

    async function getWine() {
        let response = await fetch(`https://api.spoonacular.com/food/wine/pairing?food=${ingredientsInput}&apiKey=${API_KEY}`);
        //console.log(response);
        data = await response.json();
        console.log(data);
    }

    getWine().catch(error => {
        console.log(error);
    });

    printWine(data);

});

function printWine(param) {
    document.getElementById("testing").innerHTML = param.pairingText;
    return param;
}
