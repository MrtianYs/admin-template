<template>
    <a-result
        status="404"
        title="404"
        sub-title="访问的页面不存在"
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
