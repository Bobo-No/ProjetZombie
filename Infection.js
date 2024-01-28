 import {isImuneTo} from "./Vaccin.js"

export function infection(friendStatus, parentStatus, conditionOnInfection, sameGroupStatus, onlyLastStatus, type) {
  let cache={};
    let infectioning = (parent, group) => {
        let parentUpdated = parent ? {...parent} : null;
        let groupUpdated = group ? [...group] : null;

        if(groupUpdated in cache){
            console.info("Cached");
            return cache[groupUpdated];
        }

        if (parentUpdated == null) {
            cache[groupUpdated]=infectFirst(infectioning,parentUpdated,groupUpdated,type);
            return cache[groupUpdated];
        }
        if (friendStatus && groupUpdated) {
            return infectChilds(infectioning,parentUpdated,groupUpdated,type,friendStatus,conditionOnInfection);
        }

        if (parentStatus) {
            return infectParents(infectioning,parentUpdated,groupUpdated,type,parentStatus,conditionOnInfection);
        }

        if (sameGroupStatus && groupUpdated) {
            return infectSameGroup(infectioning,parentUpdated,groupUpdated,type,sameGroupStatus);
        }

        if (onlyLastStatus && groupUpdated) {
        return infectOnlyTheLast(infectioning,parentUpdated,groupUpdated,type,onlyLastStatus);
        }

        console.warn("No trigger")
        return [parentUpdated, groupUpdated, false];
    }
    return infectioning;
}

function infectFirst(infectioning,parent, group,type){
    let parentUpdated = parent ? {...parent} : null;
    let groupUpdated = group ? [...group] : null;
    for (let i = 0; i < groupUpdated.length; i++) {
        let accumulator = infectioning(groupUpdated[i], groupUpdated[i].friends);

        groupUpdated[i] = accumulator[0];
        if (accumulator[2]) {
            groupUpdated[i] = infectPeople(groupUpdated[i], type);
        }
        groupUpdated[i].friends = accumulator[1];
    }
    return [parentUpdated, groupUpdated,false];
}



function infectChilds(infectioning,parent, group,type,friendStatus,conditionOnInfection){
    let parentUpdated = parent ? {...parent} : null;
    let groupUpdated = group ? [...group] : null;
    for (let i = 0; i < groupUpdated.length; i++) {
        if (groupUpdated[i].friends) {
            groupUpdated[i] = infectioning(groupUpdated[i], groupUpdated[i].friends)[0];
        }
    }
    let aFriendsIsInfected = groupUpdated.filter(people => friendStatus(people)).length > 0;
    if (aFriendsIsInfected) {
        if (conditionOnInfection(parentUpdated)) {
            parentUpdated = infectPeople(parentUpdated, type);
        }
    }
    return [parentUpdated, groupUpdated,false];
}
function infectParents(infectioning,parent, group,type,parentStatus,conditionOnInfection){
    let parentUpdated = parent ? {...parent} : null;
    let groupUpdated = group ? [...group] : null;
    let parentIsInfected = parentStatus(parentUpdated);
    if (parentIsInfected && groupUpdated) {
        for (let i = 0; i < groupUpdated.length; i++) {
            if (conditionOnInfection(groupUpdated[i])) {
                groupUpdated[i] = infectPeople(groupUpdated[i], type);
            }
            groupUpdated[i].friends = infectioning(groupUpdated[i], groupUpdated[i].friends)[1];
        }
    }
    if (!parentIsInfected && groupUpdated) {
        for (const element of groupUpdated) {
            if (element.friends)
                element.friends = infectioning(element, element.friends)[1];
        }
    }
    return [parentUpdated, groupUpdated,false];
}

function infectSameGroup(infectioning,parent, group,type,sameGroupStatus){
    let parentUpdated = parent ? {...parent} : null;
    let groupUpdated = group ? [...group] : null;
    const groupContainAnInfected = groupUpdated.filter(people => isInfectedBy(people, type)).length > 0;
    for (let i = 0; i < groupUpdated.length; i++) {
        if (groupContainAnInfected && sameGroupStatus(groupUpdated[i], i)) {
            groupUpdated[i] = infectPeople(groupUpdated[i], type);
        }
        if (groupUpdated[i].friends) {
            groupUpdated[i].friends = infectioning(groupUpdated[i], groupUpdated[i].friends)[1];
        }
    }
    return [parentUpdated, groupUpdated,false];
}

function infectOnlyTheLast(infectioning,parent, group,type,onlyLastStatus){
    let parentUpdated = parent ? {...parent} : null;
    let groupUpdated = group ? [...group] : null;
    for (const element of groupUpdated) {
        if (onlyLastStatus(element)) {
            return [parentUpdated, groupUpdated, true];
        }
        if (element.friends) {
            return [parentUpdated, groupUpdated, infectioning(element, element.friends)[2]];
        }
    }
    return [parentUpdated, groupUpdated,false];
}







export function pandemieAccumulator(peoples, infections) {
    let precedentResult = [...peoples];
    for (const element of infections) {
        precedentResult = element(null, precedentResult)[1];
    }
    return precedentResult;
}

 export function isInfectedBy(people, type) {
    return people.status === "Infected" && people.type === type
}


function infectPeople(people, type) {
    if (people.status != "Dead" && people.status != "Infected" && !isImuneTo(people, type)) {
        return {
            ...people,
            status: "Infected",
            type: type
        };
    }
    return people;
}