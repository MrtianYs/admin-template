<template>
    <div class="Xtabs">
        <div class="Xtabs-slide Xtabs-left">
            <a-icon type="left" @click="moveToLeft" />
        </div>
        <div class="Xtabs-content">
            <div class="Xtabs-content-warp" :style="{ transform: 'translateX(' + XtabsContentX + 'px)' }" ref="XtabContentWarp">
                <div
                    class="Xtabs-content-item"
                    v-for="item in getTabs.list"
                    :key="item.name"
                    :class="{on: item.name === getTabs.on}"
                    @click="turnTo(item)"
                >
                    <span>{{ item.title }}</span>
                    <a-icon type="close" @click.native.stop="closeItem(item)" />
                </div>
            </div>
        </div>
        <div class="Xtabs-slide Xtabs-right">
            <a-icon type="right" @click="moveToRight" />
        </div>
        <div class="Xtabs-slide Xtabs-menu">
            <a-popover placement="bottomRight">
                <template slot="content">
                    <div class="Xtabs-menu-line" @click="closeOther">关闭其他</div>
                    <div class="Xtabs-menu-line" @click="closeAll">关闭所有</div>
                </template>
                <a-icon type="menu" />
            </a-popover>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import throttle from 'lodash.throttle'
    let resSetXtabsContentX
    export default {
        name: 'Xtabs',
        data () {
            return {
                tabList: [],
                XtabsContentX: 0
            }
        },
        created () {
            resSetXtabsContentX = throttle(this.setXtabsContentX, 500)
            window.addEventListener('resize', resSetXtabsContentX)
        },
        beforeDestroy () {
            window.removeEventListener('resize', resSetXtabsContentX)
        },
        watch: {
            $route: {
                handler () {
                    this.setTabStatus()
                    this.setXtabsContentX()
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
                        const { params, query, meta: { title } } = this.$route
                        this.setTabs({
                            list: [{ name, title, params, query }]
                        })
                    } else {
                        this.setTabs({
                            list: [],
                            on: 'home'
                        })
                        this.$router.push({ name: 'home' })
                    }
                } else {
                    if (list.length > 1) {
                        if (name === this.getTabs.on) {
                            const existIndex = list[index] ? index : list.length - 1
                            const { name, query, params } = list[existIndex]
                            this.setTabs({
                                list,
                                on: name
                            })
                            this.$router.push({ name, query, params })
                        } else {
                            this.setTabs({ list })
                        }
                    } else {
                        const { name, query, params } = list[0]
                        this.setTabs({ list, on: name })
                        if (list[0].name !== this.$route.name) {
                            this.$router.push({ name, query, params })
                        }
                    }
                }
            },
            closeOther () {
                const onItem = this.getTabs.list.filter(item => item.name === this.$route.name)
                this.setTabs({ list: onItem })
            },
            closeAll () {
                this.setTabs({ list: [{ name: 'home', title: '首页' }] })
                if (this.$route.name !== 'home') {
                    this.$router.push({ name: 'home' })
                }
            },
            getTagsValue () {
                const XtabContentWarp = this.$refs.XtabContentWarp
                const OffsetWidth = XtabContentWarp.offsetWidth
                const ScrollWidth = XtabContentWarp.scrollWidth
                return { OffsetWidth, ScrollWidth }
            },
            moveToLeft () {
                // const { OffsetWidth, ScrollWidth } = this.getTagsValue()
                const XtabsContentX = Math.abs(this.XtabsContentX)
                if (XtabsContentX - 200 > 0) {
                    this.XtabsContentX += 200
                } else {
                    this.XtabsContentX = 0
                }
            },
            moveToRight () {
                const { OffsetWidth, ScrollWidth } = this.getTagsValue()
                const XtabsContentX = Math.abs(this.XtabsContentX)
                if (OffsetWidth + XtabsContentX + 200 < ScrollWidth) {
                    this.XtabsContentX -= 200
                } else {
                    this.XtabsContentX = this.XtabsContentX - (ScrollWidth - OffsetWidth - XtabsContentX)
                }
            },
            setXtabsContentX () {
                this.$nextTick(() => {
                    const index = this.getTabs.list.findIndex(item => item.name === this.$route.name)
                    const tabsChildList = this.$refs.XtabContentWarp.querySelectorAll('.Xtabs-content-item')
                    let itemIndexAllWidth = 0
                    for (let i = 0; i < index + 1; i++) {
                        itemIndexAllWidth += tabsChildList[i].offsetWidth
                    }
                    itemIndexAllWidth += index * parseFloat(getComputedStyle(tabsChildList[0]).marginRight)
                    const { OffsetWidth } = this.getTagsValue()
                    if (itemIndexAllWidth <= OffsetWidth) {
                        this.XtabsContentX = 0
                    } else {
                        if (itemIndexAllWidth > OffsetWidth + Math.abs(this.XtabsContentX)) {
                            this.XtabsContentX -= itemIndexAllWidth - OffsetWidth + this.XtabsContentX
                        } else if (Math.abs(this.XtabsContentX) < itemIndexAllWidth < OffsetWidth + Math.abs(this.XtabsContentX)) {
                            this.XtabsContentX = -(itemIndexAllWidth - tabsChildList[index].offsetWidth)
                        } else {
                            this.XtabsContentX = -itemIndexAllWidth
                        }
                    }
                })
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
			width: calc(100% - 90px);
			&-warp {
				display: flex;
				transition: 0.3s;
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
			flex: 0 0 25px;
			background-color: #fff;
			z-index: 1;
		}
		&-menu {
			border-left: none;
			width: 40px;
			flex-basis: 40px;
			i {
				display: block;
				width: 100%;
				height: 100%;
				line-height: 41px;
			}
			&-line {
				margin-bottom: 5px;
				cursor: pointer;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
