<template>
    <el-container class="base-template">
      <Header />
      <el-container>
        <el-main>
            <slot />
        </el-main>
      </el-container>
      <Footer />
    </el-container>
</template>

<style>
.base-template {
    background-color: var(--el-bg-color-page);
}
</style>
