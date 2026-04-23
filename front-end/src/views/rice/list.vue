<template>
    <div class="rice-page">
        <!-- 飘落粒子 -->
        <div class="falling-particles">
            <div class="particle" v-for="i in 15" :key="i" :style="getParticleStyle(i)"></div>
        </div>
        
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="ios-leaf" class="header-icon" />
                <span class="title-text">水稻图片管理</span>
            </div>
            <div class="header-desc">管理和查看水稻生长图片数据</div>
        </div>

        <!-- 统计卡片区域 -->
        <div class="stats-container">
            <Row :gutter="16">
                <Col span="8">
                    <div class="stat-card stat-total">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #2d8cf0, #5aa5ff);">
                            <Icon type="ios-images-outline" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">图片总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-rice">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4CAF50, #81C784);">
                            <Icon type="ios-checkmark-circle" />
                        </div>
                        <div class="stat-value">{{ data.length }}</div>
                        <div class="stat-label">当前显示</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-success">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #19be6b, #52cb80);">
                            <Icon type="ios-cloud-done-outline" />
                        </div>
                        <div class="stat-value">{{ uploadSuccess }}</div>
                        <div class="stat-label">上传成功</div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 主内容卡片 -->
        <div class="content-card">
            <div class="card-header">
                <div class="card-title">
                    <Icon type="ios-grid" class="title-icon" />
                    图片列表
                    <span class="title-badge">实时更新</span>
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索图片名称" clearable class="search-input" @on-enter="handleSearch">
                        <Icon type="ios-search" slot="prefix" />
                    </Input>
                    <Button type="primary" icon="search" class="btn-search" @click="handleSearch">搜索</Button>
                    <Button icon="ios-refresh" class="btn-reset" @click="handleReset">重置</Button>
                </div>
                
                <!-- 表格区域 -->
                <div class="data-table">
                    <Table :columns="columns" :data="data" :loading="loading" stripe></Table>
                </div>

                <!-- 分页 -->
                <div class="pagination-wrapper">
                    <Page 
                        :total="count" 
                        :current="searchForm.current" 
                        show-total 
                        show-elevator 
                        :page-size="10"
                        @on-change="pageChange" 
                    />
                </div>
            </div>
        </div>

        <!-- 编辑模态框 -->
        <Modal 
            class="custom-modal"
            v-model="modalAdd" 
            :width="600"
            :mask-closable="false"
        >
            <div slot="header" class="modal-header-custom">
                <div class="modal-title">
                    <Icon type="md-create" class="title-icon" />
                    编辑水稻信息
                </div>
            </div>
            <div class="form-container">
                <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="水稻编号" prop="login_name">
                        <Input v-model="formValidate.login_name" :disabled="loginNameDisabled" placeholder="请输入水稻编号"></Input>
                    </FormItem>
                    <FormItem label="水稻名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入水稻名称"></Input>
                    </FormItem>
                    <FormItem label="水稻分类" prop="role_id">
                        <Select v-model="formValidate.role_id" placeholder="请选择分类">
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="水稻图片" prop="email">
                        <Input v-model="formValidate.email" placeholder="请输入图片URL"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入联系电话"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="modal-footer-custom">
                <Button type="default" @click="addCanFun" class="btn-cancel">取消</Button>
                <Button type="primary" @click="addOkFun" :loading="modalLoading" class="btn-confirm">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    export default {
        data () {
            return {
                modalAdd: false,
                modalEdit: false,
                loading: false,
                modalLoading: false,
                modalCanBut: true,
                uploadSuccess: 0,
                data: [],
                roleList: [],
                formValidate: {},
                searchForm: {
                    type: '',
                    current: 1
                },
                allList: [],
                count: 0,
                loginNameDisabled: false,
                columns: [
                    {
                        title: '图片大小',
                        key: 'size_mb',
                        width: 120,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-attach' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.size_mb + ' MB')
                            ]);
                        }
                    },
                    {
                        title: '图片名称',
                        key: 'filename',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '预览图片',
                        key: 'url',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                class: 'image-cell'
                            }, [
                                h('img', {
                                    attrs: {
                                        src:  params.row.file_path,
                                        alt: 'Rice Image'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'modified_time',
                        width: 180,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-clock-outline' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.modified_time)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                class: 'action-btn'
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                ruleValidate: {
                    login_name: [
                        { required: true, message: '必填项', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '必填项', trigger: 'blur' }
                    ],
                    role_id: [
                        { required: true, message: '必填项', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getParticleStyle(index) {
                const duration = Math.random() * 5 + 8;
                const delay = Math.random() * 10;
                const left = Math.random() * 100;
                return {
                    left: `${left}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                };
            },
            handleReset() {
                this.searchForm.name = '';
                this.searchForm.current = 1;
                this.init();
            },
            init () {
                let _self = this;
                _self.loading = true;
                util.post(_self, 'admin/sys_rice/pageData',this.searchForm, function(datas) {                  
                    console.log("datas:", datas)
                    _self.data = datas.data;
                    _self.count = datas.count;
                    _self.loading = false;                  
                });
            },
            handleSearch() {
                this.searchForm.current = 1;
                this.init();
            },
            pageChange(current) {
                this.searchForm.current = current;
                this.init()
            },
            
            add () {           
                this.loginNameDisabled = false;       
                this.formValidate = {};   
                this.modalAdd = true;            
            },
            edit (param) {
                this.formValidate = util.copy(param.row);
                this.loginNameDisabled = true;   
                this.modalAdd = true;                          
            },
            remove (param) {
                let _self = this;
                const axios = require('axios')
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p style="color:#ed4014;font-weight:600;">删除后数据无法恢复，是否继续？</p>',
                    okText: '确认删除',
                    cancelText: '取消',
                    onOk: () => {
                        this.loading = true;
                        axios.delete1(_self,`/upload-images/delete-uploaded/${param.row.filename}`,{},function(response){
                             _self.data.splice(param.index, 1);
                                _self.loading = false;               
                                _self.$Message.success('删除成功！'); 
                                console.log('Resource deleted successfully:', response.data);
                                _self.init();
                        })
                    }
                });                          
            },
            
           
            addOkFun() {
                let _self = this;
                this.$refs['formRef'].validate((valid) => {
                    if (valid) {
                        util.changeModalLoading(this, true);
                        let _data = util.copy(this.formValidate);    
                        if (this.formValidate && this.formValidate.id) {
                            util.post(this, 'admin/sys_user/updateData', _data, function(datas) {                  
                                _self.$Message.success('编辑成功！');
                                _self.addCanFun();  
                                _self.init();        
                            });                          
                        } else {
                            util.post(this, 'admin/sys_user/addData', _data, function(datas) {                  
                                _self.$Message.success('新增成功！');
                                _self.addCanFun(); 
                                _self.init();                
                            });                          
                        }
                        
                    } else {
                        util.changeModalLoading(this);
                    } 
                })            
            },         
            addCanFun() {      
                this.modalAdd = false; 
                util.changeModalLoading(this);         
                this.$refs['formRef'].resetFields(); 
            }
        },
        mounted () {
            let _self = this;
            util.post(this, 'admin/sys_role/allData', {}, function(datas) { 
                _self.roleList = datas;                          
            });
            this.init();   
        }
    }
</script>

<style lang="less">
    // ==========================================
    // 极致美化水稻管理页面 - 水稻可视化系统
    // ==========================================
    
    // 水稻可视化主题色变量 - 绿色农业主题
    @primary-color: #2d8cf0;
    @success-color: #19be6b;
    @warning-color: #ff9900;
    @danger-color: #ed4014;
    @rice-green: #4CAF50;
    @rice-dark: #1B5E20;
    @rice-light: #81C784;
    @rice-accent: #A5D6A7;
    @bg-dark: #0a1a0a;
    @bg-card: rgba(255, 255, 255, 0.03);
    @accent-gradient: linear-gradient(135deg, #4CAF50, #8BC34A, #CDDC39);
    @glass-bg: rgba(255, 255, 255, 0.05);
    @shadow-light: 0 4px 16px rgba(0, 0, 0, 0.1);
    @shadow-hover: 0 12px 40px rgba(76, 175, 80, 0.2);

    // 页面容器
    .rice-page {
        padding: 24px;
        min-height: 100vh;
        position: relative;
        background: linear-gradient(135deg, #0a1a0a 0%, #0d260d 50%, #0a1a0a 100%);
        overflow: hidden;

        // 动态背景
        &::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, rgba(129, 199, 132, 0.3), transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(76, 175, 80, 0.3), transparent),
                radial-gradient(1px 1px at 90px 40px, rgba(165, 214, 167, 0.4), transparent),
                radial-gradient(2px 2px at 130px 80px, rgba(129, 199, 132, 0.25), transparent);
            background-repeat: repeat;
            background-size: 180px 180px;
            animation: starsMove 40s linear infinite;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes starsMove {
            from {
                background-position: 0 0;
            }
            to {
                background-position: 180px 360px;
            }
        }

        // 光效叠加
        &::after {
            content: '';
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
                radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(139, 195, 74, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(165, 214, 167, 0.05) 0%, transparent 50%);
            animation: bgPulse 6s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes bgPulse {
            0%, 100% {
                transform: scale(1) rotate(0deg);
                opacity: 0.6;
            }
            50% {
                transform: scale(1.1) rotate(3deg);
                opacity: 1;
            }
        }

        // 飘落的水稻粒子
        .falling-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;

            .particle {
                position: absolute;
                width: 4px;
                height: 12px;
                background: linear-gradient(to bottom, @rice-light, transparent);
                border-radius: 2px;
                opacity: 0.4;
                animation: fall linear infinite;

                @keyframes fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.4;
                    }
                    90% {
                        opacity: 0.4;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            }
        }
    }

    // 页面标题区域
    .page-header {
        background: linear-gradient(135deg, rgba(27, 94, 32, 0.95), rgba(46, 125, 50, 0.95), rgba(56, 142, 60, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 32px 36px;
        margin-bottom: 28px;
        color: #fff;
        box-shadow: 
            0 10px 40px rgba(27, 94, 32, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        position: relative;
        overflow: hidden;
        z-index: 10;
        animation: headerSlide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 1px solid rgba(129, 199, 132, 0.3);

        @keyframes headerSlide {
            0% {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(129, 199, 132, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }

        &::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, rgba(129, 199, 132, 0.15), transparent, rgba(76, 175, 80, 0.15), transparent);
            animation: borderRotate 10s linear infinite;
        }

        @keyframes borderRotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .header-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 16px;
            position: relative;
            z-index: 1;

            .header-icon {
                font-size: 36px;
                background: linear-gradient(135deg, #A5D6A7 0%, #81C784 50%, #66BB6A 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 2px 8px rgba(129, 199, 132, 0.5));
                animation: leafSway 3s ease-in-out infinite;
                position: relative;

                @keyframes leafSway {
                    0%, 100% {
                        transform: rotate(-5deg);
                    }
                    50% {
                        transform: rotate(5deg);
                    }
                }
            }

            .title-text {
                position: relative;
                color: #fff;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

                &::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, @rice-light, @rice-accent, transparent);
                    animation: underlineExpand 2s ease-out forwards;
                }

                @keyframes underlineExpand {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }
            }
        }

        .header-desc {
            color: rgba(255, 255, 255, 0.7);
            font-size: 15px;
            position: relative;
            z-index: 1;
            margin-left: 52px;
            animation: fadeInUp 0.6s ease-out 0.3s both;
        }
    }

    // 统计卡片区域
    .stats-container {
        margin-bottom: 28px;
        position: relative;
        z-index: 10;
        animation: fadeInUp 0.6s ease-out 0.2s both;

        .ivu-row {
            margin: 0 -12px;

            .ivu-col {
                padding: 0 12px;
            }
        }
    }

    .stat-card {
        background: @glass-bg;
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 28px;
        box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(129, 199, 132, 0.1) inset;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(129, 199, 132, 0.15);
        position: relative;
        overflow: hidden;
        animation: cardBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;

        &:nth-child(1) { animation-delay: 0.1s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.3s; }

        @keyframes cardBounceIn {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-color), transparent);
            opacity: 0;
            transition: opacity 0.4s;
        }

        &::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
            opacity: 0.05;
            transition: all 0.5s;
        }

        &:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                0 20px 50px rgba(0, 0, 0, 0.3),
                0 0 30px rgba(76, 175, 80, 0.2);

            &::before {
                opacity: 1;
            }

            &::after {
                transform: scale(1.5);
                opacity: 0.1;
            }

            .stat-icon {
                transform: scale(1.15) rotate(8deg);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }

            .stat-value {
                background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 0 0 30px var(--accent-color);
            }
        }

        &.stat-total {
            --accent-color: @primary-color;
            --accent-light: #5aa5ff;
            border-left: 4px solid @primary-color;
        }

        &.stat-rice {
            --accent-color: @rice-green;
            --accent-light: @rice-light;
            border-left: 4px solid @rice-green;
        }

        &.stat-success {
            --accent-color: @success-color;
            --accent-light: #52cb80;
            border-left: 4px solid @success-color;
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;

            &::after {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: iconShine 3s linear infinite;
            }
            
            .ivu-icon {
                font-size: 32px;
                color: #fff;
                position: relative;
                z-index: 1;
            }
            
            @keyframes iconShine {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }

        .stat-value {
            font-size: 38px;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 8px;
            transition: all 0.4s;
            position: relative;
            display: inline-block;

            &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 40px;
                height: 3px;
                background: var(--accent-color);
                border-radius: 2px;
                animation: valueUnderline 0.5s ease-out forwards;
            }
        }

        @keyframes valueUnderline {
            from {
                width: 0;
            }
            to {
                width: 40px;
            }
        }

        .stat-label {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;

            &::before {
                content: '';
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                border-radius: 50%;
                animation: labelPulse 1.5s ease-in-out infinite;
            }

            @keyframes labelPulse {
                0%, 100% {
                    opacity: 0.5;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
        }
    }

    // 主内容卡片
    .content-card {
        background: @glass-bg;
        backdrop-filter: blur(20px);
        border-radius: 20px;
        box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(129, 199, 132, 0.1) inset;
        border: 1px solid rgba(129, 199, 132, 0.15);
        overflow: hidden;
        position: relative;
        z-index: 10;
        animation: fadeInUp 0.6s ease-out 0.4s both;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent);
        }

        .card-header {
            padding: 24px 32px;
            border-bottom: 1px solid rgba(129, 199, 132, 0.15);
            background: linear-gradient(135deg, rgba(27, 94, 32, 0.8), rgba(46, 125, 50, 0.8));
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(129, 199, 132, 0.3), transparent);
            }

            .card-title {
                font-size: 18px;
                font-weight: 600;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 12px;

                .title-icon {
                    color: @rice-light;
                    font-size: 22px;
                    animation: iconPulse 2s ease-in-out infinite;
                }

                @keyframes iconPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                .title-badge {
                    background: linear-gradient(135deg, @rice-green, @rice-light);
                    color: #fff;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    animation: badgePulse 2s ease-in-out infinite;
                }

                @keyframes badgePulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
                    }
                    50% {
                        box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
                    }
                }
            }
        }

        .card-body {
            padding: 32px;
        }
    }

    // 搜索区域
    .search-area {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 28px;
        padding: 24px;
        background: linear-gradient(135deg, rgba(27, 94, 32, 0.6), rgba(46, 125, 50, 0.6));
        border-radius: 16px;
        border: 1px solid rgba(129, 199, 132, 0.2);
        position: relative;
        overflow: hidden;
        animation: searchSlide 0.5s ease-out 0.5s both;

        @keyframes searchSlide {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, rgba(129, 199, 132, 0.05), transparent, rgba(76, 175, 80, 0.05));
            pointer-events: none;
        }

        .search-input {
            width: 320px;
            transition: all 0.4s;

            .ivu-input-wrapper {
                .ivu-input {
                    height: 42px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(129, 199, 132, 0.2);
                    color: #fff;
                    font-size: 14px;
                    transition: all 0.3s;

                    &::placeholder {
                        color: rgba(255, 255, 255, 0.4);
                    }

                    &:hover {
                        border-color: rgba(129, 199, 132, 0.5);
                        background: rgba(255, 255, 255, 0.08);
                    }

                    &:focus {
                        border-color: @rice-green;
                        background: rgba(255, 255, 255, 0.1);
                        box-shadow: 
                            0 0 0 3px rgba(76, 175, 80, 0.2),
                            0 0 20px rgba(76, 175, 80, 0.2);
                    }
                }

                .ivu-input-icon {
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }

        .btn-search {
            height: 42px;
            padding: 0 24px;
            background: linear-gradient(135deg, @rice-green, @rice-light) !important;
            border: none !important;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4) !important;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5) !important;

                &::before {
                    left: 100%;
                }
            }
        }

        .btn-reset {
            height: 42px;
            padding: 0 20px;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(129, 199, 132, 0.2) !important;
            color: rgba(255, 255, 255, 0.7) !important;
            border-radius: 12px;
            transition: all 0.3s;

            &:hover {
                border-color: @rice-green !important;
                color: @rice-light !important;
                background: rgba(76, 175, 80, 0.1) !important;
            }
        }
    }

    // 表格样式
    .data-table {
        border-radius: 16px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(129, 199, 132, 0.05);

        .ivu-table-wrapper {
            border-radius: 16px;
            overflow: hidden;

            .ivu-table {
                background: transparent;
                font-size: 14px;

                &::before, &::after {
                    display: none;
                }

                th {
                    background: linear-gradient(135deg, rgba(27, 94, 32, 0.95), rgba(46, 125, 50, 0.95)) !important;
                    color: #fff;
                    font-weight: 600;
                    font-size: 14px;
                    padding: 18px 16px !important;
                    border-bottom: 2px solid rgba(76, 175, 80, 0.3) !important;
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, @rice-green, transparent);
                    }

                    .ivu-table-cell {
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                td {
                    padding: 18px 16px !important;
                    color: rgba(255, 255, 255, 0.8);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    background: transparent !important;
                    transition: all 0.3s;
                }

                tr {
                    transition: all 0.3s;
                    animation: rowSlideIn 0.5s ease-out backwards;

                    &:nth-child(1) { animation-delay: 0.05s; }
                    &:nth-child(2) { animation-delay: 0.1s; }
                    &:nth-child(3) { animation-delay: 0.15s; }
                    &:nth-child(4) { animation-delay: 0.2s; }
                    &:nth-child(5) { animation-delay: 0.25s; }
                    &:nth-child(6) { animation-delay: 0.3s; }
                    &:nth-child(7) { animation-delay: 0.35s; }
                    &:nth-child(8) { animation-delay: 0.4s; }
                    &:nth-child(9) { animation-delay: 0.45s; }
                    &:nth-child(10) { animation-delay: 0.5s; }

                    @keyframes rowSlideIn {
                        from {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    &:hover td {
                        background: rgba(76, 175, 80, 0.1) !important;
                        transform: scale(1.01);
                    }
                }

                .ivu-table-row-hover td {
                    background: rgba(76, 175, 80, 0.15) !important;
                }
            }
        }

        .image-cell {
            img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 12px;
                border: 2px solid rgba(76, 175, 80, 0.3);
                transition: all 0.4s;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

                &:hover {
                    transform: scale(1.15) rotate(2deg);
                    border-color: @rice-green;
                    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
                }
            }
        }

        .date-cell {
            color: rgba(255, 255, 255, 0.6);
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;

            .date-icon {
                color: @rice-light;
                animation: iconPulse 2s ease-in-out infinite;
            }
        }
    }

    // 操作按钮
    .action-btn {
        display: flex;
        gap: 12px;
        justify-content: center;

        .btn-delete {
            padding: 0 16px;
            height: 34px;
            background: rgba(237, 65, 20, 0.1) !important;
            border: 1px solid rgba(237, 65, 20, 0.3) !important;
            color: #ff6b6b !important;
            border-radius: 10px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(237, 65, 20, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.4s, height 0.4s;
            }

            &:hover {
                transform: translateY(-2px);
                background: rgba(237, 65, 20, 0.2) !important;
                box-shadow: 0 4px 15px rgba(237, 65, 20, 0.3) !important;

                &::before {
                    width: 200px;
                    height: 200px;
                }
            }
        }
    }

    // 模态框样式
    .custom-modal {
        .ivu-modal {
            .ivu-modal-content {
                border-radius: 24px;
                overflow: hidden;
                background: linear-gradient(135deg, rgba(27, 94, 32, 0.98), rgba(46, 125, 50, 0.98));
                box-shadow: 
                    0 25px 80px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(129, 199, 132, 0.2);
                animation: modalSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            @keyframes modalSlide {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
        }

        .modal-header-custom {
            background: linear-gradient(135deg, rgba(27, 94, 32, 0.95), rgba(46, 125, 50, 0.95));
            padding: 28px 32px;
            border-bottom: none;
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
                animation: headerShimmer 3s ease-in-out infinite;
            }

            @keyframes headerShimmer {
                0%, 100% {
                    transform: translateX(-100%);
                }
                50% {
                    transform: translateX(100%);
                }
            }

            .modal-title {
                color: #fff;
                font-size: 22px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 14px;
                position: relative;
                z-index: 1;

                .title-icon {
                    font-size: 26px;
                    color: @rice-light;
                    animation: iconFloat 2s ease-in-out infinite;
                }

                @keyframes iconFloat {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-3px);
                    }
                }
            }
        }

        .form-container {
            padding: 32px;

            .ivu-form-item-label {
                color: @rice-light;
                font-weight: 500;
            }

            .ivu-input, .ivu-select-selection {
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(129, 199, 132, 0.2);
                color: #fff;

                &::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }

                &:focus {
                    border-color: @rice-green;
                    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
                }
            }

            .ivu-select-dropdown {
                background: rgba(27, 94, 32, 0.98);
                border: 1px solid rgba(129, 199, 132, 0.2);
                border-radius: 12px;

                .ivu-select-item {
                    color: rgba(255, 255, 255, 0.8);

                    &:hover {
                        background: rgba(76, 175, 80, 0.1);
                    }

                    &.ivu-select-item-selected {
                        background: rgba(76, 175, 80, 0.2);
                        color: @rice-light;
                    }
                }
            }
        }

        .modal-footer-custom {
            padding: 24px 32px;
            border-top: 1px solid rgba(129, 199, 132, 0.15);
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: flex-end;
            gap: 16px;

            .btn-cancel {
                padding: 0 24px;
                height: 40px;
                background: rgba(255, 255, 255, 0.05) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: rgba(255, 255, 255, 0.7) !important;
                border-radius: 12px;
                transition: all 0.3s;

                &:hover {
                    border-color: @rice-green !important;
                    color: @rice-light !important;
                    background: rgba(76, 175, 80, 0.1) !important;
                }
            }

            .btn-confirm {
                padding: 0 28px;
                height: 40px;
                background: linear-gradient(135deg, @rice-green, @rice-light) !important;
                border: none !important;
                color: #fff !important;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4) !important;
                transition: all 0.3s;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5) !important;
                }
            }
        }
    }

    // 分页样式
    .pagination-wrapper {
        margin-top: 28px;
        padding: 24px 0;
        display: flex;
        justify-content: center;
        animation: fadeInUp 0.5s ease-out 0.6s both;

        .ivu-page {
            .ivu-page-item {
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(129, 199, 132, 0.15);
                color: rgba(255, 255, 255, 0.8);
                transition: all 0.3s;
                min-width: 36px;
                height: 36px;
                line-height: 36px;

                &:hover {
                    border-color: @rice-green;
                    color: @rice-light;
                    background: rgba(76, 175, 80, 0.1);
                    transform: translateY(-2px);
                }

                &.ivu-page-item-active {
                    background: linear-gradient(135deg, @rice-green, @rice-light);
                    border-color: transparent;
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
                    font-weight: 600;
                }
            }

            .ivu-page-prev, .ivu-page-next {
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(129, 199, 132, 0.15);
                color: rgba(255, 255, 255, 0.7);

                &:hover {
                    border-color: @rice-green;
                    color: @rice-light;
                }
            }

            .ivu-page-options {
                .ivu-page-options-elevator {
                    input {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(129, 199, 132, 0.15);
                        color: #fff;
                        border-radius: 8px;

                        &:focus {
                            border-color: @rice-green;
                            box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
                        }
                    }
                }
            }
        }
    }

    // 动画
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    // 响应式
    @media (max-width: 768px) {
        padding: 16px;

        .page-header {
            padding: 24px 20px;

            .header-title {
                font-size: 22px;

                .header-icon {
                    font-size: 28px;
                }
            }

            .header-desc {
                font-size: 13px;
                margin-left: 0;
            }
        }

        .search-area {
            flex-direction: column;
            align-items: stretch;

            .search-input {
                width: 100%;
            }
        }

        .stat-card {
            margin-bottom: 16px;
            padding: 20px;

            .stat-value {
                font-size: 32px;
            }
        }
    }
</style>
