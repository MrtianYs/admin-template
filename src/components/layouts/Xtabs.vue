<template>
    <div class="Xtabs">
        <div class="Xtabs-slide Xtabs-left"><a-icon type="left" /></div>
        <div class="Xtabs-content">
            <div class="Xtabs-content-warp">
                <div v-for="item in getTabs.list" :key="item.name" :class="{on: item.name === getTabs.on}" @click="turnTo(item)">
                    <span>{{ item.title }}</span>
                    <a-icon type="close" @click.native.stop="closeItem(item)" />
                </div>
            </div>
        </div>
        <div class="Xtabs-slide Xtabs-right">
            <a-icon type="right" />
        </div>
        <div class="Xtabs-slide Xtabs-menu">
            <a-icon type="menu" />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Xtabs',
        data () {
            return {
                tabList: []
            }
        },
        watch: {
            $route: {
                handler () {
                    this.setTabStatus()
                },
                immediate: true
            }
        },
        computed: {
            ...mapGetters(['getTabs'])
        },
        methods: {
            ...mapMutations(['setTabs']),
            turnTo ({ name, query, params }) {
                if (this.$route.name !== name) { this.$router.push({ name, query, params }) }
            },
            setTabStatus () {
                const list = [...this.getTabs.list]
                const name = this.$route.name
                if (list.findIndex(item => item.name === name) === -1) {
                    list.push({
                        name,
                        title: this.$route.meta.title,
                        params: this.$route.params,
                        query: this.$route.query
                    })
                }
                this.setTabs({ list, on: name })
            },
            closeItem ({ name }) {
                const list = [...this.getTabs.list]
                const index = list.findIndex(item => item.name === name)
                list.splice(index, 1)
                if (!list.length) {
                    if (this.$route.name === 'home') {
                        this.setTabs({
                            list: [{
                                name,
                                title: this.$route.meta.title,
                                params: this.$route.params,
                                query: this.$route.query
                            }],
                            on: 'home'
                        })
                    } else {
                        this.setTabs({
                            list: [],
                            on: 'home'
                        })
                        this.$router.push({ name: 'home' })
                    }
                } else {
                    this.setTabs({ list, on: name })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
	.Xtabs {
		display: flex;
		background-color: #fff;
		&-content {
			padding: 5px;
			border-top: 1px solid #f2f2f2;
			border-bottom: 1px solid #fff;
			background-color: #f2f2f2;
			flex: 1 0 800px;
			&-warp {
				display: flex;
				div {
					flex-shrink: 0;
					padding: 5px 8px;
					background-color: #ffffff;
					margin-right: 6px;
					border-radius: 3px;
					cursor: pointer;
					span {
						display: inline-block;
						margin-right: 6px;
					}
					&.on {
						background-color: #1890ff;
						color: #ffffff;
					}
					&:last-child {
						margin-right: 0;
					}
				}

			}
		}
		&-slide {
			cursor: pointer;
			border: 1px solid #f2f2f2;
			border-bottom-color: #fff;
			width: 25px;
			text-align: center;
			line-height: 40px;
			color: #333;
		}
		&-menu {
			border-left: none;
		}
	}
</style>
