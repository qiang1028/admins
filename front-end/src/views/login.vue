<template>
    <div class="login" @keydown.enter="handleSubmit">
        <!-- 动态渐变背景 -->
        <div class="particles-bg">
            <div class="particle large" v-for="i in 15" :key="'large-'+i" :style="getParticleStyle(i, 'large')"></div>
            <div class="particle" v-for="i in 30" :key="'normal-'+i" :style="getParticleStyle(i, 'normal')"></div>
            <div class="particle small" v-for="i in 20" :key="'small-'+i" :style="getParticleStyle(i, 'small')"></div>
        </div>
        
        <!-- 网格背景 -->
        <div class="grid-bg"></div>
        
        <!-- 流星效果 -->
        <div class="meteors">
            <div class="meteor" v-for="i in 5" :key="'meteor-'+i" :style="getMeteorStyle(i)"></div>
        </div>
        
        <!-- 萤火虫效果 -->
        <div class="fireflies">
            <div class="firefly" v-for="i in 12" :key="'firefly-'+i" :style="getFireflyStyle(i)"></div>
        </div>
        
        <!-- 水稻叶片装饰 -->
        <div class="rice-leaf-decorations">
            <div class="rice-leaf leaf-1">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M20 45 Q40 30 50 20 Q60 30 80 45" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
                </svg>
            </div>
            <div class="rice-leaf leaf-2">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </div>
            <div class="rice-leaf leaf-3">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </div>
            <div class="rice-leaf leaf-4">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </div>
            <div class="rice-leaf leaf-5">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </div>
            <div class="rice-leaf leaf-6">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </div>
        </div>
        
        <!-- 光晕效果 -->
        <div class="glow-effects">
            <div class="glow-orb glow-1"></div>
            <div class="glow-orb glow-2"></div>
            <div class="glow-orb glow-3"></div>
        </div>
        
        <!-- 呼吸光环 -->
        <div class="breathing-rings">
            <div class="breathing-ring ring-1"></div>
            <div class="breathing-ring ring-2"></div>
            <div class="breathing-ring ring-3"></div>
        </div>

        <div class="login-con" :class="{ 'login-success': loginSuccess }">
            <Card :bordered="false" class="login-card">
                <div class="card-border-glow"></div>
                <div class="card-particles">
                    <div class="sparkle" v-for="i in 8" :key="'sparkle-'+i" :style="getSparkleStyle(i)"></div>
                </div>
                
                <p slot="title" class="p-title">
                    <span class="title-icon-wrapper">
                        <div class="title-bg"></div>
                        <Icon type="ios-leaf" class="title-icon"></Icon>
                        <div class="title-ring"></div>
                    </span>
                    <span class="title-text">
                        <span class="title-main">水稻生长可视化预测系统</span>
                        <span class="title-sub">Rice Growth Visualization System</span>
                    </span>
                </p>
                
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-contact-outline" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.userName" 
                                    placeholder="请输入用户名" 
                                    class="animated-input"
                                    @on-focus="inputFocus = 'username'"
                                    @on-blur="inputFocus = ''"
                                ></Input>
                                <div class="input-underline" :class="{ active: inputFocus === 'username' }"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="password" class="form-item-animated">
                            <div class="input-wrapper">
                                
                                <Icon type="locked" class="input-icon"></Icon>
                                <Input 
                                    type="password" 
                                    v-model="form.password" 
                                    placeholder="请输入密码" 
                                    class="animated-input"
                                    @on-focus="inputFocus = 'password'"
                                    @on-blur="inputFocus = ''"
                                ></Input>
                                <div class="input-underline" :class="{ active: inputFocus === 'password' }"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem class="button-wrapper">
                            <div class="button-container">
                                <Button 
                                    @click="handleSubmit" 
                                    :loading="loading" 
                                    type="primary" 
                                    long
                                    class="login-button"
                                >
                                    <span class="button-content" v-if="!loading">
                                        <Icon type="md-log-in" class="btn-icon"></Icon>
                                        <span class="btn-text">登 录</span>
                                    </span>
                                    <span class="button-loading" v-else>
                                        <span class="loading-dots">
                                            <span></span><span></span><span></span>
                                        </span>
                                        <span class="loading-text">登录中...</span>
                                    </span>
                                </Button>
                                <div class="button-particles">
                                    <span class="btn-particle" v-for="i in 6" :key="'bp-'+i"></span>
                                </div>
                            </div>
                        </FormItem>
                    </Form>
                    <div class="options">
                        <span class="signup-option" @click="Register">
                            <Icon type="md-person-add" class="option-icon"></Icon>
                            还没有账号？<span>点击注册</span>
                        </span>
                    </div>
                </div>
            </Card>
        </div>
        
        <!-- 底部波浪装饰 -->
        <div class="wave-decoration">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,90 1440,60 L1440,120 L0,120 Z"/>
                <path d="M720,60 C1080,120 1440,0 1800,60 C1980,90 2100,90 2160,60 L2160,120 L720,120 Z"/>
            </svg>
        </div>
        
        <div class="login-footer">
            <span class="footer-text">© 2026</span>
            <span class="footer-divider">|</span>
            <span class="footer-text">水稻生长可视化预测系统</span>
            <span class="footer-divider">-</span>
            <span class="footer-text highlight">Rice Growth Visualization System</span>
        </div>
        
        <!-- 成功动画 -->
        <transition name="success-fade">
            <div class="success-overlay" v-if="loginSuccess">
                <div class="success-checkmark">
                    <div class="checkmark-circle"></div>
                    <div class="checkmark-check"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import util from '@/libs/util.js';
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            loading: false,
            loginSuccess: false,
            inputFocus: '',
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    mounted () {
        localStorage.clear();
        console.log('清除数据。。。');
    },
    methods: {
        getParticleStyle(index, type) {
            const seed = index * 137.508;
            const size = type === 'large' ? 10 : type === 'small' ? 4 : 6;
            const duration = 15 + (index % 10);
            const delay = (index * 0.5) % 10;
            const left = ((seed * 1.618) % 100);
            const top = ((seed * 0.618) % 100);
            
            return {
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            };
        },
        getMeteorStyle(index) {
            const left = [10, 30, 50, 70, 90][index - 1] + Math.random() * 10;
            const top = Math.random() * 30;
            const duration = 3 + Math.random() * 2;
            const delay = index * 4;
            return {
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            };
        },
        getFireflyStyle(index) {
            const seed = index * 73.137;
            const left = (seed * 1.618) % 100;
            const top = (seed * 0.618) % 100;
            const duration = 4 + Math.random() * 4;
            const delay = index * 0.8;
            return {
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            };
        },
        getSparkleStyle(index) {
            const angle = (index / 8) * 360;
            const radius = 80;
            return {
                '--angle': `${angle}deg`,
                '--radius': `${radius}px`
            };
        },
        handleSubmit () {         
            let _self=this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {                 
                    this.loading = true;
                    util.post(this,'admin/sys_user/login',{login_name:this.form.userName,password:this.form.password},function(datas){
                        _self.loading = true;
                        // 显示成功动画
                        _self.loginSuccess = true;
                        
                        setTimeout(() => {
                            localStorage.setItem('user', datas.login_name);
                            localStorage.setItem('userInfo', JSON.stringify(datas));
                            localStorage.setItem('token', datas.token);    
                            localStorage.setItem('menuList', JSON.stringify(datas.menu));                        
                            localStorage.setItem('dicts',JSON.stringify(datas.dicts));            
                            let menuList=util.reloadMenu(datas.menu);
                            _self.$store.commit('updateMyMenulist',menuList);  
                            _self.$store.commit('mountMyMenulist',_self); 
                            _self.$router.addRoutes(menuList); 
                            console.log("menuList",menuList)  
                            var firstName = menuList[0].name
                            if(menuList.length>0 && menuList[0].children.length>0){
                                firstName=menuList[0].children[0].name
                            }

                            _self.$router.push({
                                name: firstName
                            });
                        }, 800);
                    });
                }
            });
        },
        Register() {
            console.log("sss")
            this.$router.push({
                name: 'register'
            });
        }
    }
};
</script>

<style lang="less">
    @import './login.less';
</style>
