/*
var request = new XMLHttpRequest();
const proxy = 'https://cors-anywhere.herokuapp.com/'; // in case there might be a forbidden access to the api

request.open('GET',`${proxy}https://api.globalwinescore.com/globalwinescores/latest/?vintage=&color=&is_primeurs=&lwin=&lwin_11=&limit=&offset=`);

request.setRequestHeader('Accept', 'application/json');
request.setRequestHeader('Authorization', 'Token 8e689f2febe19cd524501cb5ebe68014857dd108');
request.setRequestHeader( 'Access-Control-Allow-Origin', 'http://localhost:12345/index.html');

request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
    }
};

request.send();
*/

///////////////////////////////////////////////////////////////////
/*
let RESPONSE;
const proxy = 'https://cors-anywhere.herokuapp.com/'; // in case there might be a forbidden access to the api

async function postData(ingredientsInput) {
    // Default options are marked with *

    RESPONSE = await fetch (`https://api.globalwinescore.com/globalwinescores/latest/?wine_id=&vintage=&color=${ingredientsInput}&is_primeurs=&lwin=&lwin_11=&limit=&offset=`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 8e689f2febe19cd524501cb5ebe68014857dd108',
            //'Access-Control-Allow-Origin': 'http://localhost:12345/index.html'
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *client
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(RESPONSE);
    let data = await RESPONSE.json();
    console.log(data);// parses JSON response into native JavaScript objects
}

/!*postData(`https://api.globalwinescore.com/globalwinescores/latest/?wine_id=&vintage=&color=${ingredientsInput}&is_primeurs=&lwin=&lwin_11=&limit=&offset=`, { answer: 42 })
    .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });*!/

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        postData(ingredientsInput);
    });
})();*/

//////////////////////////////////////////////////////////////////////

/*const APPTOKEN = "8e689f2febe19cd524501cb5ebe68014857dd108";

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        getRecipes(ingredientsInput);
    });
})();

async function getRecipes(ingredient) {
    let path = "https://api.edamam.com/search?q=" + ingredient + "&" + APPTOKEN + "&from=0&to=3&calories=591-722&health=alcohol-free";
    const recipes = await fetch(path);
    const data = await recipes.json();
    console.log(data);
}*/


let RESPONSE;
const proxy = 'https://cors-anywhere.herokuapp.com/'; // in case there might be a forbidden access to the api

async function postData(url = '', data = {}) {
    // Default options are marked with *

    RESPONSE = await fetch (url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 8e689f2febe19cd524501cb5ebe68014857dd108',
            //'Access-Control-Allow-Origin': 'http://localhost:12345/index.html'
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *client
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(RESPONSE);
    return await RESPONSE.json(); // parses JSON response into native JavaScript objects
}

postData(`${proxy}https://api.globalwinescore.com/globalwinescores/latest/?wine_id=&vintage=&color=${ingredientsInput}&is_primeurs=&lwin=&lwin_11=&limit=&offset=`, { answer: 42 })
    .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });

(function () {
    document.getElementById("run").addEventListener("click", function() {
        let ingredientsInput = document.getElementById("ingredientsInput").value;
        postData(ingredientsInput);
    });
    console.log(RESPONSE);
})();

