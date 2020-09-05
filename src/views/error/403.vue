<template>
    <a-result
        status="403"
        title="403"
        sub-title="你没有权限"
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
