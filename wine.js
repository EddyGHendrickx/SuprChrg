const API_KEY = "c7a302895e054e629add1f2d96bf5b3f";
let data;

document.getElementById("run").addEventListener("click", function () {
    let ingredientsInput = document.getElementById("ingredientsInput").value;

    async function getWine() {
        let response = await fetch(`https://api.spoonacular.com/food/wine/pairing?food=${ingredientsInput}&apiKey=${API_KEY}`);
        //console.log(response);
        data = await response.json();
        console.log(data);
        console.log(data.pairedWines);
        console.log(data.pairingText);
        console.log(data.productMatches);
        printWine(data);
    }

    getWine().catch(error => {
        console.log(error);
    });

});

function printWine(param) {
    if (param.pairedWines.length == 0 && param.productMatches.length == 0 && param.pairingText == "") {
        document.getElementById("pairingText").innerHTML = "freestyle your drinks";
    } else if (param.pairedWines.length == 0 && param.productMatches.length == 0){
        document.getElementById("pairingText").innerHTML = param.pairingText;
    }
    else {
        document.getElementById("pairingText").innerText = param.pairingText;
        for (let i = 0; i < param.pairedWines.length; i++)
        {
            document.getElementById("pairedWines").innerHTML = param.pairedWines[i];
        }
    }

    return param;
}
