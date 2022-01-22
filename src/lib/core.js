var generarColonos, generarEsclavos, getRandomInt, numero;

import {
  writable,
  get
} from "svelte/store";

import {
  names,
  surnames
} from "./names";

import {
  infancia,
  adultez
} from "./backstories";

import {
  religions
} from "./religions";

import {
  Logger
} from "./log";

Logger.info("Loading files", "core.js", "Loader");

export var colonos = writable([]);

export var esclavos = writable([]);

export var primeraVez = writable(true);

export var religion = writable({});

Logger.info('Hello world!', "core.js", "I love this!!!!");

colonos.subscribe(function(value) {
  return Logger.info(`Colono han sido actualizados, hay ${value} colonos.`, "core.js", "Colonos::Subscriber");
});

esclavos.subscribe(function(value) {
  return Logger.info(`Los esclavos han sido actualizados, hay ${value} esclavos`);
});

export var establecimiento = writable([]);

export var construcciones = writable([]);

getRandomInt = function(min, max) {
  min = Maht.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min(+1))) + min;
};

generarColonos = function(religion) {
  var adultezDatos, agility, charisma, colonoNuevo, constitution, inestabilidad, infanciaDatos, strength;
  infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)];
  adultezDatos = adultez[Math.floor(Math.random() * adultez.length)];
  [strength, agility, constitution, charisma, inestabilidad] = [getRandomInt(-15, 15), getRandomInt(-15, 15), getRandomInt(-15, 15), getRandomInt(-15, 15), getRandomInt(-15, 15)];
  agility += infanciaDatos.statsBoost.agility;
  strength += infanciaDatos.statsBoost.strength;
  constitution += infanciaDatos.statsBoost.constitution;
  charisma += infanciaDatos.statsBoost.charisma;
  inestabilidad += infanciaDatos.statsBoost.inestabilidad;
  agility += adultezDatos.statsBoost.agility;
  strength += adultezDatos.statsBoost.strength;
  constitution += adultezDatos.statsBoost.constitution;
  charisma += adultezDatos.statsBoost.charisma;
  inestabilidad += adultezDatos.statsBoost.inestabilidad;
  colonoNuevo = {
    name: names[Math.floor(Math.random() * names.length)],
    surname: surnames[Math.floor(Math.random() * surnames.length)],
    hunger: 100,
    health: 100,
    edad: getRandomInt(20, 60),
    religion: religion,
    colonist: true,
    childHood: {
      nombre: infanciaDatos.name,
      description: infanciaDatos.description
    },
    adulthood: {
      nombre: adultezDatos.name,
      description: adultezDatos.description
    },
    bodyParts: {
      "Tongue": true,
      "Left Arm": true,
      "Right Arm": true,
      "Left Leg": true,
      "Right Leg": true,
      "Anus": true,
      "Reproductive Organ": Math.floor(Math.random() * 2), // 1 = penis and 0 =  vagina || -1 = vagina gone -2 = penis gone
      "Hands": true
    },
    organs: {
      "Left Kidney": true,
      "Right Kidney": true,
      "Liver": true,
      "Left Lung": true,
      "Right Lung": true,
      "Heart": true,
      "Stomach": true,
      "Lower Intestine": true,
      "Middle Intestine": true,
      "Panchreas": true
    },
    stats: {
      "Fuerza": strength,
      "Agilidad": agility,
      "Constitucion": constitution,
      "Carisma": charisma,
      "Estabilidad Mental": inestabilidad
    }
  };
  return colonos.update(function(colonos) {
    return [...colonos, colonoNuevo];
  });
};

getRandomInt = function(min, max) {
  min = Maht.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min(+1))) + min;
};

generarEsclavos = function() {
  var adultezDatos, agility, charisma, colonoNuevo, constitution, inestabilidad, infanciaDatos, strength;
  infanciaDatos = infancia[Math.floor(Math.random() * infancia.length)];
  adultezDatos = adultez[Math.floor(Math.random() * adultez.length)];
  [strength, agility, constitution, charisma, inestabilidad] = [getRandomInt(-15, 5), getRandomInt(-15, 5), getRandomInt(-15, 5), getRandomInt(-15, 5), getRandomInt(-15, 5)];
  agility += infanciaDatos.statsBoost.agility;
  strength += infanciaDatos.statsBoost.strength;
  constitution += infanciaDatos.statsBoost.constitution;
  charisma += infanciaDatos.statsBoost.charisma;
  inestabilidad += infanciaDatos.statsBoost.inestabilidad;
  agility += adultezDatos.statsBoost.agility;
  strength += adultezDatos.statsBoost.strength;
  constitution += adultezDatos.statsBoost.constitution;
  charisma += adultezDatos.statsBoost.charisma;
  inestabilidad += adultezDatos.statsBoost.inestabilidad;
  colonoNuevo = {
    name: names[Math.floor(Math.random() * names.length)],
    surname: surnames[Math.floor(Math.random() * surnames.length)],
    hunger: 100,
    health: 100,
    edad: getRandomInt(20, 60),
    colonist: false,
    religion: religions[Math.floor(Math.random() * religions.length)],
    childHood: {
      nombre: infanciaDatos.name,
      description: infanciaDatos.description
    },
    adulthood: {
      nombre: adultezDatos.name,
      description: adultezDatos.description
    },
    bodyParts: {
      "Tongue": true,
      "Left Arm": true,
      "Right Arm": true,
      "Left Leg": true,
      "Right Leg": true,
      "Anus": true,
      "Reproductive Organ": Math.floor(Math.random() * 2), // 1 = penis and 0 =  vagina || -1 = vagina gone -2 = penis gone
      "Hands": true
    },
    organs: {
      "Left Kidney": true,
      "Right Kidney": true,
      "Liver": true,
      "Left Lung": true,
      "Right Lung": true,
      "Heart": true,
      "Stomach": true,
      "Lower Intestine": true,
      "Middle Intestine": true,
      "Panchreas": true
    },
    stats: {
      "Fuerza": strength,
      "Agilidad": agility,
      "Constitucion": constitution,
      "Carisma": charisma,
      "Estabilidad Mental": inestabilidad
    }
  };
  return esclavos.update(function(esclavos) {
    return [...esclavos, colonoNuevo];
  });
};

if (1) {
  numero = 30;
}


//# sourceMappingURL=core.js.map
//# sourceURL=coffeescript