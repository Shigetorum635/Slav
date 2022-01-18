import { writable, get } from 'svelte/store';
import { names, surnames } from './names';
import { infancia, adultez } from './backStories'
import { religions } from './religions';
export const colonos = writable([]);
export const esclavos = writable([]);
export const primeraVez = writable(true);
export const religion = writable({});



/**
 * Nombre de tu colonia, y otra informacion importante.
 */
export const establecimiento = writable({});
/**
 * Lista de construcciones.
 */
export const construcciones = writable([]);

/**
 * GetRandomInt
 * @param {number} min Minimun number to randomize to
 * @param {number} max Maximun Number to randomize to
 * @returns {number} randomInteger
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generarColonos(religion) {
    for (let i = 0; i < 5; i++) {
        let infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)]
        let adultezDatos = adultez[Math.floor(Math.random() * adultez.length)]
        let [strength, agility, constitution, charisma, inestabilidad] = [
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15)
        ]
        console.log(`${strength}, ${agility}, ${constitution}, ${charisma}, ${inestabilidad}`)
        // Apply Infancia 
        agility += infanciaDatos.statsBoost.agility
        strength += infanciaDatos.statsBoost.strength
        constitution += infanciaDatos.statsBoost.constitution
        charisma += infanciaDatos.statsBoost.charisma
        inestabilidad += infanciaDatos.statsBoost.inestabilidad
        // Apply Adultez.
        console.log('Done.')
        agility += adultezDatos.statsBoost.agility
        strength += adultezDatos.statsBoost.strength
        constitution += adultezDatos.statsBoost.constitution
        charisma += adultezDatos.statsBoost.charisma
        inestabilidad += adultezDatos.statsBoost.inestabilidad
        let colonoNuevo = {
            name: names[Math.floor(Math.random() * names.length)],
            surname: surnames[Math.floor(Math.random() * surnames.length)],
            health: 100,
            edad: getRandomInt(20, 60),
            religion: religion,
            childhood : {
                nombre: infanciaDatos.name,
                description: infanciaDatos.description
            },
            adulthood : {
                nombre: adultezDatos.name,
                description: adultezDatos.description
            },
            moral: 100,
            bodyParts: {
                "Tongue" : true,
                "Left Arm": true,
                "Right Arm": true,
                "Left Leg": true,
                "Right Leg": true,
                "Anus" : true,
                "Reproductive Organ" : Math.floor(Math.random() * 2 ) === 1 ? "Penis" : "Vagina", // 1 = penis and 0 =  vagina
                "Hands" : true
            },
            organs: {
                "Left Kidney" : true,
                "Right Kidney" : true,
                "Liver" : true,
                "Left Lung" : true,
                "Right Lung" : true,
                "Heart" : true,
                "Stomach" : true,
                "Lower Intestine" : true,
                "Middle Intestine" : true,
                "Panchreas" : true,
            },
            stats: {
                strength,
                agility,
                constitution,
                charisma,
                inestabilidad
            }

        }
        console.log(`Colono #${i}:`)
        console.table(colonoNuevo)
        colonos.update(colono => [...colono, colonoNuevo])
    }
}


export function generarEsclavos() {
    /**
     *             strength: 2,
            agility: 5,
            constitution: 3,
            charisma: -2,
            inestabilidad: 0
     */
    for (let i = 0; i < 1; i++) {
        let infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)]
        let adultezDatos = adultez[Math.floor(Math.random() * adultez.length)]
        let [strength, agility, constitution, charisma, inestabilidad] = [
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15),
            getRandomInt(-15, 15)
        ]
        console.log(`${strength}, ${agility}, ${constitution}, ${charisma}, ${inestabilidad}`)
        // Apply Infancia 
        agility += infanciaDatos.statsBoost.agility
        strength += infanciaDatos.statsBoost.strength
        constitution += infanciaDatos.statsBoost.constitution
        charisma += infanciaDatos.statsBoost.charisma
        inestabilidad += infanciaDatos.statsBoost.inestabilidad
        // Apply Adultez.
        console.log('Done.')
        agility += adultezDatos.statsBoost.agility
        strength += adultezDatos.statsBoost.strength
        constitution += adultezDatos.statsBoost.constitution
        charisma += adultezDatos.statsBoost.charisma
        inestabilidad += adultezDatos.statsBoost.inestabilidad

        let esclavoNuevo = {
            name: names[Math.floor(Math.random() * names.length)],
            surname: surnames[Math.floor(Math.random() * surnames.length)],
            edad: getRandomInt(20, 60),
            religion: religions[Math.floor(Math.random() * religions.length)],
            moral: 100,
            stats: {
                strength,
                agility,
                constitution,
                charisma,
                inestabilidad
            }
        }
        console.log(`Esclavo #${i}:`)
        console.table(esclavoNuevo)
        esclavos.update((esclavo) => [...esclavo, esclavoNuevo])
    }
}

export function randomizeReligion() {
    return religions[Math.floor(Math.random() * religions.length)];
}

primeraVez.subscribe((value) => {
    console.log(`Primera vez ha cambiado.`)
})
