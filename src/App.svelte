<script>
  import StartMenu from "./components/StartMenu.svelte";
  import {
    colonos,
    esclavos,
    primeraVez,
    construcciones,
    establecimiento,
  } from "./lib/core";
  let colono;
  function loadSaveData() {
    let data = localStorage.getItem("data");
    console.log(`DATA IS ${data}`)
    if (!data) {
      throw new Error('Data not found')    
    };
    return JSON.parse(data);
  }

  setInterval(() => {
    try {
      $establecimiento.dinero += $establecimiento.nomina;
      console.log(`Nomina pagada.`);
      console.log(`no ha habido error`)
    } catch (err) {
      console.log(`${err} Whoopsieeeee!!!`);
    }
    // Todo vale dinerito asi que necesitamos la moneee
  }, 1000);
  function select(nombre) {
    console.log(nombre);
    let colonoMan = $colonos.find((colono) => colono.name == nombre);
    console.log(colonoMan);
    console.log(`Found colono with name ${colonoMan.name}`);
    colono = colonoMan;
  }
  let data = loadSaveData();
  console.log(`Loaded data with: ${data}`)
  if (data === false || data == undefined || !data) {
    console.log(`Data doesnt exist}`)

    $primeraVez = true;
  } else {
    console.log(`Loaded data, ${data.colonos}`)
    $colonos = data.colonos;
    $esclavos = data.esclavos;
    $establecimiento = data.establecimiento;
    $construcciones = data.construcciones;
    $primeraVez = false;
  }
  setInterval(() => {
    if ($primeraVez) return;

    let JSONData = JSON.stringify({
      colonos: $colonos,
      esclavos: $esclavos,
      establecimiento: $establecimiento,
      construcciones: $construcciones,
    });
    document.localStorage["data"] = JSONData;
  }, 1000);
  let isOpen = false;

  function openMenu() {
    isOpen = !isOpen;
  }

  function deleteSave() {

    try {
      colonos.set([]);
      esclavos.set([]);
      establecimiento.set({});
      construcciones.set([]);
      primeraVez.set(true);
      localStorage.clear(); // Fuck i
      console.log("Data remvoed");
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  {#if $primeraVez || $colonos == undefined}
    <StartMenu />
  {:else}
    <div class="text-center text-lg m-1 p-1">Crimenes de Guerra</div>
    <div
      class="text-center text-sm underline -my-3 bg-white text-black w-max mx-auto p-0.5"
    >
      Un juego de Izan Larumbe
    </div>
    <div
      on:click={deleteSave}
      class="cursor-pointer transition-all duration-500  hover:ring ring-red-700 w-max  m-5 text-white font-bold p-1 bg-red-500 text-xl mx-auto text-center"
    >
      Borrar Partida
    </div>

    <div>
      <div class="text-center m-5">
        Esclavo Actual:
        {#if colono !== undefined}
          <div class="font-bold">{colono.name}</div>
        {:else}
          "No Seleccionado"
        {/if}
        <div
          id="yourMother"
          class="text-center grid grid-flow-col-dense overflow-x-scroll w-2/4 mx-auto"
        >
          <div class="bg-white text-black p-1 w-max mx-auto m-2 ">
            Dinero: {$establecimiento.dinero}$
          </div>
          <div class="bg-white text-black p-1 w-max mx-auto m-2">
            Dinero por segundo: {$establecimiento.nomina}
          </div>
          <div class="bg-white text-black p-1 w-max mx-auto m-2">
            Nombre de colonia: {$establecimiento.nombre}
          </div>
        </div>
        <div class="border w-2/4 mx-auto text-justify">
          <div class="grid grid-cols-2">
            <div class="m-1 p-1">
              {#if colono !== undefined}
                <div class="m-2 w-max border-b-4">Vida: {colono.health}%</div>
                <div class="m-2 w-max border-b-4">Moral: {colono.moral}%</div>
                <div class="m-2 w-max border-b-4">
                  Hambre:
                  {#if colono.hunger >= 90}
                    Bien Alimentado
                  {:else if colono.hunger < 90 && colono.hunger > 80}
                    Correctamente alimentado
                  {:else if colono.hunger < 80 && colono.hunger > 50}
                    Algo hambrieto
                  {:else if colono.hunger < 50 && colono.hunger > 30}
                    Hambriento
                  {:else if colono.hunger < 30 && colono.hunger > 20}
                    Bastante hambriento
                  {:else if colono.hunger < 20 && colono.hunger > 10}
                    Muy hambriento
                  {:else if colono.hunger < 10 && colono.hunger > 0}
                    Extremadamente hambriento
                  {:else if colono.hunger === 0}
                    Muerto de hambre.
                  {/if}
                </div>
                <div class="m-2 w-max border-b-4">
                  Pensamiento: "Busco libertad"
                </div>
              {:else}
                <div>Selecciona</div>
              {/if}
              <div
                class="m-2 w-max hover:underline cursor-pointer selection:select-none"
                on:click={openMenu}
              >
                Mas Informacion
              </div>
            </div>
            <div class="p-1 m-1">
              <div
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-green-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Alimentar
              </div>
              <div
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-indigo-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Torturar
              </div>
              <div
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-blue-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Otros
              </div>
              <div
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-red-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Matar
              </div>
            </div>
          </div>
        </div>
      </div>
      {#if isOpen}
        <div class="text-center border w-2/4 mx-auto ">
          <div class="font-bold underline">Mas Informacion</div>
          <div class="grid grid-cols-2">
            <div class="text-justify p-2 m-2">
              <div>Edad: 32 Anos</div>
              <div>Religion: Akiseitas</div>
              <div>Colonia de Origen: Barbarios</div>
              <div>Nivel de submission: 74%</div>
            </div>
            <div>
              <div class="font-bold underline">Miembros</div>

              <div class="text-green-500">Ano</div>

              <div class="text-green-500">Lengua</div>

              <div class="text-green-500">Brazos</div>
              <div class="text-green-500">Piernas</div>
            </div>
          </div>
        </div>
      {/if}
      <div class="grid grid-cols-2 w-2/4 mx-auto">
        <div class="border container mx-auto text-center">
          <div class="font-bold underline">Colonistas</div>
          <div class="grid grid-flow-col-dense overflow-x-scroll">
            {#each $colonos as colonizador}
              <div class="p-3 border m-2 w-max mx-auto">
                <div>{colonizador.name}</div>
                <div>{colonizador.surname}</div>
                <div>Vida: {colonizador.health}%</div>

                <div class="space-y-2">
                  <div
                    on:click={select(colonizador.name)}
                    class="bg-blue-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                  >
                    Seleccionar
                  </div>
                  <div
                    class="bg-red-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                  >
                    Matar
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="border container mx-auto text-center">
          <div class="font-bold underline">Esclavos</div>
          <div class="grid grid-flow-col-dense overflow-x-scroll">
            <div class="p-3 border m-2 w-max mx-auto">
              <div>Ahmed</div>
              <div>Vida 100%</div>
              <div>Estado Normal</div>
              <div class="space-y-2">
                <div
                  class="bg-blue-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                >
                  Seleccionar
                </div>
                <div
                  class="bg-red-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                >
                  Matar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
