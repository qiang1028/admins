<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'72px':'240px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList"
                :active-name="activeName">
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'72px':'240px', display: 'flex', alignItems: 'center', width: '100%', height: '64px', position: 'fixed', top: 0, zIndex: 20}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick" class="menu-toggle-btn">
                        <Icon type="navicon" size="26"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="header-tools">
                        <full-screen v-model="isFullScreen" @on-change="fullscreenChange" class="tool-btn"></full-screen>
                        <lock-screen class="tool-btn"></lock-screen>
                        <message-tip v-model="mesCount" class="tool-btn"></message-tip>
                        <theme-switch class="tool-btn"></theme-switch>
                    </div>
                    
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)" class="user-dropdown-link">
                                    <div class="user-avatar">
                                        {{ userName ? userName.charAt(0).toUpperCase() : 'A' }}
                                    </div>
                                    <div class="user-info">
                                        <span class="user-name">{{ userName }}</span>
                                        <span class="user-role">管理员</span>
                                    </div>
                                    <Icon type="ios-arrow-down" class="dropdown-arrow"></Icon>
                                </a>
                                <DropdownMenu slot="list" class="user-dropdown-menu">
                                    <DropdownItem name="ownSpace" class="dropdown-item">
                                        <Icon type="ios-person-outline" class="item-icon"></Icon>
                                        个人中心
                                    </DropdownItem>
                                    <DropdownItem name="ownSpace1" class="dropdown-item">
                                        <Icon type="ios-settings-outline" class="item-icon"></Icon>
                                        设置中心
                                    </DropdownItem>
                                    <DropdownItem name="loginout" divided class="dropdown-item logout-item">
                                        <Icon type="ios-log-out-outline" class="item-icon"></Icon>
                                        退出登录
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'72px':'240px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import util from '@/libs/util.js';
    
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList () {                
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList;
            },
            currentPath () {
                return this.$store.state.app.currentPath;
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            },
            activeName () {
                return this.$store.state.app.currentPageName;
            }
        },
        methods: {
            init () {
                this.$store.commit('mountMyMenulist',this);   
                let pathArr = util.setCurrentPath(this, this.$route.name);
                
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = localStorage.getItem('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    window.location.href = '/'
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) {
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
            },
            beforePush (name) {
                return true;
            },
            fullscreenChange (isFullScreen) {
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name);
            }
        },
        mounted () {
            this.init();
        },
        created () {
            this.$store.commit('setOpenedList');
        }
    };
</script>

<style lang="less">
    @import "./main.less";
</style>
