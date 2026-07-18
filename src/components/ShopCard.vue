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

        <button 
            @click="toggleFavorite"
            class="text-sm mt-1"
            :class="isFavorited ? 'text-red-400' : 'text-gray-400'"
        >
            {{ isFavorited ? '❤️ お気に入り済み' : '🤍 お気に入りに追加' }}
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase.js'

const props = defineProps({
    shop: {
        type: Object,
        request: true
    }
})

const isFavorited =  ref(false)

const toggleFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!isFavorited.value) {
        const { error } = await supabase.from('favorites').insert({
            user_id: user.id,
            shop_id: props.shop.name,
            shop_name: props.shop.name,
            genre: props.shop.category,
            address: props.shop.address,
            rating: props.shop.rating
        })
        if (!error) isFavorited.value = true
    } else {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('shop_id', props.shop.name)
        if (!error) isFavorited.value = false
    }
}
</script>