<template>
    <div class="min-h-screen bg-orange-50 px-4 py-8">
        <div class="w-full max-w-lg mx-auto">
            <div class="flex justify-between items-center mb-6">
                <button 
                    @click="router.push('/search')"
                    class="text-orange-400 font-bold flex items-center gap-1 cursor-pointer"
                >
                    ⇐ 検索へ戻る
                </button>
            </div>

            <div v-if="favorites.length != 0" class="bg-white rounded-2xl shadow-md p-2">
                <h1 class="text-xl font-bold text-center">お気に入り一覧</h1>
                <div class="w-12"></div>
            </div>

            <div v-if="favorites.length === 0" class="text-center text-gray-400 mt-20">
                <p class="text-4xl mb-4">🍽️</p>
                <p>お気に入りはまだありません</p>
            </div>

            <div v-else class="flex flex-col gap-4 mt-6">
                <div 
                    v-for="shop in favorites"
                    :key="shop.id"
                    class="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
                >
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-base">{{ shop.shop_name }}</h3>
                        <span class="text-yellow-400 font-bold text-sm">⭐️ {{ shop.rating ?? 'なし' }}</span>
                    </div>
                    <div class="flex gap-2 mt-1">
                        <a 
                            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + '' + shop.address)}`"
                            target="_blank"
                            class="text-xs text-blue-400 font-bold"
                        >
                            🗺️ Googleマップを開く
                        </a>
                    </div>
                    <p class="text-xs text-gray-500">📍 {{ shop.address }}</p>
                    <button 
                        @click="removeFavorite(shop.id)"
                        class="text-xs text-red-400 text-center cursor-pointer"
                    >
                        お気に入りから削除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

// =============
// state
// =============
const router = useRouter()
const favorites = ref([])

// =================
// お気に入り店の検索
// =================
const fetchFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false })
    
    if (!error) {
        favorites.value = data
    }
}

// =================
// お気に入り店の削除
// =================
const removeFavorite = async (id) => {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)

    if (!error) {
        favorites.value = favorites.value.filter(f => f.id !== id)
    }
}

// =================
// 初期化
// =================
onMounted(() => {
    fetchFavorites()
})
</script>