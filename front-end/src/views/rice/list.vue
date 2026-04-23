<template>
    <div class="rice-page">
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
                        <div class="stat-icon">
                            <Icon type="ios-images-outline" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">图片总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-rice">
                        <div class="stat-icon">
                            <Icon type="ios-checkmark-circle" />
                        </div>
                        <div class="stat-value">{{ data.length }}</div>
                        <div class="stat-label">当前显示</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-success">
                        <div class="stat-icon">
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
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const imgSrc = params.row.file_path || '';
                            return h('div', {
                                class: 'image-cell'
                            }, [
                                h('img', {
                                    attrs: {
                                        src: imgSrc,
                                        alt: 'Rice Image'
                                    },
                                    domProps: {
                                        onError: (e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+5aSP5LqrPC90ZXh0Pjwvc3ZnPg==';
                                        }
                                    },
                                    style: {
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        border: '1px solid #e8e8e8'
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
    // 水稻管理页面 - 清新简洁风格
    // ==========================================

    // 主题色变量
    @primary-color: #19be6b;
    @primary-light: #5cd79c;
    @primary-dark: #0fb875;
    @bg-light: #f5f7fa;
    @card-bg: #ffffff;
    @text-primary: #17233d;
    @text-secondary: #515a6e;
    @text-muted: #808695;
    @border-color: #e8e8e8;
    @shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    @shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
    @shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1);

    // 页面容器
    .rice-page {
        padding: 24px;
        min-height: 100vh;
        background: linear-gradient(180deg, @bg-light 0%, #fff 100%);
    }

    // 页面标题区域
    .page-header {
        background: linear-gradient(135deg, #fff 0%, #f0f5f0 100%);
        border-radius: 16px;
        padding: 28px 32px;
        margin-bottom: 24px;
        box-shadow: @shadow-md;
        border: 1px solid @border-color;
        animation: slideDown 0.4s ease-out;

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header-title {
            font-size: 24px;
            font-weight: 600;
            color: @text-primary;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 12px;

            .header-icon {
                font-size: 32px;
                color: @primary-color;
            }

            .title-text {
                background: linear-gradient(135deg, @text-primary 0%, @text-secondary 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }

        .header-desc {
            color: @text-muted;
            font-size: 14px;
            margin-left: 44px;
        }
    }

    // 统计卡片区域
    .stats-container {
        margin-bottom: 24px;

        .ivu-row {
            margin: 0 -8px;

            .ivu-col {
                padding: 0 8px;
            }
        }
    }

    .stat-card {
        background: @card-bg;
        border-radius: 16px;
        padding: 24px;
        box-shadow: @shadow-sm;
        border: 1px solid @border-color;
        transition: all 0.3s ease;
        animation: fadeInUp 0.4s ease-out backwards;

        &:nth-child(1) { animation-delay: 0.1s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.3s; }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        &:hover {
            transform: translateY(-4px);
            box-shadow: @shadow-lg;
        }

        &.stat-total {
            border-left: 4px solid #2d8cf0;
            
            .stat-icon {
                background: linear-gradient(135deg, #2d8cf0, #5aa5ff);
            }
        }

        &.stat-rice {
            border-left: 4px solid @primary-color;
            
            .stat-icon {
                background: linear-gradient(135deg, @primary-color, @primary-light);
            }
        }

        &.stat-success {
            border-left: 4px solid #19be6b;
            
            .stat-icon {
                background: linear-gradient(135deg, #19be6b, #52cb80);
            }
        }

        .stat-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(25, 190, 107, 0.25);

            .ivu-icon {
                font-size: 28px;
                color: #fff;
            }
        }

        .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: @text-primary;
            line-height: 1;
            margin-bottom: 8px;
        }

        .stat-label {
            font-size: 14px;
            color: @text-muted;
            display: flex;
            align-items: center;
            gap: 6px;

            &::before {
                content: '';
                width: 6px;
                height: 6px;
                background: @primary-color;
                border-radius: 50%;
            }
        }
    }

    // 主内容卡片
    .content-card {
        background: @card-bg;
        border-radius: 16px;
        box-shadow: @shadow-md;
        border: 1px solid @border-color;
        overflow: hidden;
        animation: fadeInUp 0.4s ease-out 0.3s backwards;

        .card-header {
            padding: 20px 24px;
            border-bottom: 1px solid @border-color;
            background: linear-gradient(135deg, #fafafa 0%, #fff 100%);

            .card-title {
                font-size: 16px;
                font-weight: 600;
                color: @text-primary;
                display: flex;
                align-items: center;
                gap: 10px;

                .title-icon {
                    color: @primary-color;
                    font-size: 20px;
                }

                .title-badge {
                    background: linear-gradient(135deg, @primary-color, @primary-light);
                    color: #fff;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }
            }
        }

        .card-body {
            padding: 24px;
        }
    }

    // 搜索区域
    .search-area {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .search-input {
            width: 280px;

            .ivu-input-wrapper {
                .ivu-input {
                    height: 38px;
                    border-radius: 8px;
                    border-color: @border-color;

                    &:focus {
                        border-color: @primary-color;
                        box-shadow: 0 0 0 2px rgba(25, 190, 107, 0.1);
                    }
                }
            }
        }

        .btn-search {
            height: 38px;
            padding: 0 20px;
            background: linear-gradient(135deg, @primary-color, @primary-light) !important;
            border: none !important;
            border-radius: 8px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3) !important;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(25, 190, 107, 0.4) !important;
            }
        }

        .btn-reset {
            height: 38px;
            padding: 0 18px;
            border-radius: 8px;
            border: 1px solid @border-color !important;

            &:hover {
                border-color: @primary-color !important;
                color: @primary-color !important;
            }
        }
    }

    // 表格样式
    .data-table {
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid @border-color;

        .ivu-table-wrapper {
            border: none;

            .ivu-table {
                font-size: 14px;

                th {
                    background: linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%) !important;
                    color: @text-primary;
                    font-weight: 600;
                    font-size: 14px;
                    padding: 16px !important;
                    border-bottom: 1px solid @border-color !important;

                    .ivu-table-cell {
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                td {
                    padding: 16px !important;
                    color: @text-secondary;
                    border-bottom: 1px solid @border-color !important;
                }

                tr:hover td {
                    background: #f8fff9 !important;
                }
            }
        }

        .image-cell {
            display: flex;
            justify-content: center;
            
            img {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                border: 1px solid @border-color;
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
            }
        }

        .date-cell {
            color: @text-muted;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 6px;

            .date-icon {
                color: @text-muted;
            }
        }
    }

    // 操作按钮
    .action-btn {
        display: flex;
        gap: 8px;
        justify-content: center;
    }

    // 分页样式
    .pagination-wrapper {
        margin-top: 20px;
        padding: 16px 0;
        display: flex;
        justify-content: center;

        .ivu-page {
            .ivu-page-item {
                border-radius: 8px;
                border-color: @border-color;
                transition: all 0.3s ease;

                &:hover {
                    border-color: @primary-color;
                    color: @primary-color;
                }

                &.ivu-page-item-active {
                    background: linear-gradient(135deg, @primary-color, @primary-light);
                    border-color: transparent;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3);
                }
            }

            .ivu-page-prev, .ivu-page-next {
                border-radius: 8px;
                border-color: @border-color;

                &:hover {
                    border-color: @primary-color;
                    color: @primary-color;
                }
            }
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
            background: linear-gradient(135deg, #fafafa 0%, #fff 100%);
            padding: 20px 24px;
            border-bottom: 1px solid @border-color;

            .modal-title {
                color: @text-primary;
                font-size: 18px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;

                .title-icon {
                    font-size: 22px;
                    color: @primary-color;
                }
            }
        }

        .form-container {
            padding: 24px;

            .ivu-form-item-label {
                color: @text-secondary;
                font-weight: 500;
            }

            .ivu-input, .ivu-select-selection {
                border-radius: 8px;
                border-color: @border-color;

                &:focus {
                    border-color: @primary-color;
                    box-shadow: 0 0 0 2px rgba(25, 190, 107, 0.1);
                }
            }
        }

        .modal-footer-custom {
            padding: 16px 24px;
            border-top: 1px solid @border-color;
            display: flex;
            justify-content: flex-end;
            gap: 12px;

            .btn-cancel {
                border-radius: 8px;
                border-color: @border-color;

                &:hover {
                    border-color: @primary-color;
                    color: @primary-color;
                }
            }

            .btn-confirm {
                border-radius: 8px;
                background: linear-gradient(135deg, @primary-color, @primary-light) !important;
                border: none !important;
                box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3) !important;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(25, 190, 107, 0.4) !important;
                }
            }
        }
    }

    // 响应式
    @media (max-width: 768px) {
        .rice-page {
            padding: 16px;
        }

        .page-header {
            padding: 20px;

            .header-title {
                font-size: 20px;
            }
        }

        .search-area {
            flex-direction: column;
            align-items: stretch;

            .search-input {
                width: 100%;
            }
        }
    }
</style>
