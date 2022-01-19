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
    if (!data) return false;
    return JSON.parse(data);
  }

  setInterval(() => {
    $establecimiento.money += $establecimiento.nomina;
    // Todo vale dinerito asi que necesitamos la moneee
    console.log(`Nomina pagada.`);
  }, 1000)
  function select(nombre){
    console.log(nombre)
    let colonoMan = $colonos.find((colono) => colono.name == nombre)
    console.log(colonoMan)
    console.log(`Found colono with name ${colonoMan.name}`)
    colono =  colonoMan;
  }
  let data = loadSaveData();
  if (data === false) {
    $primeraVez = true;
  } else {
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
    localStorage.setItem("data", JSONData);
  }, 1000);
  let isOpen = false;

  function openMenu() {
    isOpen = !isOpen;
  }
</script>

<main>
  {#if $primeraVez}
    <StartMenu />
  {:else}
    <div class="text-center text-lg m-1 p-1">Crimenes de Guerra</div>
    <div
      class="text-center text-sm underline -my-3 bg-white text-black w-max mx-auto p-0.5"
    >
      Un juego de Izan Larumbe
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
              <div class="m-2 w-max border-b-4">Vida: 100%</div>
              <div class="m-2 w-max border-b-4">Moral: 100%</div>
              <div class="m-2 w-max border-b-4">Hambre: Bien alimentado</div>
              <div class="m-2 w-max border-b-4">
                Pensamiento: "Busco libertad"
              </div>
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
