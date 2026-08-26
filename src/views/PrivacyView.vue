<template>
    <div class="min-h-screen bg-orange-50">

        <!-- ナビゲーション -->
        <nav class="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold cursor-pointer" @click="router.push('/')">🍽️ MeshiAI</h1>
        </nav>

        <!-- コンテンツ -->
        <div class="max-w-2xl mx-auto px-4 py-12">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">プライバシーポリシー</h1>
            <p class="text-gray-400 text-sm mb-8">最終更新日：2026年8月17日</p>

            <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-8">

                <section>
                    <h2 class="text-lg font-bold text-gray-800 mb-8">プライバシーポリシー</h2>
                    <p class="text-gray-400 text-sm mb-8">最終更新日：2026年9月1日</p>

                    <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-8">
                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">１．はじめに</h2>
                            <p class="text-gray-600 text-sm leading-relaxed">
                                MeshiAI（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、本サービスが収集する情報とその利用方法について説明します。
                            </p>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">２．収集する情報</h2>
                            <p class="text-gray-600 text-sm leading-relaxed">本サービスは以下の情報を収集します。</p>
                            <ul class="text-gray-600 text-sm leading-relaxed list-disc list-inside flex flex-col gap-1">
                                <li>メールアドレス（アカウント登録時）</li>
                                <li>検索キーワード・ジャンル・エリア情報</li>
                                <li>お気に入り登録したお店の情報</li>
                                <li>位置情報（ユーザーが許可した場合のみ）</li>
                            </ul>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">３．情報の利用目的</h2>
                            <ul class="text-gray-600 text-sm leading-relaxed list-disc list-inside flex flex-col gap-1">
                                <li>お店の検索・提案サービスの提供</li>
                                <li>お気に入り機能の提供</li>
                                <li>サービスの改善・分析</li>
                                <li>ユーザーサポートの対応</li>
                            </ul>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">４．第三者サービスの利用</h2>
                            <p class="text-gray-600 text-sm leading-relaxed mb-2">本サービスは以下の第三者サービスを利用しています。</p>
                            <ul class="text-gray-600 text-sm leading-relaxed list-disc list-inside flex flex-col gap-1">
                                <li>Google Places API（お店情報の取得）</li>
                                <li>Google Gemini API（AIコメントの生成）</li>
                                <li>Supabase（認証・データ管理）</li>
                            </ul>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">５．情報の第三者提供</h2>
                            <p class="text-gray-600 text-sm leading-relaxed">
                                本サービスは、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供しません。
                            </p>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">６．位置情報について</h2>
                            <p class="text-gray-600 text-sm leading-relaxed">
                                位置情報はユーザーが明示的に許可した場合のみ取得します。取得した位置情報はお店の検索にのみ使用し、サーバーへの保存は行いません。
                            </p>
                        </section>

                        <section>
                            <h2 class="text-lg font-bold text-gray-800 mb-3">７．お問い合わせ</h2>
                            <p class="text-gray-600 text-sm leading-relaxed">
                                プライバシーポリシーに関するご質問はお問い合わせフォームよりご連絡ください。
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>