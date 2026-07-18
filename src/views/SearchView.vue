<template>
    <div class="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4">
        <div class="w-full max-w-lg">
            <div class="text-center mb-8">
                <div class="flex justify-end mb-2">
                    <button 
                        @click="router.push('/favorites')"
                        class="text-orange-400 font-bold text-sm"
                    >
                        ❤️ お気に入り
                    </button>
                </div>
                <h1 class="text-5xl font-bold mb-2">🍽️ MeshiAI</h1>
                <p class="text-gray-500 text-lg">今日、何食べたい？</p>
            </div>
        </div>
        

        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <label class="font-bold text-sm">気分や食べたいものを入力</label>
                <textarea
                    v-model="mood"
                    placeholder="例：今日はラーメンが食べたい！疲れたので優しい味のものが食べたい"
                    rows="3"
                    class="border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
                ></textarea>
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-bold text-sm">ジャンル</label>
                <input 
                    v-model="genre"
                    placeholder="例：ラーメン、カレー、寿司"
                    class="border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-bold text-sm">エリア</label>
                <input 
                    v-model="location"
                    placeholder="例：渋谷、新宿、池袋"
                    class="border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
            </div>

            <button 
                @click="search"
                :disabled="loading"
                class="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
                {{ loading ? '検索中...' : '🔍️ お店を提案してもらう' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ===========
// State
// ===========
const router = useRouter()
const mood = ref('')
const genre = ref('')
const location = ref('')
const loading = ref(false)

// ==========
// 検索機能
// ==========
const search = async () => {
    if (!genre.value || !location.value) {
        alert('ジャンルとエリアを入力してください')
        return
    }

    loading.value = true
    try {
        const query = mood.value ? `${mood.value} ${genre.value}` : genre.value
        const res = await fetch(
            `http://localhost:8000/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location.value)}`
        )
        const data = await res.json()
        router.push({ name: 'result', state: { data } })
    } catch (e) {
        alert('検索中にエラーが発生しました。もう一度お試しください。')
    } finally {
        loading.value = false
    }
}

</script>