<template>
    <div id="app">
        <keep-alive :include="cacheComponents">
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cacheComponents: []
            }
        }
    }
</script>

<style lang="less" scoped>
    #app {
        height: 100%;
    }
</style>
