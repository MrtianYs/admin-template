<template>
    <div @click="click"> role.vue </div>
</template>

<script>
    export default {
        methods: {
            click () {
                this.$router.push({ name: 'person', params: { id: 243 }, query: { keyword: '123123' } })
            }
        }
    }
</script>
