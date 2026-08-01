<template>
    <div class="min-h-screen bg-orange-50 px-4 py-8">
        <div class="w-full max-w-lg mx-auto">
            <button 
                @click="router.push('/search')"
                class="text-orange-400 font-bold mb-6 flex items-center gap-1"
            >
                ⇐戻る
            </button>

            <div v-if="restaurants.length > 0">
                <!-- AIコメント -->
                <div class="bg-orange-100 border-l-4 border-orange-400 rounded-xl p-4 flex gap-3 mb-6">
                    <span class="text-2xl">🤖</span>
                    <p class="text-sm text-gray-700">
                        <span v-if="ai_comment">{{ aiComment }}</span>
                        <span v-else class="flex items-center gap-1 text-gray-400">
                            MeShi-AIがコメントを生成中
                            <span class="animate-bounce inline-block">.</span>
                            <span class="animate-bounce inline-block [animation-delay:0.2s]">.</span>
                            <span class="animate-bounce inline-block [animation-delay:0.4s]">.</span>
                        </span>
                    </p>
                </div>

                <h2 class="font-bold text-lg mb-4">おすすめのお店</h2>

                <!-- お店を紹介 -->
                <div class="flex flex-col gap-4">
                    <div 
                        v-for="(shop, index) in data.restaurants"
                        :key="index"
                        class="opacity-0 animate-fadeIn"
                        :style="{ animationDelay: `${index * 0.15}s`, animationFillModel: 'forwards' }"
                    >
                        <ShopCard :shop="shop" />
                    </div>
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
const restaurants = ref([])
const aiComment = ref(null)
const query = ref('')

onMounted(async () => {
    const state = history.state
    restaurants.value = state.restaurants || []
    query.value = state.query || ''

    if (restaurants.value.length > 0) {
        try {
            const res = await fetch('https://meshi-ai-backend.onrender.com/ai-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: query.value,
                    restaurants: restaurants.value
                })
            })
            const data = await res.json()
            aiComment.value = data.ai_comment
        } catch (e) {
            aiComment.value = 'AIコメントの取得に失敗しました。'
        }
    }
})
</script>