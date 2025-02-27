<template>
  <div class="flex flex-col space-y-2 w-full max-w-md">
    <div v-for="(timeSlot, index) in timeSlots" :key="index">
      <div class="w-full p-4 flex justify-between items-center border border-gray-200 rounded-lg">
        <span class="text-lg font-medium">{{ timeSlot.time }} uur</span>
        <span class="text-gray-600 font-medium">{{ timeSlot.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface TimeSlot {
  time: string;
  status: string;
}

// Define props with defaults
const props = withDefaults(defineProps<{
  startTime?: string;
  endTime?: string;
  interval?: number;
  availabilityStatus?: string;
}>(), {
  startTime: '10:00',
  endTime: '15:00',
  interval: 15,
  availabilityStatus: 'BESCHIKBAAR'
});

const timeSlots = ref<TimeSlot[]>([]);

// Generate time slots based on props
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  const [startHour, startMinute] = props.startTime.split(':').map(Number);
  const [endHour, endMinute] = props.endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  const endTimeInMinutes = endHour * 60 + endMinute;
  
  while (currentHour * 60 + currentMinute < endTimeInMinutes) {
    const formattedHour = currentHour.toString().padStart(2, '0');
    const formattedMinute = currentMinute.toString().padStart(2, '0');
    
    slots.push({
      time: `${formattedHour}:${formattedMinute}`,
      status: props.availabilityStatus
    });
    
    currentMinute += props.interval;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute %= 60;
    }
  }
  
  return slots;
};

onMounted(() => {
  timeSlots.value = generateTimeSlots();
});
</script>