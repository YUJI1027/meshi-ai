<template>
    <div class="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
        <div class="flex justify-between items-start">
            <h3 class="font-bold text-base">{{ shop.name }}</h3>
            <span class="text-yellow-400 font-bold text-sm">⭐️ {{ shop.rating ?? なし }}</span>
        </div>

        <span  class="text-xs text-white bg-orange-400 rounded-fll px-3 py-1 w-fit">
            {{ shop.category ?? 'その他' }}
        </span>

        <p class="text-xs text-gray-500">📍 {{ shop.address }}</p>
    </div>
</template>

<script setup>
defineProps({
    shop: {
        type: Object,
        request: true
    }
})
</script>