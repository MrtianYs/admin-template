<template>
    <a-sub-menu
        :key="menu.name"
        v-bind="$props"
        v-on="$listeners"
    >
        <span slot="title">
            <a-icon
                v-if="menu.meta.icon"
                :type="menu.meta.icon"
            />
            <span>{{ menu.meta.title }}</span>
        </span>
        <template v-for="item in menu.children">
            <sub-menu
                v-if="item.children && !item.meta.hiddenInMenu"
                :key="item.name"
                :menu="item"
            />
            <a-menu-item
                v-else-if="!item.meta.hiddenInMenu"
                :key="item.name"
            >
                <a
                    v-if="item.meta.target"
                    :target="item.meta.target"
                    :href="item.path"
                >{{ item.meta.title }}</a>
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
        </template>
    </a-sub-menu>
</template>
<script>
    import { Menu } from 'ant-design-vue'
    export default {
        name: 'SubMenu',
        props: {
            ...Menu.SubMenu.props,
            menu: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>
