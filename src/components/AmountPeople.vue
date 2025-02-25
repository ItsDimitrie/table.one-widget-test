<script setup lang="ts">
import { ref } from 'vue';

const selectedNumber = ref(0);

const selectNumber = (number: number) => {
    selectedNumber.value = number;
};
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <input id="numberSelector" v-model="selectedNumber" type="number"
            class="border border-gray-300 rounded-lg p-2 text-center mt-2" />
        <div>
            <button v-for="number in 8" :key="number" type="button"
                class="border border-gray-300 rounded-lg  mt-5 p-4 m-2" @click="selectNumber(number)">
                {{ number }}
            </button>
        </div>

    </div>
</template>
