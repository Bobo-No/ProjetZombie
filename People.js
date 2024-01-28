
const names = ["Jerome",
    "Philippe",
    "Louis",
    "Henri",
    "Jean",
    "Clement",
    "Maxime",
    "Nicolas",
    "Quentin",
    "Malick",
    "Edgar",
    "Valentin"]

function generatePeople() {
    const isInfected = Math.random() * 100 % 100 < 10;
    let type;
    if (isInfected) {
        const rand = Math.round(Math.random() * 10 % 6);
        switch (rand) {
            case 0:
                type = "U";
                break;
            case 1:
                type = "32";
                break;
            case 2:
                type = "C";
                break;
            case 3:
            case 4:
                type = "A";
                break;
            case 5:
                type = "B";
                break;
        }

    }

    return {
        name: names[Math.round((Math.random() * 100 % (names.length - 1)))],
        age: Math.round(Math.random() * 100 % 50),
        status: isInfected ? "Infected" : "Clean",
        type: type,
        imune: [],
        isSeed: isInfected
    }

}


function generateFriend(people) {
    let updatedPeople = {...people};
    const haveFriend = (Math.random() * 100 % 100) < 20;

    if (haveFriend) {
        const nbFriend = Math.round(Math.random() * 10 % 6) + 1;
        updatedPeople.friends = []
        for (let i = 0; i < nbFriend; i++) {
            updatedPeople.friends.push(generateFriend(generatePeople()));
        }


    }
    return updatedPeople;
}

function generatePeoples(nbSeed) {
    const peoples = []
    for (let i = 0; i < nbSeed; i++) {
        peoples.push(generateFriend(generatePeople()));
    }
    return peoples;
}