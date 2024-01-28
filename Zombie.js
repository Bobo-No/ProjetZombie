import {infection,pandemieAccumulator,isInfectedBy} from "./Infection.js"
import {showTitle,printPeoples} from "./Printer.js"
import {vaccineAllWith, vaccinedA1,vaccinedB1, vaccinedU} from "./Vaccin.js";

let peoples = [{
    name: "1", age: "20", status: "Clean", isSeed: false, imune: [], friends: [{
        name: "2", age: "40", status: "Clean", isSeed: false, imune: [], friends: [{
            name: "3", age: 3, status: "Infected", type: "U", isSeed: true, imune: [], friends: [{
                name: "5", age: "40", status: "Infected", isSeed: false, type: "C", imune: []
            }, {
                name: "4", age: "20", status: "Clean",

                isSeed: false, imune: []
            },

                {
                    name: "6", age: "40", status: "Clean", isSeed: false, imune: []
                }]
        }]
    }]
}]
const calculA = (people) => isInfectedBy(people, "A");
let virusA = infection(null, calculA, null, null, null, "A");
const calculB = (people) => isInfectedBy(people, "B");
let virusB = infection(calculB, null, null, null, null, "B");
const calcul32 = (people) => people.age >= 32;
const calcul322 = (people) => isInfectedBy(people, "32");
let virus32 = infection(calcul322, calcul322, calcul32, null, null, "32");
const calculC = (people, i) => i % 2;
let virusC = infection(null, null, null, calculC, null, "C");
const calculUltime = (people) => isInfectedBy(people, "U");
let virusUltime = infection(null, null, null, null, calculUltime, "U");


showTitle("After infection")
let infected = pandemieAccumulator(peoples, [virusUltime, virusA, virusB, virusC, virus32])
printPeoples(infected)
showTitle("After Viccination")
let vaccinedWithA1 = vaccineAllWith(infected,vaccinedA1)
let vaccinedWithB1 = vaccineAllWith(vaccinedWithA1,vaccinedB1)
let vaccinedWithU = vaccineAllWith(vaccinedWithB1,vaccinedU)
printPeoples(vaccinedWithU);