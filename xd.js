export function generarEsclavos() {
    for (let i = 0; i < 1; i++) {
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

        Logger.info(
            `Esclavo numero ${i} ha sido calculado.`,
            "core.js",
            "Generar::Esclavos"
        );
        esclavos.update((esclavo) => [...esclavo, esclavoNuevo]);
    }
}