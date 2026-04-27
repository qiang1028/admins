<template>
    <div class="register" @keydown.enter="handleSubmit">
        <!-- Canvas粒子背景 -->
        <canvas id="particles-canvas"></canvas>
        
        <!-- 动态渐变背景 -->
        <div class="gradient-bg">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="gradient-orb orb-3"></div>
        </div>
        
        <!-- 浮动水稻叶片装饰 -->
        <div class="rice-decorations">
            <div class="rice-leaf leaf-1">
                <svg viewBox="0 0 100 50" fill="none">
                    <path d="M5 45 Q30 25 50 5 Q70 25 95 45" stroke="currentColor" stroke-width="2" fill="none"/>
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
        </div>
        
        <!-- 星光粒子 -->
        <div class="star-particles">
            <div class="star" v-for="i in 20" :key="i" :style="getStarStyle(i)"></div>
        </div>
        
        <!-- 科技网格线 -->
        <div class="grid-overlay"></div>

        <div class="register-con">
            <Card :bordered="false" class="login-card">
                <!-- 卡片光效 -->
                <div class="card-glow"></div>
                <div class="card-shine"></div>
                
                <p slot="title" class="p-title">
                    <span class="title-icon-wrapper">
                        <Icon type="person-add" class="title-icon"></Icon>
                        <div class="icon-ring"></div>
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
                                <Icon type="ios-person-outline" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.login_name" 
                                    placeholder="请输入用户名（登录账号）" 
                                    class="animated-input"
                                >
                                </Input>
                                <div class="input-underline"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="name" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-contact-outline" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.name" 
                                    placeholder="请输入姓名" 
                                    class="animated-input"
                                >
                                </Input>
                                <div class="input-underline"></div>
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
                                >
                                </Input>
                                <div class="input-underline"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="confirmPassword" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="locked" class="input-icon"></Icon>
                                <Input 
                                    type="password" 
                                    v-model="form.confirmPassword" 
                                    placeholder="请确认密码" 
                                    class="animated-input"
                                >
                                </Input>
                                <div class="input-underline"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="email" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="email" class="input-icon"></Icon>
                                <Input 
                                    v-model="form.email" 
                                    placeholder="请输入邮箱（选填）" 
                                    class="animated-input"
                                >
                                </Input>
                                <div class="input-underline"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem prop="phone" class="form-item-animated">
                            <div class="input-wrapper">
                                <Icon type="ios-telephone" class="input-icon"></Icon>
                               
                                <Input 
                                    v-model="form.phone" 
                                    placeholder="请输入电话号码（选填）" 
                                    class="animated-input"
                                >
                                </Input>
                                <div class="input-underline"></div>
                                <div class="input-glow"></div>
                            </div>
                        </FormItem>
                        <FormItem class="button-wrapper">
                            <Button 
                                @click="handleSubmit" 
                                :loading="loading" 
                                type="primary" 
                                long
                                class="register-button"
                            >
                                <span class="button-content" v-if="!loading">
                                    <Icon type="md-person-add" class="btn-icon"></Icon>
                                    <span class="btn-text">注 册</span>
                                </span>
                                <span class="button-loading" v-else>
                                    <span class="loading-dots">
                                        <span></span><span></span><span></span>
                                    </span>
                                    <span class="loading-text">注册中...</span>
                                </span>
                                <div class="button-ripple"></div>
                                <div class="button-shine"></div>
                            </Button>

                            <div class="options">
                                <span class="signup-option" @click="goToLogin">
                                    <Icon type="md-log-in" class="option-icon"></Icon>
                                    已有账号？<span>点击登录</span>
                                </span>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        
        <!-- 底部波浪装饰 -->
        <div class="wave-decoration">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,90 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.05)"/>
            </svg>
        </div>
        
        <div class="register-footer">
            <span class="footer-text">© 2026</span>
            <span class="footer-divider">|</span>
            <span class="footer-text">水稻生长可视化预测系统</span>
            <span class="footer-divider">-</span>
            <span class="footer-text highlight">Rice Growth Visualization System</span>
        </div>
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    data () {
        // 验证密码确认
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
            form: {
                login_name: '',
                password: '',
                confirmPassword: '',
                role_id: '',
                email: '',
                phone: '',
                name: ''
            },
            rules: {
                login_name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { type: 'string', min: 3, message: '用户名至少3个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码至少6个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
                ],
                email: [
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ]
            }
        };
    },
    mounted () {
        this.initParticles();
    },
    methods: {
        getStarStyle(index) {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            return {
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            };
        },
        initParticles() {
            const canvas = document.getElementById('particles-canvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particles = [];
            const particleCount = 80;
            const colors = ['#4CAF50', '#81C784', '#A5D6A7', '#667eea', '#764ba2'];
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(p => {
                    p.x += p.speedX;
                    p.y += p.speedY;
                    
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.opacity;
                    ctx.fill();
                    
                    particles.forEach(p2 => {
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = p.color;
                            ctx.globalAlpha = (1 - distance / 150) * 0.2;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        },

        // 提交注册
        handleSubmit () {
            let _self = this;
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    _self.loading = true;

                    const params = {
                        login_name: _self.form.login_name,
                        name: _self.form.name,
                        password: _self.form.password,
                        email: _self.form.email || '',
                        phone: _self.form.phone || '',
                        role_id: '37a460f0-c476-11f0-9b3a-13a6ec3a3b4e'
                    };

                    util.post(_self, 'admin/sys_user/register', params, function(datas) {
                        _self.loading = false;
                        _self.$Message.success('注册成功！请登录');
                        setTimeout(() => {
                            _self.$router.push({
                                name: 'login'
                            });
                        }, 1500);
                    });
                } else {
                    _self.$Message.error('请完善注册信息');
                }
            });
        },

        // 跳转到登录页
        goToLogin () {
            this.$router.push({
                name: 'login'
            });
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
