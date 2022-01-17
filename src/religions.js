/**
 * -1 = Horrific
 * 0 = Bad,
 * 1 = Ok,
 * 2 = Honored
 */
export const religions = [
  {
    value: "kebaismo",
    label: "Kebaismo",
    group: "orthodox",
    data: {
      icon: "fas fa-drumstick-bite",
      name: "Kebaismo",
      description:
        "Adictos al Kripto Elemento Bicarnico Alimenticio Basto, carnivoros y adoran el canibalismo.",
      qualities: {
        canibalism: 2,
        slavery: 2,
        slaughter: 2,
        death: 2,
        prayers: -1,
        capture: -1,
        children: -1,
        sex: 1,
        racism: 0,
      },
      deidity: "Zengin",
    },
  },
  {
    value: "mikroismo",
    label: "Mirkoismo",
    data: {
      icon: "fas fa-child",
      name: "Mikroismo",
      description: "Las deidades de esta religion son menores de edad.",
      qualities: {
        canibalism: -1,
        slavery: 1,
        slaughter: -1,
        death: -1,
        prayers: 2,
        capture: 2,
        children: 2,
        sex: 2,
        racism: 0,
      },
      deidity: "Paidia",
    },
  },
  {
    value: "principatus",
    label: "Alba Principatus",
    data: {
      icon: "fab fa-affiliatetheme",
      name: "Alba principatus",
      description:
        "Grupo fascista dominante, que invade a otras colonias en busca de razas desconocidas que subjugar.",
      qualities: {
        canibalism: -1,
        slavery: 2,
        slaughter: 2,
        death: -1,
        prayers: 2,
        capture: 2,
        children: 2,
        sex: 0,
        racism: 2,
      },
      deidity: "Diakrisi",
    },
  },
  {
    value: "ultima",
    label: "Ultima",
    data: {
      icon: "fas fa-khanda",
      name: "Ultima",
      description: "Rezamos y Luchamos por nuestro Rey y Dios! Ultima!",
      qualities: {
        canibalism: -1,
        slavery: -1,
        slaughter: 2,
        death: -1,
        prayers: 2,
        capture: 2,
        children: -1,
        sex: -1,
        racism: -1,
      },
      deidity: "Ultima",
    },
  },
  {
    value: "ministicism",

    label: "Ministicism",
    data: {
      icon: "fab fa-angellist",
      name: "Ministicism",
      description: "Una religion no religion. Cientologia en su maximo explendor!",
      qualities: {
        canibalism: -1,
        slavery: -1,
        slaughter: -1,
        death: -1,
        prayers: 1,
        capture: 2,
        children: 0,
        sex: 1,
        racism: -1,
      },
      deidity: "Ministica",
    },
  },
];

export function randomizeReligion() {
  return religions[Math.floor(Math.random() * religions.length)];
}
console.log(Math.floor(Math.random() * religions.length));
