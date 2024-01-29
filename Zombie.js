import {infection,pandemieAccumulator,isInfectedBy} from "./Infection.js"
import {showTitle,printPeoples} from "./Printer.js"
import {vaccineAllWith, vaccinedA1,vaccinedB1, vaccinedU} from "./Vaccin.js";
import {People} from "./People.js";



let peoples=[
    new People("Phil",5)
        .addFriend(new People("Jack",254))
        .addFriend(new People("Jack1",254)
            .addFriend(new People("Frank",254))
            .addFriend(new People("Frank1",254))
            .addFriend(new People("Frank2",254))
            .addFriend(new People("Frank3",254)))
        .addFriend(new People("Jack2",254))
        .addFriend(new People("Jack3",254))
]


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