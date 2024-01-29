export function printPeoples(peoples, index = 0) {
    peoples.forEach((people) => {
        console.log(`${" --|".repeat(index)} ${people.isSeed ? "🦠" : ""} ${people.name} ${people.age} years ${(people.status == "Infected" ? "🧟" : "")}${(people.status == "Clean" ? "🤵" : "")}${(people.status == "Dead" ? "☠️" : "")} ${(people.imune.length > 0 ? " 💉 " + people.imune.join(" - ") : "")} ${people.type ? people.type : '-'}`)
        if (people.friends)
            printPeoples(people.friends, index + 1);
    })

}

export function showTitle(title) {
    console.log("-".repeat(title.length + 8) + "\n___ " + title + " ___\n" + "-".repeat(title.length + 8))
}