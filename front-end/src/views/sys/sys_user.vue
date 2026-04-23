<template>
    <div class="user-page">    
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="md-person" class="header-icon" />
                用户管理
            </div>
            <div class="header-desc">管理系统用户账户和权限</div>
        </div>

        <!-- 统计卡片区域 -->
        <div class="stats-container">
            <Row :gutter="16">
                <Col span="8">
                    <div class="stat-card stat-total">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #2d8cf0, #5aa5ff);">
                            <Icon type="ios-people" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">用户总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-active">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #19be6b, #52cb80);">
                            <Icon type="ios-checkmark-circle" />
                        </div>
                        <div class="stat-value">{{ activeCount }}</div>
                        <div class="stat-label">活跃用户</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-warning">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #ff9900, #ffb340);">
                            <Icon type="ios-warning" />
                        </div>
                        <div class="stat-value">{{ frozenCount }}</div>
                        <div class="stat-label">冻结用户</div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 主内容卡片 -->
        <div class="content-card">
            <div class="card-header">
                <div class="card-title">
                    <Icon type="ios-people" class="title-icon" />
                    用户列表
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索用户姓名" clearable class="search-input" @on-enter="handleSearch">
                        <Icon type="ios-search" slot="prefix" />
                    </Input>
                    <Button type="primary" icon="search" class="btn-search" @click="handleSearch">搜索</Button>
                    <Button icon="ios-refresh" class="btn-reset" @click="handleReset">重置</Button>
                    <Button type="primary" icon="md-add" class="btn-add" @click="add">添加用户</Button>
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

        <!-- 添加/编辑模态框 -->
        <Modal 
            class="custom-modal"
            v-model="modalAdd" 
            :width="500"
            :mask-closable="false"
        >
            <div slot="header" class="modal-header-custom">
                <div class="modal-title">
                    <Icon type="md-person-add" class="title-icon" />
                    {{ loginNameDisabled ? '编辑用户' : '添加用户' }}
                </div>
            </div>
            <div class="form-container">
                <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="用户名" prop="login_name">
                        <Input v-model="formValidate.login_name" :disabled="loginNameDisabled" placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password" v-if="!loginNameDisabled">
                        <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="角色" prop="role_id">
                        <Select v-model="formValidate.role_id" placeholder="请选择角色">
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
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
                data: [],
                roleList: [],
                formValidate: {},
                searchForm: {
                    type: '',
                    current: 1
                },
                count: 0,
                loginNameDisabled: false,
                columns: [
                    {
                        title: '用户名',
                        key: 'login_name',
                        width: 140,
                        render: (h, params) => {
                            return h('div', {
                                class: 'cell-user'
                            }, [
                                h('div', {
                                    class: 'user-avatar'
                                }, params.row.login_name ? params.row.login_name.charAt(0).toUpperCase() : 'U'),
                                h('div', {
                                    class: 'user-info'
                                }, [
                                    h('div', {
                                        class: 'user-name'
                                    }, params.row.login_name)
                                ])
                            ]);
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '角色',
                        key: 'rolename',
                        width: 120,
                        render: (h, params) => {
                            return h('div', {
                                class: 'cell-role'
                            }, params.row.rolename);
                        }
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        width: 140
                    },
                    {
                        title: '登录时间',
                        key: 'login_date',
                        width: 120,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-clock-outline' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.login_date || '-')
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            const status = params.row.status;
                            return h('i-switch', {
                                props: {
                                    value: status,
                                    trueValue: "1",
                                    falseValue: "0"
                                },
                                scopedSlots: {
                                    open: () => h('span', '正常'),
                                    close: () => h('span', '冻结')
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.changeStatus(value, params);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 220,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                class: 'action-btn'
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    class: 'btn-edit',
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params);
                                        }
                                    }
                                }, [
                                    h('Icon', { props: { type: 'ios-create-outline' } }),
                                    h('span', '编辑')
                                ]),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    class: 'btn-reset',
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.resetPwd(params);
                                        }
                                    }
                                }, [
                                    h('Icon', { props: { type: 'ios-key-outline' } }),
                                    h('span', '重置')
                                ]),
                                h('Button', {
                                    props: {
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
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    role_id: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            activeCount() {
                return this.data.filter(item => item.status === 1).length;
            },
            frozenCount() {
                return this.data.filter(item => item.status !== 1).length;
            }
        },
        methods: {
            handleReset() {
                this.searchForm.name = '';
                this.searchForm.current = 1;
                this.init();
            },
            init () {
                let _self = this;
                _self.loading = true;
                util.post(this, 'admin/sys_user/pageData', this.searchForm, function(datas) {                  
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
                this.init();
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
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p style="color:#ed4014;font-weight:600;">删除后数据无法恢复，是否继续？</p>',
                    okText: '确认删除',
                    cancelText: '取消',
                    onOk: () => {
                        this.loading = true;
                        util.post(this, 'admin/sys_user/delData', {id: param.row.id}, function(datas) { 
                            _self.data.splice(param.index, 1);
                            _self.loading = false;               
                            _self.$Message.success('删除成功！');              
                            _self.init();
                        });
                    }
                });                          
            },
            resetPwd (param) {
                let _self = this;
                this.$Modal.confirm({
                    title: '重置密码',
                    content: '<p>重置后的密码为：<strong style="color:#ff9900">111111</strong>，是否继续？</p>',
                    okText: '确认重置',
                    cancelText: '取消',
                    onOk: () => {
                        this.loading = true;
                        util.post(this, 'admin/sys_user/resetPwd', {id: param.row.id}, function(datas) { 
                            _self.loading = false;               
                            _self.$Message.success('密码重置成功！');              
                        });
                    }
                });                          
            },
            changeStatus (value, param) {
                let _self = this;
                this.loading = true;
                util.post(this, 'admin/sys_user/changeStatus', {id: param.row.id, status: value}, function(datas) { 
                    _self.data[param.index].status = value;
                    _self.loading = false;               
                    _self.$Message.success('状态修改成功！');              
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
    // 用户管理主题色变量
    @primary-color: #2d8cf0;
    @success-color: #19be6b;
    @warning-color: #ff9900;
    @danger-color: #ed4014;
    @user-blue: #1890ff;
    @user-dark: #096dd9;
    @user-light: #40a9ff;
    @bg-dark: #1a1a2e;
    @bg-card: #16213e;
    @accent-gradient: linear-gradient(135deg, #1890ff, #69c0ff);
    @glass-bg: rgba(255, 255, 255, 0.95);
    @shadow-light: 0 4px 16px rgba(0, 0, 0, 0.08);
    @shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);

    // 页面容器 - 所有样式嵌套在此
    .user-page {
        padding: 0px;
        background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 50%, #f5f7fa 100%);
        min-height: 100vh;
        position: relative;
        // 表格样式
        .data-table {
            border-radius: 12px;
            overflow: hidden;

            .ivu-table-wrapper {
                border-radius: 12px;
                overflow: hidden;

                .ivu-table {
                    font-size: 14px;

                    th {
                        background: linear-gradient(135deg, #fafbfc 0%, #f0f2f5 100%) !important;
                        color: #1a1a2e;
                        font-weight: 600;
                    }

                    td {
                        color: #475569;
                    }
                }
            }

            .cell-user {
                display: flex;
                align-items: center;
                gap: 10px;

                .user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, @user-blue, @user-light);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 14px;
                }

                .user-info {
                    .user-name {
                        font-weight: 500;
                        color: #1a1a2e;
                    }
                }
            }

            .cell-role {
                color: @user-blue;
                font-weight: 500;
            }

            .date-cell {
                display: flex;
                align-items: center;
                gap: 6px;
                color: #64748b;
                font-size: 13px;

                .date-icon {
                    color: @user-light;
                }
            }
        }
        // 页面标题区域
        .page-header {
            background: linear-gradient(135deg, #096dd9 0%, #1890ff 50%, #40a9ff 100%);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 8px 32px rgba(9, 109, 217, 0.3);
            position: relative;
            overflow: hidden;
            animation: slideDown 0.6s ease-out;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            
        }
        .header-title {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 14px;

            .header-icon {
                font-size: 32px;
            }
        }

        .header-desc {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-left: 0px;
        }
         // 统计卡片
        .stats-container {
            margin-bottom: 24px;

            .ivu-row {
                margin: 0 -12px;

                .ivu-col {
                    padding: 0 12px;
                }
            }
        }

        .stat-card {
            background: @glass-bg;
            border-radius: 16px;
            padding: 24px;
            box-shadow: @shadow-light;
            transition: all 0.3s ease;
            border: 1px solid rgba(24, 144, 255, 0.1);
            animation: cardSlide 0.5s ease-out backwards;

            &:nth-child(1) { animation-delay: 0.1s; }
            &:nth-child(2) { animation-delay: 0.2s; }
            &:nth-child(3) { animation-delay: 0.3s; }

            @keyframes cardSlide {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            &:hover {
                box-shadow: @shadow-hover;
                transform: translateY(-4px);
            }

            .stat-icon {
                width: 52px;
                height: 52px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
                
                .ivu-icon {
                    font-size: 28px;
                    color: #fff;
                }
            }

            .stat-value {
                font-size: 32px;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 14px;
                color: #64748b;
            }

            &.stat-total {
                border-left: 4px solid @primary-color;
            }

            &.stat-active {
                border-left: 4px solid @success-color;
            }

            &.stat-warning {
                border-left: 4px solid @warning-color;
            }
        }
        // 主内容卡片
        .content-card {
            background: @glass-bg;
            border-radius: 16px;
            box-shadow: @shadow-light;
            overflow: hidden;

            .card-header {
                padding: 20px 24px;
                border-bottom: 1px solid #e8ecf1;
                background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);

                .card-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a1a2e;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                    color: @user-blue;
                }
            }
        }

        .card-body {
            padding: 24px;
        }

        // 搜索区域
        .search-area {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 20px;

            .search-input {
                width: 240px;

                .ivu-input {
                    border-radius: 8px;
                }
            }

            .btn-search {
                background: linear-gradient(135deg, @user-blue, @user-light) !important;
                border: none !important;
                border-radius: 8px;
            }

            .btn-reset {
                border-radius: 8px;
            }

            .btn-add {
                background: linear-gradient(135deg, @success-color, #52cb80) !important;
                border: none !important;
                border-radius: 8px;
                margin-left: auto;
            }
        }

        

        // 操作按钮
        .action-btn {
            display: flex;
            gap: 8px;
            justify-content: center;

            .btn-edit {
                background: linear-gradient(135deg, @user-blue, @user-light) !important;
                border: none !important;
            }

            .btn-reset {
                background: linear-gradient(135deg, @warning-color, #ffb340) !important;
                border: none !important;
                color: #fff !important;
            }
        }
        &::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 20%, rgba(24, 144, 255, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(64, 169, 255, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }
        
        

       

        
    }

    // 模态框样式
    .custom-modal {
        .ivu-modal {
            .ivu-modal-content {
                border-radius: 16px;
                overflow: hidden;
            }
        }

        .modal-header-custom {
            background: linear-gradient(135deg, @user-dark 0%, @user-blue 50%, @user-light 100%);
            padding: 20px 24px;
            border-bottom: none;

            .modal-title {
                color: #fff;
                font-size: 18px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;

                .title-icon {
                    font-size: 22px;
                }
            }
        }

        .form-container {
            padding: 24px;

            .ivu-form-item-label {
                color: #64748b;
                font-weight: 500;
            }

            .ivu-input, .ivu-select-selection {
                border-radius: 8px;
                border-color: #e8ecf1;

                &:focus {
                    border-color: @user-blue;
                    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
                }
            }
        }

        .modal-footer-custom {
            padding: 16px 24px;
            border-top: 1px solid #e8ecf1;

            .btn-cancel {
                border-radius: 8px;
            }

            .btn-confirm {
                background: linear-gradient(135deg, @user-blue, @user-light) !important;
                border: none !important;
                border-radius: 8px;
            }
        }
    }

    // 分页
    .pagination-wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .ivu-page {
            .ivu-page-item {
                border-radius: 8px;

                &.ivu-page-item-active {
                    background: linear-gradient(135deg, @user-blue, @user-light);
                    border-color: @user-blue;
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

    // 响应式
    @media (max-width: 768px) {
        padding: 16px;

        .page-header {
            padding: 20px;

            .header-title {
                font-size: 20px;
            }

            .header-desc {
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
        }
    }
    }
</style>
