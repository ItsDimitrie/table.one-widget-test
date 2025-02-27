<script setup lang="ts">
import { ref } from 'vue';

const selectedDate = ref<string | null>(null);
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-gray-100">
        <label for="date" class="mb-2 text-lg font-medium text-gray-700">Select a date:</label>
        <input
            type="date"
            id="date"
            v-model="selectedDate"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="mt-4 text-gray-700">Selected Date: {{ selectedDate }}</p>
    </div>
</template>
