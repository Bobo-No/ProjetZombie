export function vaccineAllWith(peoples, vaccin) {
    const peoplesUpdated = [...peoples];
    for (let i = 0; i < peoplesUpdated.length; i++) {
        peoplesUpdated[i] = vaccin(peoplesUpdated[i]);
        if (peoplesUpdated[i].friends) {
            peoplesUpdated[i].friends = vaccineAllWith(peoplesUpdated[i].friends, vaccin);
        }
    }
    return peoplesUpdated;
}

export function vaccinedA1(people) {
    let peopleUpdated = {...people};
    if (peopleUpdated.age <= 30 && peopleUpdated.status !== "Dead") {
        peopleUpdated.imune.push("A");
        peopleUpdated.imune.push("32");
        if (peopleUpdated.type === "A" || peopleUpdated.type === "32") {
            peopleUpdated.status = "Clean";
            peopleUpdated.type = null;
        }
    }
    return peopleUpdated;
}

export function vaccinedB1(people) {
    let peopleUpdated = {...people};
    const isDead = Math.round((Math.random()*100 % 100) )<20;
    if (isDead) {
        peopleUpdated.status = "Dead";
    }
    return peopleUpdated;

}

export function vaccinedU(people) {
    let peopleUpdated = {...people};
    if(peopleUpdated.status==="Dead")
        return peopleUpdated;
    peopleUpdated.status = "Clean"
    peopleUpdated.imune.push("U")
    return peopleUpdated;

}

export function isImuneTo(people, type) {
    return people.imune.filter(typeImune => type === typeImune) > 0;
}
