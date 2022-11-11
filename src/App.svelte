<script>
  import StartMenu from "./components/StartMenu.svelte";
  import {
    colonos,
    esclavos,
    primeraVez,
    construcciones,
    establecimiento,
  } from "./lib/cTore";
  import { Logger } from "./lib/log";
  let colono;

  function loadSaveData() {
    let data = localStorage.getItem("data");
    return JSON.parse(data);
  }

  setInterval(() => {
    try {
      if ($primeraVez == true) return;
      $establecimiento.dinero += $establecimiento.nomina;
      Logger.info(
        `Injectado Nomina || {$primeraVez = ${$primeraVez}}`,
        "App.svelte",
        "Intervalo::Infrastructura"
      );
    } catch (err) {
      Logger.error(
        "Error injectando Nomina,",
        "App.svelte",
        "Intervalo::Infrastructura"
      );
    }
    // Todo vale dinerito asi que necesitamos la moneee
  }, 1000);
  function select(nombre, isSlave) {
    if(!isSlave) {
      let colonoMan = $colonos.find((colono) => colono.name == nombre);
    Logger.info(
      `Encontrado colono con nombre ${nombre}`,
      "App.svelte",
      "Finder::Colono"
    );
    return colono = colonoMan;
    }
    let colonoMan = $esclavos.find((colono) => colono.name == nombre);
    Logger.info(
      `Encontrado colono con nombre ${nombre}`,
      "App.svelte",
      "Finder::Colono"
    );
    colono = colonoMan;

  }

  const killColono = (nombre) => {
    let index = $colonos.findIndex((x) => x.name === nombre);
    $colonos.splice(index, 1);
    $colonos = $colonos;
  };
  const killEsclavo = (nombre) => {
    let index = $esclavos.findIndex((x) => x.name === nombre);
    $esclavos.splice(index, 1);
    $esclavos = $esclavos;
  };

  let data = loadSaveData();

  if (data === false || data == undefined || !data) {
    $primeraVez = true;
  } else {
    Logger.info(`Cargado datos.`, "App.svelte", "Data::Loader");
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

  function deleteSave() {
    try {
      colonos.set([]);
      esclavos.set([]);
      establecimiento.set({});
      construcciones.set([]);
      primeraVez.set(true);
      localStorage.clear(); // Fuck i
      Logger.info(`Datos borrados.`, "App.svelte", "Data::Burner");
    } catch (error) {
      console.log(error);
    }
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
    <div
      on:click={deleteSave}
      class="cursor-pointer transition-all duration-500  hover:ring ring-red-700 w-max  m-5 text-white font-bold p-1 bg-red-500 text-xl mx-auto text-center"
    >
      Borrar Partida
    </div>

    <div>
      <div class="text-center m-5">
        {#if colono !== undefined}

        {#if colono.colonist == false} 
        Esclavo Actual: 
        {:else} 
        Colonista Actual:  {/if}
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
              {#if colono}
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
              {#if colono.colonist == false}
              <div
              on:click={killEsclavo(colono.name)}
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-red-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Matar
              </div>
              {:else} 
              <div
              on:click={killColono(colono.name)}
                class="cursor-pointer  selection:select-none border-4 border-black p-1 m-1 mx-auto border-b-red-500 transition-all duration-100 transform-cpu hover:-translate-x-5"
              >
                Matar
              </div>]
              {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
      {#if isOpen}
        <div class="text-center border w-2/4 mx-auto ">
          <div class="font-bold underline">Mas Informacion</div>
          <div class="grid grid-cols-2">
            <div class="text-justify p-2 m-2">
              <div>Edad: {colono.edad}</div>
              <div>Religion: {colono.religion.name}</div>
              {#if colono.colonist == false}
                <div>Nivel de submission: {colono.submission}%</div>
              {/if}

              <div>Infancia: {colono.childhood.nombre}</div>
              <p class="text-left font-thing italic ">
                {colono.childhood.description}
              </p>
              <div>Infancia: {colono.adulthood.nombre}</div>
              <p class="text-left font-thing italic ">
                {colono.adulthood.description}
              </p>
            </div>
            <div>
              <div class="font-bold underline">Miembros</div>
              {#each Object.entries(colono.bodyParts) as [partName, partStatus]}
                {#if partStatus == true || partStatus == 1 || partStatus == 0}
                  <div class="text-green-500">{partName}</div>
                {:else if partStatus == false || partStatus <= 0}
                  <div class="text-red-500">{partName}</div>
                {/if}
              {/each}
            </div>
          </div>
        </div>
        <div class="text-center border w-2/4 mx-auto ">
          <div class="font-bold underline">Habilidades</div>
          {#each Object.entries(colono.stats) as [stat, valor]}
            {#if valor <= 0}
              <div class="text-white bg-red-500 p-1 m-1 w-2/4 mx-auto">
                {stat} => {valor}
              </div>
            {:else if valor >= 10}
              <div
                class="bg-yellow-500 text-white font-bold p-1 m-1 w-2/4 mx-auto"
              >
                {stat} => {valor}
              </div>
            {:else}
              <div class="text-white font-bold p-1 m-1 w-2/4 mx-auto">
                {stat} => {valor}
              </div>
            {/if}
          {/each}
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
                    on:click={select(colonizador.name, false)}
                    class="bg-blue-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                  >
                    Seleccionar
                  </div>
                  <div
                    class="bg-red-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                    on:click={killColono(colonizador.name)}
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
            {#each $esclavos as colonizador}
              <div class="p-3 border m-2 w-max mx-auto">
                <div>{colonizador.name}</div>
                <div>{colonizador.surname}</div>
                <div>Vida: {colonizador.health}%</div>

                <div class="space-y-2">
                  <div
                    on:click={select(colonizador.name, true)}
                    class="bg-blue-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                  >
                    Seleccionar
                  </div>
                  <div
                    class="bg-red-500 p-1 border-2 hover:bg-black hover:underline selection:select-none cursor-pointer transition-all duration-500"
                    on:click={killEsclavo(colonizador.name)}
                  >
                    Matar
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
