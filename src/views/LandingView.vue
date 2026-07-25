<template>
    <div class="min-h-screen bg-orange-50">
        
        <!-- ナビゲーション -->
        <nav class="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold">🍽️ MeshiAI</h1>
            <div class="flex gap-3">
                <button 
                    @click="router.push('/login')"
                    class="text-orange-400 font-bold text-sm border border-orange-400 px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors"
                >
                    ログイン
                </button>
                <button 
                    @click="router.push('/login')"
                    class="bg-orange-400 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors"
                >
                    無料ではじめる
                </button>
            </div>
        </nav>

        <section class="flex flex-col items-center justify-center px-4 py-20">
            <p class="text-orange-400 font-bold text-sm mb-4 tracking-widest">AI × グルメ探し</p>
            <h2 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                今日の「食べたい」を<br />AIが叶える
            </h2>
            <p class="text-gray-500 text-lg mb-10 max-w-xl">
                気分やジャンルを入力するだけで、AIがあなたにぴったりのお店を提案。もうお店選びで悩まない。
            </p>
            <button 
                @click="router.push('/login')"
                class="bg-orange-400 hover:bg-orange-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-colors shadow-lg"
            >
                🔍️ 無料でお店を探す
            </button>
            <p class="text-gray-400 text-xs mt-4">登録無料・クレジットカード不要</p>
        </section>

        <section class="bg-white py-16 px-4">
            <div class="max-w-4xl mx-auto">
                <h3 class="text-2xl font-bold text-center text-gray-800 mb-12">MeshiAIの特徴</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="text-5xl mb-4">🤖</div>
                        <h4 class="font-bold text-lg mb-2">AIがお店を提案</h4>
                        <p class="text-gray-500 text-sm">
                            気分や状況をテキストで入力するだけで、AIが最適なお店を選んで理由付きで提案します。
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="text-5xl mb-4">📍</div>
                        <h4 class="font-bold text-lg mb-2">現在地から検索</h4>
                        <p class="text-gray-500 text-sm">
                            現在地周辺のお店を検索可能。エリア名での指定も可能です。
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="text-5xl mb-4">❤️</div>
                        <h4 class="font-bold text-lg mb-2">お気に入り保存</h4>
                        <p class="text-gray-500 text-sm">
                            気に入ったお店はお気に入り保存。次回の参考にできます。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 px-4">
            <div class="max-w-2xl mx-auto">
                <h3 class="text-2xl font-bold text-center text-gray-800 mb-12">使い方はかんたん３ステップ</h3>
                <div class="flex flex-col gap-6">
                    <div class="flex items-start gap-4 bg-white rounded-2xl shadow-sm p-6">
                        <span class="bg-orange-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
                        <div>
                            <h4 class="font-bold mb-1">気分・ジャンル・エリアを入力</h4>
                            <p class="text-gray-500 text-sm">「がっつり食べたい」「渋谷でラーメン」など自由に入力してください。</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 bg-white rounded-2xl shadow-sm p-6">
                        <span class="bg-orange-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
                        <div>
                            <h4 class="font-bold mb-1">AIがお店を提案</h4>
                            <p class="text-gray-500 text-sm">AIがあなたの入力を分析して、ぴったりのお店を５件提示します。</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 bg-white rounded-2xl shadow-sm p-6">
                        <span class="bg-orange-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
                        <div>
                            <h4 class="font-bold mb-1">Googleマップで確認・保存</h4>
                            <p class="text-gray-500 text-sm">気に入ったお店はGoogleマップで場所を確認、お気に入り保存できます。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-orange-400 py-16 px-4 text-center">
            <h3 class="text-3xl font-bold text-white mb-4">今日のランチ、もう迷わない</h3>
            <p class="text-orange-100 mb-8">MeshiAIで、あなたにぴったりのお店を見つけよう。</p>
            <button 
                @click="goToApp"
                class="bg-white text-orange-400 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
                🍽️ 無料ではじめる
            </button>
        </section>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

const router = useRouter()

// ============
// ログイン
// ============
const goToApp = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        router.push('/search')
    } else {
        router.push('/login')
    }
}
</script>