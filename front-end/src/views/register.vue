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

        <div class="login-con" :class="{ 'login-success': registerSuccess }">
            <Card :bordered="false" class="login-card">
                <div class="card-border-glow"></div>
                <div class="card-particles">
                    <div class="sparkle" v-for="i in 8" :key="'sparkle-'+i" :style="getSparkleStyle(i)"></div>
                </div>
                
                <p slot="title" class="p-title">
                    <span class="title-icon-wrapper">
                        <div class="title-bg"></div>
                        <Icon type="md-person-add" class="title-icon"></Icon>
                        <div class="title-ring"></div>
                    </span>
                    <span class="title-text">
                        <span class="title-main">用户注册</span>
                        <span class="title-sub">Create Your Account</span>
                    </span>
                </p>
                
                <div class="form-con">
                    <Form ref="registerForm" :model="form" :rules="rules">
                        <FormItem prop="login_name" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-at-outline" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.login_name" 
                                    placeholder="请输入用户名" 
                                    class="animated-input"
                                    @on-focus="inputFocus = 'login_name'"
                                    @on-blur="inputFocus = ''"
                                ></Input>
                                <div class="input-underline" :class="{ active: inputFocus === 'login_name' }"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="name" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-person-outline" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.name" 
                                    placeholder="请输入真实姓名" 
                                    class="animated-input"
                                    @on-focus="inputFocus = 'name'"
                                    @on-blur="inputFocus = ''"
                                ></Input>
                                <div class="input-underline" :class="{ active: inputFocus === 'name' }"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="password" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-lock-outline" class="input-icon"></Icon>
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
                        <FormItem prop="confirmPassword" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-lock-outline" class="input-icon"></Icon>
                                <Input 
                                    type="password" 
                                    v-model="form.confirmPassword" 
                                    placeholder="请确认密码" 
                                    class="animated-input"
                                    @on-focus="inputFocus = 'confirmPassword'"
                                    @on-blur="inputFocus = ''"
                                ></Input>
                                <div class="input-underline" :class="{ active: inputFocus === 'confirmPassword' }"></div>
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
                                        <Icon type="md-checkmark-circle" class="btn-icon"></Icon>
                                        <span class="btn-text">注 册</span>
                                    </span>
                                    <span class="button-loading" v-else>
                                        <span class="loading-dots">
                                            <span></span><span></span><span></span>
                                        </span>
                                        <span class="loading-text">注册中...</span>
                                    </span>
                                </Button>
                                <div class="button-particles">
                                    <span class="btn-particle" v-for="i in 6" :key="'bp-'+i"></span>
                                </div>
                            </div>
                        </FormItem>
                    </Form>
                    <div class="options">
                        <span class="signup-option" @click="goLogin">
                            <Icon type="md-arrow-back" class="option-icon"></Icon>
                            已有账号？<span>返回登录</span>
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
        
        <!-- 注册成功动画 -->
        <transition name="success-fade">
            <div class="success-overlay" v-if="registerSuccess">
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
export default {
    data () {
        // 密码确认验证
        const validateConfirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        
        return {
            loading: false,
            registerSuccess: false,
            inputFocus: '',
            form: {
                login_name: '',
                name: '',
                password: '',
                confirmPassword: '',
                role_id: 2  // 默认普通用户角色
            },
            rules: {
                login_name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { type: 'string', min: 3, message: '用户名至少3个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码至少6个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
                ]
            }
        };
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
            let _self = this;
            this.$refs.registerForm.validate((valid) => {
                if (valid) {                 
                    this.loading = true;
                    util.post(this, 'admin/sys_user/register', this.form, function(datas){
                        _self.loading = false;
                        // 显示成功动画
                        _self.registerSuccess = true;
                        
                        setTimeout(() => {
                            _self.$router.push({
                                path: '/login'
                            });
                        }, 1500);
                    }, function(err){
                        _self.loading = false;
                    });
                }
            });
        },
        goLogin() {
            this.$router.push({
                path: '/login'
            });
        }
    }
};
</script>

<style lang="less">
    @import './login.less';
</style>
