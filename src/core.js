import { writable } from 'svelte/store';
import { names, surnames } from './lib/names';
import { infancia, adultez } from './lib/backStories'
import { religions } from './lib/religions';
export const colonos = writable([]);
export const esclavos = writable([]);
export const primeraVez = writable(true);
export const religion = writable({});

// Inner check for whereas user is new or not.
const data = localStorage.getItem('data');
if (!data) primeraVez.set(true);

/**
 * Nombre de tu colonia, y otra informacion importante.
 */
export const establecimiento = writable({});
/**
 * Lista de construcciones.
 */
export const construcciones = writable([]);


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generarColonos(religion) {
    let colonos = [];
    for (let i = 0; i < 5; i++) {
        let colono = {
            name: names[Math.floor(Math.random() * names.length)],
            surname: surnames[Math.floor(Math.random() * surnames.length)],
            edad: getRandomInt(20, 60),
            religion: religion,
            moral: 100,
            infancia: infancia[Math.floor(Math.random() * infancia.length)],
            adultez: adultez[Math.floor(Math.random() * adultez.length)]
        }
        console.log(`Colono #${i}:`)
        console.table(colono)
        colonos.push(colono)
    }

    return colonos
}

export function loadSaveData(){
    let data = localStorage.getItem('data');
    if(!data) return false;
    return JSON.parse(data);
}

export function generarEsclavos() {
    let esclavos = [];
    for (let i = 0; i < 1; i++) {
        let esclavo = {
            name: names[Math.floor(Math.random() * names.length)],
            surname: surnames[Math.floor(Math.random() * surnames.length)],
            edad: getRandomInt(20, 60),
            religion: religions[Math.floor(Math.random() * religions.length)],
            moral: 100,
            infancia: infancia[Math.floor(Math.random() * infancia.length)],
            adultez: adultez[Math.floor(Math.random() * adultez.length)]
        }
        console.log(`Esclavo #${i}:`)
        console.table(esclavo)
        esclavos.push(esclavo)
    }

    return esclavos
}

export function randomizeReligion() {
  return religions[Math.floor(Math.random() * religions.length)];
}

primeraVez.subscribe((value) => {
    console.log(`Primera vez ha cambiado.`)
})
