//This page will hold the data and information regarding home bases

function getHomeBaseObjects(player) {
    if (player == 1){
        var location = document.getElementById('playerBaseLocation').innerHTML;
    } else {
        var location = document.getElementById('playerBaseLocation2').innerHTML;
    }

    var HomeBase = {
        Location: location,
        HealthPoints: 200,
        MaxHealth: 200,
        Name: "Base" 
    };
    return HomeBase;
}

