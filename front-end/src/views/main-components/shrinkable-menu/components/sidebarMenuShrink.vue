<template>
    <div class="ivu-layout ivu-layout-has-sider ivu-layout-sider-collapse-mode">
        <div class="sidebar-menu-con" :class="shrink ? 'ivu-layout-sider-collapsed' : ''">
            <sidebar-menu 
                :menu-list="menuList"
                :active-name="activeName"
                :open-names="openNames"
                :theme="theme"
                @on-select="turnToPage"
                :shrink="shrink"
            ></sidebar-menu>
        </div>
        <div class="main-component-con">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import sidebarMenu from './sidebarMenu.vue';
import Util from '@/libs/util';

export default {
    name: 'shrinkableMenu',
    components: {
        sidebarMenu
    },
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            default: () => []
        },
        beforePush: {
            type: Function,
            default: () => {
                return (name) => true;
            }
        },
        openNames: {
            type: Array,
            default: () => []
        },
        activeName: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    methods: {
        handleSelect (name) {
            let willPush = this.beforePush(name);
            if (willPush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-select', name);
        },
        turnToPage (name) {
            Util.openNewPage(this.$parent.$parent, name, this.$route.params || {}, this.$route.query || {});
            this.handleSelect(name);
        }
    }
};
</script>

<style lang="less">
    @import "../styles/menu.less";

    .ivu-layout-sider-collapse-mode {
        .main-component-con {
            margin-left: 0;
        }
    }
</style>
