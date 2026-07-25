<template>
    <div class="min-h-screen bg-orange-50 px-4 py-8">
        <div class="w-full max-w-lg mx-auto">
            <button 
                @click="router.push('/search')"
                class="text-orange-400 font-bold mb-6 flex items-center gap-1"
            >
                ⇐戻る
            </button>

            <div v-if="data">
                <div class="bg-orange-100 border-l-4 border-orange-400 rounded-xl p-4 flex gap-3 mb-6">
                    <span class="text-2xl">🤖</span>
                    <p class="text-sm text-gray-700">{{ data.ai_comment }}</p>
                </div>

                <h2 class="font-bold text-lg mb-4">おすすめのお店</h2>

                <div class="flex flex-col gap-4">
                    <ShopCard 
                        v-for="(shop, index) in data.restaurants"
                        :key="index"
                        :shop="shop"
                    />
                </div>
            </div>

            <div v-else>
                <p class="text-gray-500 text-center">データが見つかりませんでした。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShopCard from '../components/ShopCard.vue'

const router = useRouter()
const data = ref(history.state.data || null)

</script>