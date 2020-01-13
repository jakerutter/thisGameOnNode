//This page will hold the data and information regarding home bases

function getHomeBaseObject() {
    var location = document.getElementById('playerBaseLoc').innerHTML;

    var HomeBase = {
        Location: location,
        HealthPoints: 200,
        MaxHealth: 200,
        Name: "Base" 
    };

    return HomeBase;
}

