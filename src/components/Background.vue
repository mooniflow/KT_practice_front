<template>
  <div class="relative h-screen w-full">
    <!-- 배경 이미지 -->
    <img 
      src="@/assets/background-image.jpg" 
      alt="Background" 
      class="absolute top-0 left-0 w-full h-full object-cover"
    />

    <!-- 네비게이션 바 -->
    <nav class="absolute top-0 left-0 w-full flex justify-between items-center p-6">
      <h1 class="text-gray-800 font-bold text-xl">New Normal</h1>
      <div class="flex space-x-6 text-gray-600">
        <a href="#" class="hover:text-gray-800">Works</a>
        <a href="#" class="hover:text-gray-800">Info</a>
      </div>
    </nav>

    <!-- 중앙 텍스트 -->
    <div class="absolute inset-0 flex justify-center items-center text-center">
      <h2 class="text-3xl sm:text-5xl font-semibold text-black">
        <span class="text-blue-600 font-bold">Optimism</span> for the future as a superpower
      </h2>
    </div>
  </div>
</template>

<style scoped>
/* 필요하면 추가 스타일링 */
</style>