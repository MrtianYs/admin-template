<template>
    <a-layout id="components-layout-fixed-sider">
        <a-layout-sider
            collapsible
            v-model="collapsed"
            :width="getLayoutConfig.siderWidth"
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
            <div class="logo">
                <span v-show="!collapsed">后台管理系统</span>
            </div>
            <a-menu
                :theme="getLayoutConfig.theme.siderMenu"
                mode="inline"
                :default-selected-keys="['1']"
            >
                <a-menu-item key="1">
                    <a-icon type="user" />
                    <span class="nav-text">nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="video-camera" />
                    <span class="nav-text">nav 2</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: getLayoutConfig.siderWidth, transition: 'all 0.2s' }">
            <a-layout-header class="header">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="setCollapsed"
                />
                <a-menu
                    mode="horizontal"
                    class="header-menu"
                >
                    <a-menu-item key="1">
                        nav 1
                    </a-menu-item>
                    <a-menu-item key="2">
                        nav 2
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout>
                <Xbreadcrumb />
                <Xtabs />
            </a-layout>
            <a-layout-content :style="{ margin: '0 16px', overflow: 'initial' }">
                <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }" />
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import { layouts } from '@/config/index.js'
    import Xbreadcrumb from './Xbreadcrumb.vue'
    import Xtabs from './Xtabs.vue'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Basic',
        data () {
            return {
                collapsed: false
            }
        },
        components: {
            Xbreadcrumb,
            Xtabs
        },
        computed: {
            ...mapGetters(['getLayoutConfig'])
        },
        methods: {
            ...mapMutations(['setSiderWidth']),
            setCollapsed () {
                if (this.collapsed) {
                    this.setSiderWidth(layouts.siderMenuWidth)
                    this.collapsed = false
                } else {
                    this.setSiderWidth('80px')
                    this.collapsed = true
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    #components-layout-fixed-sider .logo {
        height: 32px;
        margin: 16px;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        line-height: 32px;
    }
    .header {
        padding: 0 20px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        &-menu {
            line-height: 64px;
            margin-left: 20px;
        }
    }
    .trigger {
        font-size: 18px;
        font-weight: 800;
    }
</style>
