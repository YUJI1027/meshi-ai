<template>
    <div class="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-5xl font-bold mb-2">🍽️ MeshiAI</h1>
                <p class="text-gray-500 text-lg">ログインしてはじめよう</p>
            </div>

            <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-bold text-sm">メールアドレス</label>
                    <input 
                        v-model="email"
                        type="email"
                        placeholder="meshiai@email.com"
                        class="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="font-bold text-sm">パスワード</label>
                    <input 
                        v-model="password"
                        type="password"
                        placeholder="6文字以上"
                        class="border border-gray-200 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                </div>

                <p v-if="errorMsg" class="text-red-400 text-sm">{{ errorMsg }}</p>

                <button
                    @click="login"
                    :disabled="loading"
                    class="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                    {{ loading ? '処理中...' : 'ログイン' }}
                </button>

                <button 
                    @click="signup"
                    :disabled="loading"
                    class="bg-white hover:bg-orange-50 border border-orange-400 text-orange-400 font-bold py-3 rounded-xl text-sm transition-colors"
                >
                    {{ loading ? '処理中...' : '新規登録' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

// =============
// state
// =============
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// ============
// ログイン
// ============
const login = async () => {
    loading.value = true
    errorMsg.value = ''
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    if (error) {
        errorMsg.value = 'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
    } else {
        await router.push({ name: 'search' })
    }
    loading.value = false
}

// ============
// 新規登録
// ============
const signup = async () => {
    loading.value = true
    errorMsg.value = ''
    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    })
    if (error)  {
        errorMsg.value = '新規登録に失敗しました。' + error.message
    } else {
        router.push('/')
    }
    loading.value = false
}
</script>