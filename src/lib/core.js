import { writable, get } from "svelte/store";
import { names, surnames } from "./names";
import { infancia, adultez } from "./backstories";
import { religions } from "./religions";
import { Logger } from "./log";

Logger.info("Loading files", "core.js", "Loader");
export const colonos = writable([]);
export const esclavos = writable([]);
export const primeraVez = writable(true);
export const religion = writable({});

colonos.subscribe((value) => {
  Logger.info(
    `Colono han sido actualizados, hay ${value} colonos.`,
    "core.js",
    "Colonos::Subscriber"
  );
});
esclavos.subscribe((value) => {
  Logger.info(
    `Los esclavos han sido actualizados, hay ${value.length} esclavos.`,
    "core.js",
    "Esclavos::Subscriber"
  );
});

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
    let infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)];
    let adultezDatos = adultez[Math.floor(Math.random() * adultez.length)];
    let [strength, agility, constitution, charisma, inestabilidad] = [
      getRandomInt(-15, 15),
      getRandomInt(-15, 15),
      getRandomInt(-15, 15),
      getRandomInt(-15, 15),
      getRandomInt(-15, 15),
    ];

    // Apply Infancia
    agility += infanciaDatos.statsBoost.agility;
    strength += infanciaDatos.statsBoost.strength;
    constitution += infanciaDatos.statsBoost.constitution;
    charisma += infanciaDatos.statsBoost.charisma;
    inestabilidad += infanciaDatos.statsBoost.inestabilidad;
    // Apply Adultez.
    agility += adultezDatos.statsBoost.agility;
    strength += adultezDatos.statsBoost.strength;
    constitution += adultezDatos.statsBoost.constitution;
    charisma += adultezDatos.statsBoost.charisma;
    inestabilidad += adultezDatos.statsBoost.inestabilidad;


    let colonoNuevo = {
      name: names[Math.floor(Math.random() * names.length)],
      surname: surnames[Math.floor(Math.random() * surnames.length)],
      hunger: 100,
      health: 100,
      edad: getRandomInt(20, 60),
      religion: religion,
      colonist: true,
      childhood: {
        nombre: infanciaDatos.name,
        description: infanciaDatos.description,
      },
      adulthood: {
        nombre: adultezDatos.name,
        description: adultezDatos.description,
      },
      moral: 100,
      bodyParts: {
        Tongue: true,
        "Left Arm": true,
        "Right Arm": true,
        "Left Leg": true,
        "Right Leg": true,
        Anus: true,
        "Reproductive Organ": Math.floor(Math.random() * 2), // 1 = penis and 0 =  vagina || -1 = vagina gone -2 = penis gone
        Hands: true,
      },
      organs: {
        "Left Kidney": true,
        "Right Kidney": true,
        Liver: true,
        "Left Lung": true,
        "Right Lung": true,
        Heart: true,
        Stomach: true,
        "Lower Intestine": true,
        "Middle Intestine": true,
        Panchreas: true,
      },
      stats: {
        Fuerza: strength,
        Agilidad: agility,
        Constitucion: constitution,
        Carisma: charisma,
        "Estabilidad Mental": inestabilidad,
      },
    }; // Finishes the object.

    colonos.update((colonos) => [...colonos, colonoNuevo]);

  }

}

export function generarEsclavos() {
  for (let i = 0; i < 2; i++) {
      let infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)];
      let adultezDatos = adultez[Math.floor(Math.random() * adultez.length)];
      let [strength, agility, constitution, charisma, inestabilidad] = [
          getRandomInt(-15, 15),
          getRandomInt(-15, 15),
          getRandomInt(-15, 15),
          getRandomInt(-15, 15),
          getRandomInt(-15, 15),
      ];

      // Apply Infancia
      agility += infanciaDatos.statsBoost.agility;
      strength += infanciaDatos.statsBoost.strength;
      constitution += infanciaDatos.statsBoost.constitution;
      charisma += infanciaDatos.statsBoost.charisma;
      inestabilidad += infanciaDatos.statsBoost.inestabilidad;
      // Apply Adultez.
      agility += adultezDatos.statsBoost.agility;
      strength += adultezDatos.statsBoost.strength;
      constitution += adultezDatos.statsBoost.constitution;
      charisma += adultezDatos.statsBoost.charisma;
      inestabilidad += adultezDatos.statsBoost.inestabilidad;

      let esclavoNuevo = {
          name: names[Math.floor(Math.random() * names.length)],
          surname: surnames[Math.floor(Math.random() * surnames.length)],
          health: 100,
          submission: getRandomInt(30, 60),
          hunger: 100,
          edad: getRandomInt(20, 60),
          colonist: false,
          religion: religions[Math.floor(Math.random() * religions.length)],
          moral: 100,
          childhood: {
              nombre: infanciaDatos.name,
              description: infanciaDatos.description,
          },
          adulthood: {
              nombre: adultezDatos.name,
              description: adultezDatos.description,
          },
          moral: 100,
          bodyParts: {
              Tongue: true,
              "Left Arm": true,
              "Right Arm": true,
              "Left Leg": true,
              "Right Leg": true,
              Anus: true,
              "Reproductive Organ": Math.floor(Math.random() * 2), // 1 = penis and 0 =  vagina || -1 = vagina gone -2 = penis gone
              Hands: true,
          },
          organs: {
              "Left Kidney": true,
              "Right Kidney": true,
              Liver: true,
              "Left Lung": true,
              "Right Lung": true,
              Heart: true,
              Stomach: true,
              "Lower Intestine": true,
              "Middle Intestine": true,
              Panchreas: true,
          },
          stats: {
              Fuerza: strength,
              Agilidad: agility,
              Constitucion: constitution,
              Carisma: charisma,
              "Estabilidad Mental": inestabilidad,
          },
      }; // Finishes the object

      esclavos.update((esclavo) => [...esclavo, esclavoNuevo]);
  }
}
export function randomizeReligion() {
  return religions[Math.floor(Math.random() * religions.length)];
}

primeraVez.subscribe((value) => {
  Logger.info(
    `primeraVez ha cambiado a ${value}.`,
    "core.js",
    "PrimeraVez::Subscriber"
  );
});
