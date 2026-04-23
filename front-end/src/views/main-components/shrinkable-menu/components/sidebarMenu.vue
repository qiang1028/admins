<template>
    <div class="sidebar-menu-con ivu-layout" style="height: 100%;">
        <!-- Logo 区域 -->
        <div class="logo-con">
            <div class="logo-icon-wrapper">
                <div class="logo-icon-inner">
                    <Icon type="ios-leaf" class="logo-icon" />
                </div>
                <div class="logo-glow"></div>
            </div>
            <div class="logo-text-group">
                <div class="logo-title-wrap">
                    <span class="logo-title">智慧农业</span>
                    <span class="logo-badge">管理平台</span>
                </div>
                <div class="logo-slogan">SMART AGRICULTURE</div>
            </div>
        </div>
        
        <!-- 菜单 -->
        <div class="menu-scroll-wrapper">
            <Menu 
                ref="sideMenu" 
                :active-name="activeName" 
                :theme="theme" 
                width="auto" 
                @on-select="handleSelect"
                class="sidebar-menu"
            >
                <!-- 遍历所有菜单项（扁平化） -->
                <menu-item 
                    v-for="item in flatMenuList" 
                    :key="item.name" 
                    :name="item.name"
                >
                    <div class="menu-item-wrapper">
                        <Icon :type="item.icon || 'ios-radio-button-off'" class="menu-item-icon" />
                        <span class="menu-item-text">{{ item.title }}</span>
                    </div>
                </menu-item>
            </Menu>
        </div>
        
        <!-- 底部信息 -->
        <div class="sidebar-footer">
            <div class="footer-divider">
                <span class="divider-line"></span>
                <span class="divider-dot"></span>
                <span class="divider-line"></span>
            </div>
            <div class="footer-content">
                <div class="footer-version">
                    <span class="version-tag">v</span>
                    <span class="version-number">2.0</span>
                    <span class="version-badge">PRO</span>
                </div>
                <div class="footer-copyright">© 2024 Smart Agri</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            default: () => []
        },
        activeName: {
            type: String,
            default: ''
        },
        openNames: {
            type: Array,
            default: () => []
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    computed: {
        // 扁平化菜单列表（所有子菜单项平铺）
        flatMenuList() {
            const result = [];
            this.menuList.forEach(item => {
                if (item.children && item.children.length > 0) {
                    item.children.forEach(child => {
                        if (!child.hideInMenu) {
                            result.push({
                                ...child,
                                name: child.name,
                                title: child.title,
                                icon: child.icon
                            });
                        }
                    });
                } else if (!item.hideInMenu) {
                    result.push(item);
                }
            });
            return result;
        }
    },
    methods: {
        handleSelect(name) {
            this.$emit('on-select', name);
        }
    },
    updated() {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateActiveName();
            }
        });
    }
};
</script>

<style lang="less">
    @import "../styles/menu.less";
</style>
