<template>
    <div class="role-page">    
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="md-shield" class="header-icon" />
                角色管理
            </div>
            <div class="header-desc">管理系统角色和权限配置</div>
        </div>

        <!-- 统计卡片区域 -->
        <div class="stats-container">
            <Row :gutter="16">
                <Col span="8">
                    <div class="stat-card stat-total">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #fa8c16, #ffc53d);">
                            <Icon type="ios-people" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">角色总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-admin">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #ed4014, #f73f52);">
                            <Icon type="ios-star-outline" />
                        </div>
                        <div class="stat-value">{{ adminCount }}</div>
                        <div class="stat-label">管理员</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-user">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #19be6b, #52cb80);">
                            <Icon type="ios-person-outline" />
                        </div>
                        <div class="stat-value">{{ userCount }}</div>
                        <div class="stat-label">普通用户</div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 主内容卡片 -->
        <div class="content-card">
            <div class="card-header">
                <div class="card-title">
                    <Icon type="ios-key" class="title-icon" />
                    角色列表
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索角色名称" clearable class="search-input" @on-enter="handleSearch">
                        <Icon type="ios-search" slot="prefix" />
                    </Input>
                    <Button type="primary" icon="search" class="btn-search" @click="handleSearch">搜索</Button>
                    <Button icon="ios-refresh" class="btn-reset" @click="handleReset">重置</Button>
                    <Button type="primary" icon="md-add" class="btn-add" @click="add">添加角色</Button>
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
                    <Icon type="md-create" class="title-icon" />
                    {{ formValidate && formValidate.id ? '编辑角色' : '添加角色' }}
                </div>
            </div>
            <div class="form-container">
                <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="角色名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
                    </FormItem>
                    <FormItem label="权限配置">
                        <Tree :data="menuList" ref="Tree" v-if="modalAdd" show-checkbox></Tree>
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
    import VueTree from 'vue-simple-tree/src/components/VueTree.vue';
    import util from '@/libs/util.js';
    export default {
        components: { VueTree },
        data () {
            return {
                modalAdd: false,
                modalEdit: false,
                loading: false,
                modalLoading: false,
                modalCanBut: true,
                searchForm: {
                    type: '',
                    current: 1
                },
                treeCheckedIds: [],
                menuList: [],               
                treeOptions: {
                    label: 'title'
                },
                count: 0,
                columns: [
                    {
                        title: '角色名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', {
                                class: 'cell-name'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-shirt-outline' },
                                    class: 'name-icon'
                                }),
                                h('span', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'create_date',
                        width: 180,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-time-outline' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.create_date || '-')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
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
                data: [],
                formValidate: {
                    sort: 1
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            adminCount() {
                return this.data.filter(item => 
                    item.name && item.name.includes('管理员')
                ).length;
            },
            userCount() {
                return this.data.filter(item => 
                    item.name && (item.name.includes('用户') || item.name.includes('普通'))
                ).length;
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
                util.post(this, 'admin/sys_role/pageData', this.searchForm, function(datas) {                  
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
            clearChecked() {
                this.menuList.forEach(element => {
                    delete element.checked;
                    if (element.children && element.children.length > 0) {
                        delete element.expand;
                        element.children.forEach(item => {
                             delete item.checked;
                        });
                    }
                });
            },
            add () {                    
                this.clearChecked();
                this.formValidate = {};
                this.modalAdd = true;            
            },
            edit (param) { 
                this.clearChecked();    
                let ids = param.row.role_menus == null ? '' : param.row.role_menus;
                this.menuList.forEach(element => {
                    delete element.checked;
                    if (element.children && element.children.length > 0) {
                        var expanded = false;
                        element.children.forEach(item => {
                            if (ids.includes(String(item.id))) {
                                item.checked = true;
                                expanded = true;
                            }
                        });
                        if (expanded) {
                            element.expand = true;
                        }
                    } else {
                        if (ids.includes(String(element.id))) {
                            element.checked = true;
                        }
                    }
                });
                this.formValidate = util.copy(param.row);
                var that = this;
                setTimeout(() => {
                    that.modalAdd = true;
                }, 50);                       
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
                        util.post(this, 'admin/sys_role/delData', {id: param.row.id}, function(datas) { 
                            _self.data.splice(param.index, 1);
                            _self.loading = false;               
                            _self.$Message.success('删除成功！');
                            _self.init();
                        });
                    }
                });                          
            },
            addOkFun() {
                let _self = this;
                this.$refs['formRef'].validate((valid) => {
                    if (valid) {
                        util.changeModalLoading(this, true);
                        let _data = util.copy(this.formValidate);  
                        if (this.$refs.Tree) {
                            _data.role_menus = this.$refs.Tree.getCheckedNodes().map(item => item.id).join(",");
                            _data.menuids = util.copy(this.$refs.Tree.getCheckedNodes().map(item => item.id));
                        }
                        if (this.formValidate && this.formValidate.id) {
                            util.post(this, 'admin/sys_role/updateData', _data, function(datas) {                  
                                _self.$Message.success('编辑成功！');
                                _self.addCanFun();  
                                _self.init();        
                            });                          
                        } else {
                            util.post(this, 'admin/sys_role/addData', _data, function(datas) {                  
                                _self.$Message.success('新增成功！');
                                _self.addCanFun(); 
                                _self.init();                
                            });                          
                        }
                        
                    } else {
                        util.changeModalLoading(this);
                    } 
                });        
            },         
            addCanFun() {      
                this.modalAdd = false; 
                util.changeModalLoading(this);         
                this.$refs['formRef'].resetFields(); 
                this.formValidate = {};
            }
        },
        mounted () {
            let _self = this;
            util.post(this, 'admin/sys_menu/getMenuTree', {}, function(datas) { 
                _self.menuList = datas;                          
            });
            this.init();
        }
    }
</script>

<style lang="less">
    // 角色管理主题色变量
    @primary-color: #2d8cf0;
    @success-color: #19be6b;
    @warning-color: #ff9900;
    @danger-color: #ed4014;
    @role-orange: #fa8c16;
    @role-dark: #d46b08;
    @role-light: #ffc53d;
    @bg-dark: #1a1a2e;
    @bg-card: #16213e;
    @accent-gradient: linear-gradient(135deg, #fa8c16, #ffc53d);
    @glass-bg: rgba(255, 255, 255, 0.95);
    @shadow-light: 0 4px 16px rgba(0, 0, 0, 0.08);
    @shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);

    // 页面容器 - 所有样式嵌套在此
    .role-page {
        padding: 24px;
        background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 50%, #f5f7fa 100%);
        min-height: 100vh;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 20%, rgba(250, 140, 22, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(255, 197, 61, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        // 页面标题区域
        .page-header {
            background: linear-gradient(135deg, #d46b08 0%, #fa8c16 50%, #ffc53d 100%);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 8px 32px rgba(212, 107, 8, 0.3);
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
                background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
                pointer-events: none;
            }

            &::after {
                content: '';
                position: absolute;
                top: -50%;
                right: -50%;
                width: 100%;
                height: 200%;
                background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
                animation: shimmer 3s ease-in-out infinite;
            }

            .header-title {
                font-size: 26px;
                font-weight: 700;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 14px;
                position: relative;
                z-index: 1;

                .header-icon {
                    font-size: 32px;
                    background: linear-gradient(135deg, #ffe7b3 0%, #fff1cc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 4px rgba(255, 231, 179, 0.3));
                }
            }

            .header-desc {
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
                position: relative;
                z-index: 1;
            }
        }

        // 统计卡片区域
        .stats-container {
            margin-bottom: 24px;
            animation: fadeInUp 0.6s ease-out 0.2s both;
            
            .ivu-row {
                margin: 0 -10px;
                
                .ivu-col {
                    padding: 0 10px;
                }
            }
        }

        .stat-card {
            background: @glass-bg;
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            box-shadow: @shadow-light;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
                opacity: 0;
                transition: opacity 0.3s;
            }

            &:hover {
                transform: translateY(-6px);
                box-shadow: @shadow-hover;
                
                &::before {
                    opacity: 1;
                }

                .stat-icon {
                    transform: scale(1.1) rotate(5deg);
                }
            }

            &::after {
                content: '';
                position: absolute;
                top: -30px;
                right: -30px;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                opacity: 0.06;
                transition: all 0.4s;
            }

            &:hover::after {
                transform: scale(1.5);
            }

            &.stat-total {
                --accent-color: @role-orange;
                border-left: 4px solid @role-orange;
                &::after { background: @role-orange; }
            }

            &.stat-admin {
                --accent-color: @danger-color;
                border-left: 4px solid @danger-color;
                &::after { background: @danger-color; }
            }

            &.stat-user {
                --accent-color: @success-color;
                border-left: 4px solid @success-color;
                &::after { background: @success-color; }
            }

            .stat-icon {
                width: 52px;
                height: 52px;
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
                transition: transform 0.3s;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                
                .ivu-icon {
                    font-size: 28px;
                    color: #fff;
                }
            }

            .stat-value {
                font-size: 32px;
                font-weight: 800;
                background: linear-gradient(135deg, #d46b08 0%, #fa8c16 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                line-height: 1;
                margin-bottom: 6px;
            }

            .stat-label {
                font-size: 14px;
                color: #64748b;
                font-weight: 500;
            }
        }

        // 主内容卡片
        .content-card {
            background: @glass-bg;
            backdrop-filter: blur(10px);
            border-radius: 16px;
            box-shadow: @shadow-light;
            border: 1px solid rgba(255, 255, 255, 0.8);
            overflow: hidden;
            animation: fadeInUp 0.6s ease-out 0.4s both;

            .card-header {
                padding: 20px 28px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                background: linear-gradient(135deg, rgba(255, 250, 240, 0.9) 0%, rgba(255, 245, 230, 0.9) 100%);
                display: flex;
                align-items: center;
                justify-content: space-between;

                .card-title {
                    font-size: 17px;
                    font-weight: 600;
                    color: #d46b08;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                        color: @role-orange;
                        font-size: 20px;
                    }
                }
            }

            .card-body {
                padding: 28px;
            }

            // 搜索区域
            .search-area {
                display: flex;
                align-items: center;
                gap: 14px;
                flex-wrap: wrap;
                margin-bottom: 24px;
                padding: 20px;
                background: linear-gradient(135deg, #fffbe6 0%, #fff7e6 100%);
                border-radius: 12px;
                border: 1px dashed #ffe7b3;

                .search-input {
                    width: 300px;
                    transition: all 0.3s;

                    &:hover {
                        box-shadow: 0 2px 8px rgba(250, 140, 22, 0.1);
                    }

                    &:focus {
                        box-shadow: 0 0 0 3px rgba(250, 140, 22, 0.15);
                    }
                }

                .btn-search {
                    background: linear-gradient(135deg, @role-orange 0%, @role-light 100%) !important;
                    border: none !important;
                    color: #fff !important;
                    box-shadow: 0 4px 12px rgba(250, 140, 22, 0.3) !important;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(250, 140, 22, 0.4) !important;
                    }
                }

                .btn-reset {
                    background: #fff !important;
                    border: 1px solid #ffe7b3 !important;
                    color: @role-orange !important;
                    transition: all 0.3s;

                    &:hover {
                        border-color: @role-orange !important;
                        background: rgba(250, 140, 22, 0.05) !important;
                    }
                }

                .btn-add {
                    background: linear-gradient(135deg, @success-color 0%, #52cb80 100%) !important;
                    border: none !important;
                    color: #fff !important;
                    box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3) !important;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(25, 190, 107, 0.4) !important;
                    }
                }
            }

            // 表格样式
            .data-table {
                border-radius: 12px;
                overflow: hidden;
                box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);

                .ivu-table-wrapper {
                    border-radius: 12px;
                    overflow: hidden;
                }

                .ivu-table {
                    font-size: 14px;

                    &::before {
                        display: none;
                    }

                    th {
                        background: linear-gradient(135deg, #d46b08 0%, #fa8c16 100%) !important;
                        color: #fff;
                        font-weight: 600;
                        font-size: 13px;
                        padding: 16px 14px !important;
                        border-bottom: none !important;

                        .ivu-table-cell {
                            padding: 0;
                        }
                    }

                    td {
                        padding: 16px 14px !important;
                        color: #475569;
                        border-bottom: 1px solid #f1f5f9 !important;
                        transition: background 0.2s;
                    }

                    tr {
                        transition: all 0.2s;

                        &:hover td {
                            background: rgba(250, 140, 22, 0.04) !important;
                        }
                    }

                    .ivu-table-row-hover {
                        td {
                            background: rgba(250, 140, 22, 0.04) !important;
                        }
                    }
                }

                .cell-name {
                    font-weight: 600;
                    color: #d46b08;
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    .name-icon {
                        color: @role-light;
                    }
                }

                .date-cell {
                    color: #64748b;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    .date-icon {
                        color: #ffe7b3;
                    }
                }

                // 操作按钮
                .action-btn {
                    display: flex;
                    gap: 10px;
                    justify-content: center;

                    .btn-edit {
                        background: linear-gradient(135deg, @role-orange 0%, @role-light 100%) !important;
                        border: none !important;
                        color: #fff !important;
                        font-weight: 500 !important;
                        box-shadow: 0 4px 12px rgba(250, 140, 22, 0.3) !important;
                        transition: all 0.3s !important;

                        &:hover {
                            transform: translateY(-2px) !important;
                            box-shadow: 0 6px 16px rgba(250, 140, 22, 0.4) !important;
                        }
                    }

                    .btn-delete {
                        &:hover {
                            color: @danger-color !important;
                            background: rgba(237, 65, 20, 0.1) !important;
                        }
                    }
                }
            }

            // 模态框样式
            .custom-modal {
                .ivu-modal {
                    .ivu-modal-content {
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    }
                }

                .modal-header-custom {
                    background: linear-gradient(135deg, #d46b08 0%, #fa8c16 50%, #ffc53d 100%);
                    padding: 24px 28px;
                    border-bottom: none;

                    .modal-title {
                        color: #fff;
                        font-size: 20px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        .title-icon {
                            font-size: 24px;
                            background: linear-gradient(135deg, #ffe7b3, #fff1cc);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                    }
                }

                .form-container {
                    padding: 24px;

                    .ivu-form-item-label {
                        color: #d46b08;
                        font-weight: 500;
                    }

                    .ivu-input {
                        border-radius: 8px;
                        border-color: #ffe7b3;

                        &:focus {
                            border-color: @role-orange;
                            box-shadow: 0 0 0 2px rgba(250, 140, 22, 0.2);
                        }
                    }

                    .ivu-tree {
                        .ivu-tree-title {
                            &:hover {
                                background: rgba(250, 140, 22, 0.1);
                            }
                        }

                        .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
                            background: rgba(250, 140, 22, 0.2);
                        }
                    }
                }

                .modal-footer-custom {
                    padding: 20px 24px;
                    border-top: 1px solid #f1f5f9;
                    background: #fafbfc;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;

                    .btn-cancel {
                        background: #fff !important;
                        border: 1px solid #e8ecf0 !important;
                        color: #64748b !important;

                        &:hover {
                            border-color: @role-orange !important;
                            color: @role-orange !important;
                        }
                    }

                    .btn-confirm {
                        background: linear-gradient(135deg, @role-orange 0%, @role-light 100%) !important;
                        border: none !important;
                        color: #fff !important;
                        box-shadow: 0 4px 12px rgba(250, 140, 22, 0.3) !important;

                        &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 16px rgba(250, 140, 22, 0.4) !important;
                        }
                    }
                }
            }

            // 分页样式
            .pagination-wrapper {
                margin-top: 24px;
                padding: 20px 0;
                display: flex;
                justify-content: center;

                .ivu-page {
                    .ivu-page-item {
                        border-radius: 8px;
                        transition: all 0.3s;
                        font-weight: 500;

                        &:hover {
                            border-color: @role-orange;
                            transform: translateY(-1px);
                        }

                        &.ivu-page-item-active {
                            background: linear-gradient(135deg, @role-orange 0%, @role-light 100%);
                            border-color: @role-orange;
                            box-shadow: 0 4px 12px rgba(250, 140, 22, 0.3);
                        }
                    }

                    .ivu-page-prev, .ivu-page-next {
                        border-radius: 8px;
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

        @keyframes shimmer {
            0%, 100% {
                transform: translateX(-100%) rotate(45deg);
            }
            50% {
                transform: translateX(100%) rotate(45deg);
            }
        }

        // 响应式
        @media (max-width: 768px) {
            .role-page {
                padding: 16px;
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
