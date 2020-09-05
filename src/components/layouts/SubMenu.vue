<template>
    <a-sub-menu
        :key="menu.name"
        v-bind="$props"
        v-on="$listeners"
    >
        <span slot="title">
            <a-icon type="mail" />
            <span>{{ menu.meta.title }}</span>
        </span>
        <template v-for="item in menu.children">
            <a-menu-item
                v-if="!item.children"
                :key="item.name"
            >
                <a-icon type="pie-chart" />
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
            <sub-menu
                v-else
                :key="item.name"
                :menu="item"
            />
        </template>
    </a-sub-menu>
</template>
<script>
    import { Menu } from 'ant-design-vue'
    export default {
        name: 'SubMenu',
        props: {
            ...Menu.SubMenu.props,
            // Cannot overlap with properties within Menu.SubMenu.props
            menu: {
                type: Object,
                default: () => ({})
            }
        },
        mounted () {
            console.log(this.menu)
        }
    }
</script>
