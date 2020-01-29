const API_KEY = "c7a302895e054e629add1f2d96bf5b3f";

async function getWine(){
    let response = await fetch("https://api.spoonacular.com/food/wine/pairing?food=steak&apiKey=c7a302895e054e629add1f2d96bf5b3f");
    console.log(response);
    let data = await response.json();
    console.log(data);
}

getWine().catch(error => {
    console.log(error);
});
