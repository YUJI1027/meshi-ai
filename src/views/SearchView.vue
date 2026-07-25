<template>
    <div class="min-h-screen bg-orange-50">

        <!-- ナビゲーションバー -->
        <nav class="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold mb-2">🍽️ MeshiAI</h1>
            <div class="flex gap-4 items-center">
                <button 
                    @click="router.push('/favorites')"
                    class="text-orange-400 font-bold text-sm"
                >
                    ❤️ お気に入り
                </button>
                <button 
                    @click="logout"
                    class="text-gray-400 text-sm"
                >
                    ログアウト
                </button>
            </div>
        </nav>

        <!-- メインコンテンツ -->
        <div class="flex flex-col items-center px-4 py-12">
            <div class="w-full max-w-2xl">
                <div class="text-center mb-8">
                    <p class="text-gray-700 font-bold text-3xl">今日、何食べたい？</p>
                    <p class="text-gray-400 text-sm mt-2">気分やジャンルを入力してAIがお店を提案します</p>
                </div>
            </div>
            
            <!-- フォーム -->
            <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-bold text-sm">気分や食べたいものを入力</label>
                    <textarea
                        v-model="mood"
                        placeholder="例：今日はラーメンが食べたい、疲れたので優しい味のものが食べたい"
                        rows="3"
                        class="border border-gray-200 rounded-xl p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
                    ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <label class="font-bold text-sm">ジャンル</label>
                        <input 
                            v-model="genre"
                            placeholder="例：ラーメン、カレー"
                            class="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="font-bold text-sm">エリア</label>
                    <div class="flex gap-1">
                        <input 
                            v-model="area"
                            placeholder="例：渋谷、新宿"
                            class="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-300 flex-1"
                        />
                        <button 
                            @click="getCurrentLocation"
                            class="bg-orange-100 text-orange-400 rounded-xl px-3 text-sm"
                            title="現在地を取得"
                        >
                            📍 現在地を取得
                        </button>
                    </div>
                </div>
                <button 
                    @click="search"
                    :disabled="loading"
                    class="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-sm transition-colors mt-2"
                >
                    {{ loading ? 'AIがお店を探しています...' : '🔍️ お店を提案してもらう' }}
                </button>
            </div>

            <!-- ジャンルクリック選択 -->
            <div class="mt-6">
                <p class="text-xs tex-gray-400 mb-2 text-center">よく使われるジャンル</p>
                <div class="flex flex-wrap gap-2 justify-center">
                    <button 
                        v-for="tag in quickTags"
                        :key="tag"
                        @click="genre = tag"
                        class="bg-white text-gray-600 text-xs px-3 py-2 rounded-full shadow-sm border-gray-100 hover:border-orange-300 hover:text-orange400 transition-colors"
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

// ===========
// State
// ===========
const router = useRouter()
const mood = ref('')
const genre = ref('')
const area = ref('')
const loading = ref(false)

const quickTags = ['ラーメン', '寿司', '焼肉', 'イタリアン', '居酒屋', 'カフェ', '中華', 'カレー',]

const currentLat = ref(null)
const currentLng = ref(null)

// ==========
// 検索機能
// ==========
const search = async () => {
    if (!genre.value || !area.value) {
        alert('ジャンルとエリアを入力してください')
        return
    }

    loading.value = true
    try {
        const query = mood.value ? `${mood.value} ${genre.value}` : genre.value
        // 現在地の場所は緯度経度を送る
        const locationParam = (currentLat.value && area.value === '現在地')
            ? `${currentLat.value},${currentLng.value}`
            :   area.value
        
        const res = await fetch(
            `https://meshi-ai-backend.onrender.com/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(locationParam)}`
        )
        const data = await res.json()
        router.push({ name: 'result', state: { data } })
    } catch (e) {
        alert('検索中にエラーが発生しました。もう一度お試しください。')
    } finally {
        loading.value = false
    }
}

// ==============
// 位置情報の取得
// ==============
const getCurrentLocation = () => {
    if (!navigator.geolocation) {
        alert('位置情報がサポートされていません')
        return
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            // 実際の座標は別変数に保存
            currentLat.value = pos.coords.latitude
            currentLng.value = pos.coords.longitude
            area.value = '現在地' 
        },
        (err) => {
            console.log('エラー：', err)
            alert('位置情報の取得に失敗しました：', err.message)
        }
    )
}

// ==============
// ログアウト
// ==============
const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}
</script>