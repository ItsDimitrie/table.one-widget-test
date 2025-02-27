<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AmountPeople from './components/AmountPeople.vue';
import ReservationForm from './components/ReservationForm.vue';
import DatePicker from './components/DatePicker.vue';
import TimePicker from './components/TimePicker.vue';

const isWidgetOpen = ref(false);
const peopleSelector = ref(false);
const isFormOpen = ref(false);
const isDateOpen = ref(false);
const isTimerOpen = ref(false)

// Krijg data van de Embed.js
const params = new URLSearchParams(window.location.search);
const restaurantId = params.get('restaurantId');
const color = params.get('color')
let tailwindColor = 'bg-blue-200 bg-red-200 bg-green-200 bg-orange-200'

// Voor de proof of concept zijn er 3 kleuren
function changeWidgetColor() {
  if (color === 'blue') {
    tailwindColor = 'blue'
 console.log(tailwindColor)
  } else if (color === 'red') {
    tailwindColor = 'red'
  } else if (color === 'green') {
    tailwindColor = 'green';
  } else if  (color === 'orange') {
    tailwindColor = 'orange';
  } else {
    tailwindColor = 'Ghost'
  }
}


const Placeholder =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D';

const state = {
  button: { width: '20vw', height: '10vh' },
  tickets: { width: '23vw', height: '90vh' },
  reseveren: { width: '62vw', height: '90vh' },
  mobile: {
    button: { width: '80vw', height: '8vh' },
    tickets: { width: '90vw', height: '85vh' },
    reseveren: { width: '95vw', height: '90vh' }
  },
};

function isMobile() {
  return window.innerWidth <= 768;
}
function sendSizeUpdate() {
  let newState = isMobile() ? state.mobile.button : state.button;

  if (isWidgetOpen.value && isFormOpen.value) {
    newState = isMobile() ? state.mobile.reseveren : state.reseveren;
  } else if (isWidgetOpen.value) {
    newState = isMobile() ? state.mobile.tickets : state.tickets;
  }

  window.parent.postMessage(
    { type: 'resizeWidget', width: newState.width, height: newState.height },
    '*'
  );
}

function toggleAmountPeople() {
  peopleSelector.value = !peopleSelector.value;
}

function toggleForm() {
  isFormOpen.value = !isFormOpen.value;
  sendSizeUpdate();
}

function toggleDatePicker() {
  isDateOpen.value = !isDateOpen.value;
}

function toggleTimePicker() {
  isTimerOpen.value = !isTimerOpen.value;
}

function closeWidget() {
  isWidgetOpen.value = false;
  sendSizeUpdate();
}

function toggleWidget() {
  changeWidgetColor();
  isWidgetOpen.value = !isWidgetOpen.value;
  sendSizeUpdate();

}

onMounted(() => {
  sendSizeUpdate()
  console.log('Widget color:', color);});
</script>


<template>
  <h1 class=text-white></h1>
  <div class="fixed bottom-6 right-6">
    <!-- Button state -->
    <div
      v-if="!isWidgetOpen && !isFormOpen"
      class="bg-pink-100 text-black rounded-xl pl-6 pr-6 pt-2 pb-2 shadow-lg hover:bg-red-200 fixed bottom-6 right-6 flex items-center"
      @click="toggleWidget"
    >
      <img src="../public/android-chrome-192x192.png" alt="Logo" class="max-h-8 max-w-20 mr-2 border-r-2 border-gray-300 pr-2" />
      <p>Reserveren</p>
    </div>

    <!-- Widget Open state content -->
    <transition name="fade">
      <div
        v-if="isWidgetOpen && !isFormOpen"
        :class="`widget-container bg-${tailwindColor}-200 border border-white/20 p-5 rounded-2xl shadow-lg max-h-[95vh] overflow-y-auto`"
      >
        <div>
          <div :class="`sticky top-0 bg-${tailwindColor}-200`">
          <!-- Header with close button -->
          <div class="flex justify-between items-center">
            <i
              type="button"
              class="pi pi-times text-red-500 text-2xl p-1 rounded-2xl"
              @click="closeWidget"
            ></i>
            <p class="text-white">{{ restaurantId }}</p>
          </div>

          <!-- Inputs aantal mensen -->
          <div class="space-y-2 mt-4 text-black ">
            <div class="bg-white rounded-md p-2 relative">
              <label class="pl-1 pr-5 text-sm italic">Personen</label>
              <button type="button" class="absolute right-2" @click="toggleAmountPeople">
                <i class="pi pi-angle-down"></i>
              </button>
              <div v-if="peopleSelector" class="absolute mt-5 left-0 border-bottom rounded-2xl bg-white z-10">
                <AmountPeople />
              </div>
            </div>

            <!--Datum-->
            <div class="bg-white rounded-md p-2 relative">
              <label class="pl-1 pr-5 text-sm italic">Datum</label>
              <button type="button" class="absolute right-2" @click="toggleDatePicker">
                <i class="pi pi-angle-down"></i>
              </button>
              <div v-if="isDateOpen" class="bg-red-200">
                <DatePicker />
              </div>
            </div>

            <!--Tijd-->
            <div class="bg-white rounded-md p-2 relative">
              <label class="pl-1 pr-5 text-sm italic">Tijd</label>
              <button type="button" class="absolute right-2" @click="toggleTimePicker">
                <i class="pi pi-angle-down"></i>
              </button>
              <div v-if="isTimerOpen" class="">
                <TimePicker />
            </div>
          </div>

          <button
            type="button"
            class="bg-white text-black font-extrabold rounded-md p-2 mt-4 w-full">
            Toon beschikbare opties
          </button>

          <div class="overflow-y-auto mt-4">
            <div class="relative flex justify-center">
              <div class="bg-white text-black opacity-70 text-sm px-3 py-1 rounded-lg relative">
                Suggesties
              </div>
            </div>
          </div>
          </div>
          </div>

          <!-- Tickets  -->
          <div
            v-for="index in 4"
            :key="index"
            class="rounded-2xl shadow-lg bg-white overflow-hidden mt-4 hover:bg-pink-100">
            <button type="button" @click="toggleForm">
              <img
                :src="Placeholder"
                alt="Test Titel"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h2 class="text-lg text-left text-black font-semibold">Test Titel</h2>
                <p class="text-gray-600 text-left mt-1">
                  Dit is een test beschrijving voor het evenement
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Form  -->
    <transition name="fade">
      <div
        v-if="isFormOpen && isWidgetOpen"
        :class="`widget-container bg-${tailwindColor}-200 border border-white/20 p-5 rounded-2xl max-w-[90vw]`"
      >
        <div class="flex justify-between items-center">
          <i
            type="button"
            class="pi pi-times text-red-500 text-2xl p-1 rounded-2xl"
            @click="() => { toggleWidget(); toggleForm(); }"
          ></i>
          <i
            type="button"
            class="pi pi-backward text-white text-2xl mr-225 p-1 rounded-2x"
            @click="toggleForm"
          ></i>
        </div>
        <ReservationForm />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
