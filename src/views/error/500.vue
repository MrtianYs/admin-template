<template>
    <a-result
        status="500"
        title="500"
        sub-title="服务发生错误"
    >
        <template #extra>
            <router-link to="/">
                <a-button type="primary">
                    返回首页
                </a-button>
            </router-link>
        </template>
    </a-result>
</template>
