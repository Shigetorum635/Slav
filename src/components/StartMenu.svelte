<script>
  import Select from "svelte-select";
  import { religions } from "./../lib/religions";
  import {
    generarColonos,
    colonos,
    generarEsclavos,
    esclavos,
    primeraVez,
    establecimiento,
  } from "./../lib/core";

  let visible = false;
  let text = undefined;
  let usingDefault = true;

  let colonyName;
  let currentReligion = {
    group: "orthodox",
    data: {
      icon: "fas fa-drumstick-bite",
      name: "",
      description:
        "",
      qualities: {
        canibalism: 0,
        slavery: 0,
        slaughter: 0,
        death: 0,
        prayers: 0,
        capture: 0,
        children: 0,
        sex: 0,
        racism: 0,
      },
      deidity: "",
    },
}

  let editorVisible = () => {
    visible = !visible;
    usingDefault = !usingDefault;
  };

  function handleSelect(event) {
    console.log(event);
    currentReligion = event.detail.data;
    text = event.detail.data.description;
  }

  function createColony() {
    generarColonos(currentReligion);
    generarEsclavos();
    establecimiento.set({
      nombre: colonyName,
      nomina: $esclavos.length * 10 + $colonos.length * 20,
      dinero: 2000,
    });
    $primeraVez = (false);
  }
</script>

<div>
  <div class="text-3xl text-center m-3">Bienvenido!</div>
  <div class="text-center text-lg font-bold">
    No hemos detectado ningun guardado. Crea tu colonia ahora!
  </div>
  <div class="text-center text-lg font-bold">Nombre de colonia:</div>
  <div class="text-center mx-auto">
    <input
      class="p-2 w-1/3 bg-black border focus:outline-none mx-auto text-center"
      type="text"
      name="nombre"
      id="nombre"
      bind:value={colonyName}
      placeholder="Nombre de colonia"
    />
  </div>

  <div class="text-center text-lg font-bold">Elige tu religion</div>
  {#if !visible}
    <div class="text-center w-1/3 bg-black themedSelect mx-auto">
      <Select
        items={religions}
        on:select={handleSelect}
        placeholder="Click aqui para seleccionar."
      />
    </div>
    <div class="text-center text-sm">"{text}"</div>
    <div
      on:click={editorVisible}
      class="text-center p-1 border-white border font-bold w-max mx-auto cursor-pointer hover:bg-white hover:text-black hover:underline transition-all duration-500"
    >
      Prefiero hacer mi religion
    </div>
  {/if}
  {#if visible}
    <div
      on:click={editorVisible}
      class="text-center p-1 border-white border font-bold w-max mx-auto cursor-pointer hover:bg-white hover:text-black hover:underline transition-all duration-500"
    >
      Usar Predeterminados
    </div>

    <div class="text-center text-lg font-bold mt-2">Tu Religion</div>
    <div class="text-center mx-auto">
      <input
        bind:value={currentReligion.data.name}
        class="p-2 w-1/3 bg-black border focus:outline-none mx-auto text-center"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre de la religion"
      />
    </div>

    <div class="text-center text-lg font-bold mt-2">
      Detalles de tu religion:
    </div>
    <div class="text-center mx-auto">
      <input
        bind:value={currentReligion.data.deidity}
        class="p-2 w-1/3 bg-black border focus:outline-none mx-auto text-center"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre de la deidad"
      />
    </div>

    <div class="text-center mx-auto">
      <input
        bind:value={currentReligion.denominacion}
        class="p-2 w-1/3 bg-black border focus:outline-none mx-auto text-center"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Denominacion"
      />
    </div>
    <div class="text-center">(Ateo, Cristiano...)</div>

    <div class="mx-auto container my-2 w-1/3">
      <div class="p-1 border">
        Esclavitud:

        <select
          bind:value={currentReligion.data.qualities.slavery}
          class="float-right bg-black rounded focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifica</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Canibalismo:
        <select
          bind:value={currentReligion.data.qualities.canibalism}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Asesinato (De otra gente):
        <select
          bind:value={currentReligion.data.qualities.slaughter}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Muerte (De otros colonos):
        <select
          bind:value={currentReligion.data.qualities.death}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifica</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Rezar:
        <select
          bind:value={currentReligion.data.qualities.prayers}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Capturar (Prisioneros):
        <select
          bind:value={currentReligion.data.qualities.capture}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Atraccion a menores:
        <select
          bind:value={currentReligion.data.qualities.children}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifica</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Sexo:

        <select
          bind:value={currentReligion.data.qualities.sex}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
      <div class="p-1 border">
        Racismo:
        <select
          bind:value={currentReligion.data.qualities.racism}
          class="bg-black rounded float-right focus:outline-none"
          name="esclavitud"
          id="esclavitud"
        >
          <option value="2">Honorifico</option>
          <option value="1">Ok</option>
          <option value="0">Mal</option>
          <option value="-1">Horrible</option>
        </select>
      </div>
    </div>
  {/if}
  <div
    on:click={createColony}
    class="text-center font-bold p-1 border w-max mx-auto my-2 hover:text-black cursor-pointer selection:select-none hover:bg-white hover:underline hover:ring-2 hover:ring-white transition-all duration-1000"
  >
    Comenzar
  </div>
</div>

<style>
  .themedSelect {
    --border: 1px solid white;
    --borderRadius: 0px;
    --placeholderColor: gray;
    --borderFocusColor: white;
    --height: 10px;
    --listBackground: black;
    --itemIsActiveColor: black;
    --margin: 5px;
    --padding: 10px;
    --background: black;
    --indicatorColor: white;
    --itemHoverBG: gray;
  }
</style>
