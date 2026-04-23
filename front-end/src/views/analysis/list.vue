<template>
    <div class="analysis-page">    
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="ios-paper" class="header-icon" />
                分析报告列表
            </div>
            <div class="header-desc">管理和查看水稻生长预测分析报告</div>
        </div>

        <!-- 统计卡片区域 -->
        <div class="stats-container">
            <Row :gutter="16">
                <Col span="8">
                    <div class="stat-card stat-total">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #2d8cf0, #5aa5ff);">
                            <Icon type="ios-paper-outline" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">报告总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-recent">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #19be6b, #52cb80);">
                            <Icon type="ios-time-outline" />
                        </div>
                        <div class="stat-value">{{ recentCount }}</div>
                        <div class="stat-label">本周新增</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-today">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #ff9900, #ffb340);">
                            <Icon type="ios-calendar" />
                        </div>
                        <div class="stat-value">{{ todayCount }}</div>
                        <div class="stat-label">今日新增</div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 主内容卡片 -->
        <div class="content-card">
            <div class="card-header">
                <div class="card-title">
                    <Icon type="ios-list-box" class="title-icon" />
                    报告列表
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索报告名称" clearable class="search-input" @on-enter="handleSearch">
                        <Icon type="ios-search" slot="prefix" />
                    </Input>
                    <Button type="primary" icon="search" class="btn-search" @click="handleSearch">搜索</Button>
                    <Button type="primary" icon="md-add" class="btn-add" @click="add">添加报告</Button>
                </div>
                
                <!-- 表格区域 -->
                <div class="report-table">
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
            class="add-modal"
            v-model="modalAdd" 
            :width="70"
            :mask-closable="false"
            :scrollable="true"
        >
            <div slot="header" class="modal-header-custom">
                <div class="modal-title">
                    {{ formValidate.id ? '编辑报告' : '添加报告' }}
                </div>
            </div>
            <div class="form-container">
                <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="报告名称" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入报告名称" />
                    </FormItem>
                    <FormItem label="报告内容" prop="info">
                        <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="formValidate.info"></vue-editor>      
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="modal-footer-custom">
                <Button type="default" @click="addCanFun" v-show="modalCanBut">取消</Button>
                <Button type="primary" @click="addOkFun" :loading="modalLoading">确定</Button>
            </div>
        </Modal>

        <!-- 详情模态框 -->
        <Modal 
            class="detail-modal"
            v-model="modalDetail" 
            :width="70"
            :mask-closable="false"
            :scrollable="true"
        >
            <div slot="header" class="modal-header-custom">
                <div class="modal-title">
                    <Icon type="ios-document-text" class="title-icon" />
                    {{ details.title }}
                </div>
            </div>
            <div class="content-detail" v-html="details.info"></div>
            <div slot="footer" style="text-align:center;border-top:1px solid #f0f0f0;padding:16px;">
                <Button type="text" @click="modalDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    import util from '@/libs/util.js';
    export default {
        components: {
            VueEditor
        },
        data () {
            return {
                modalDetail:false,
                details: {},
                modalAdd:false,
                modalEdit:false,
                loading:false,
                modalLoading:false,
                modalCanBut:true,
                data: [],
                formValidate: {   
                    title: '',
                    info:''                
                },
                searchForm:{
                    name:'',
                    current:1
                },
                count:0,
                columns: [                  
                    {
                        title: '报告名称',
                        key: 'title',
                        width: 280,
                        render: (h, params) => {
                            return h('div', {
                                class: 'title-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-document-text' },
                                    class: 'title-icon'
                                }),
                                h('span', params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '报告内容',
                        key: 'info',
                        ellipsis: true,
                        tooltip: true,
                        render: (h, params) => {
                            const text = this.stripHtml(params.row.info);
                            return h('div', {
                                class: 'content-preview',
                                attrs: { title: text }
                            }, text);
                        }
                    },
                    {
                        title: '修改时间',
                        key: 'update_date',
                        width: 180,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-clock-outline' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.update_date)
                            ]);
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
                                    props: { type: 'primary', size: 'small' },
                                    class: 'btn-edit',
                                    style: { marginRight: '8px' },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, [
                                    h('Icon', { props: { type: 'ios-create-outline' } }),
                                    h('span', '编辑')
                                ]),
                                h('Button', {
                                    props: { type: 'primary', size: 'small' },
                                    class: 'btn-detail',
                                    style: { marginRight: '8px' },
                                    on: {
                                        click: () => {
                                            this.detail(params);
                                        }
                                    }
                                }, [
                                    h('Icon', { props: { type: 'ios-eye-outline' } }),
                                    h('span', '详情')
                                ]),
                                h('Button', {
                                    props: { size: 'small' },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],               
                ruleValidate: {
                    title: [
                        { required: true, message: '必填项', trigger: 'blur' }
                    ],
                    info: [
                        { required: true, message: '必填项', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            // 本周新增报告数
            recentCount() {
                if (!this.data || this.data.length === 0) return 0;
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return this.data.filter(item => {
                    if (!item.update_date) return false;
                    const itemDate = new Date(item.update_date);
                    return itemDate >= weekAgo;
                }).length;
            },
            // 今日新增报告数
            todayCount() {
                if (!this.data || this.data.length === 0) return 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return this.data.filter(item => {
                    if (!item.update_date) return false;
                    const itemDate = new Date(item.update_date);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate.getTime() === today.getTime();
                }).length;
            }
        },
        methods: {
            // 去除HTML标签
            stripHtml(html) {
                if (!html) return '';
                const div = document.createElement('div');
                div.innerHTML = html;
                return div.textContent || div.innerText || '';
            },
            handleImageAdded: function(file, Editor, cursorLocation) {
                util.imageUpload1(this,file,function(datas){
                    let url = util.ajaxUrl+datas.url;
                    Editor.insertEmbed(cursorLocation, 'image', url);
                });  
            },
           
            init () {
                let _self=this;
                _self.loading=true;
                util.post(this,'admin/sys_analysis/pageData',this.searchForm,function(datas){                  
                    _self.data=datas.data
                    _self.loading=false;  
                    _self.count=datas.count          
                }); 
                 
            },
            handleSearch(){
                this.searchForm.current=1;
                this.init();
            },
            pageChange(current){
                this.searchForm.current=current;
                this.init();
            },
            add (){           
                this.loginNameDisabled=false;       
                this.formValidate.title='';
                this.formValidate.info=''
                delete this.formValidate.id   
                this.modalAdd=true;            
            },
            edit (param) {
                this.formValidate=util.copy(param.row);
                this.modalAdd=true;
                      
            },
            detail(param){
                var _self=this;
                this.modalDetail=true
                util.post(this,'admin/sys_analysis/getData',{id:param.row.id},function(datas){ 
                   _self.details=datas;
                });
            },
            remove (param) {
                let _self=this;
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p style="color:#ed4014;font-weight:600;">删除后数据无法恢复，是否继续？</p>',
                    okText: '确认删除',
                    cancelText: '取消',
                    onOk: () => {
                        this.loading=true;
                        util.post(this,'admin/sys_analysis/delData',{id:param.row.id},function(datas){ 
                            _self.data.splice(param.index, 1);
                            _self.loading =false;               
                            _self.$Message.success('删除成功！');
                            _self.init();
                        });
                    }
                });                          
            },
           
            addOkFun(){
                let _self=this;
                this.$refs['formRef'].validate((valid) => {
                    if (valid) {
                        util.changeModalLoading(this,true);
                        this.addInfo()
                        
                    }else{
                        util.changeModalLoading(this);
                    } 
                })            
            },         
            addCanFun(){      
                this.modalAdd=false; 
                util.changeModalLoading(this);         
                this.$refs['formRef'].resetFields(); 
            },
            addInfo() {
                var _self=this
                let _data=util.copy(this.formValidate);    
                if(this.formValidate&&this.formValidate.id){
                    util.post(this,'admin/sys_analysis/updateData',_data,function(datas){                  
                        _self.$Message.success('编辑成功！');
                        _self.addCanFun();  
                        _self.init();        
                    });                          
                }else{
                    util.post(this,'admin/sys_analysis/addData',_data,function(datas){                  
                        _self.$Message.success('新增成功！');
                        _self.addCanFun(); 
                        _self.init();                
                    });                          
                }
            }
            
        },
        mounted () {
            this.init();   
        }
    }
</script>

<style lang="less">
    // 主题色变量
    @primary-color: #2d8cf0;
    @success-color: #19be6b;
    @warning-color: #ff9900;
    @danger-color: #ed4014;
    @bg-dark: #1a1a2e;
    @bg-card: #16213e;
    @accent-gradient: linear-gradient(135deg, #667eea, #764ba2);
    @glass-bg: rgba(255, 255, 255, 0.95);
    @shadow-light: 0 4px 16px rgba(0, 0, 0, 0.08);
    @shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);

    // 页面容器 - 所有样式嵌套在此
    .analysis-page {
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
            background: radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        // 页面标题区域
        .page-header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1f2937 100%);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
                background: linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.1) 50%, transparent 70%);
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
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
                }
            }

            .header-desc {
                color: rgba(255, 255, 255, 0.6);
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
                --accent-color: @primary-color;
                border-left: 4px solid @primary-color;
                &::after { background: @primary-color; }
            }

            &.stat-recent {
                --accent-color: @success-color;
                border-left: 4px solid @success-color;
                &::after { background: @success-color; }
            }

            &.stat-today {
                --accent-color: @warning-color;
                border-left: 4px solid @warning-color;
                &::after { background: @warning-color; }
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
                background: linear-gradient(135deg, #17224f 0%, #2d3748 100%);
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
                background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%);
                display: flex;
                align-items: center;
                justify-content: space-between;

                .card-title {
                    font-size: 17px;
                    font-weight: 600;
                    color: #1e293b;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                        color: @primary-color;
                        font-size: 20px;
                    }
                }

                .card-actions {
                    display: flex;
                    gap: 12px;
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
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border-radius: 12px;
                border: 1px dashed #e2e8f0;

                .search-input {
                    width: 300px;
                    transition: all 0.3s;

                    &:hover {
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                    }

                    &:focus {
                        box-shadow: 0 0 0 3px rgba(45, 140, 240, 0.15);
                    }
                }

                .btn-search {
                    background: linear-gradient(135deg, @primary-color 0%, #5aa5ff 100%) !important;
                    border: none !important;
                    box-shadow: 0 4px 12px rgba(45, 140, 240, 0.3) !important;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(45, 140, 240, 0.4) !important;
                    }
                }

                .btn-add {
                    background: linear-gradient(135deg, @success-color 0%, #52cb80 100%) !important;
                    border: none !important;
                    box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3) !important;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(25, 190, 107, 0.4) !important;
                    }
                }
            }

            // 表格样式
            .report-table {
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
                        background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
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
                            background: rgba(45, 140, 240, 0.04) !important;
                        }
                    }

                    .ivu-table-row-hover {
                        td {
                            background: rgba(45, 140, 240, 0.04) !important;
                        }
                    }
                }

                .title-cell {
                    font-weight: 600;
                    color: #1e293b;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                        color: @warning-color;
                        font-size: 18px;
                    }
                }

                .content-preview {
                    max-width: 320px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #64748b;
                    font-size: 13px;
                }

                .date-cell {
                    color: #64748b;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    .date-icon {
                        color: #94a3b8;
                    }
                }
            }

            // 操作按钮
            .action-btn {
                display: flex;
                gap: 10px;
                justify-content: center;

                .btn-edit {
                    background: linear-gradient(135deg, @success-color 0%, #52cb80 100%) !important;
                    border: none !important;
                    color: #fff !important;
                    font-weight: 500 !important;
                    box-shadow: 0 4px 12px rgba(25, 190, 107, 0.3) !important;
                    transition: all 0.3s !important;

                    &:hover {
                        transform: translateY(-2px) !important;
                        box-shadow: 0 6px 16px rgba(25, 190, 107, 0.4) !important;
                    }
                }

                .btn-detail {
                    background: linear-gradient(135deg, @primary-color 0%, #5aa5ff 100%) !important;
                    border: none !important;
                    color: #fff !important;
                    font-weight: 500 !important;
                    box-shadow: 0 4px 12px rgba(45, 140, 240, 0.3) !important;
                    transition: all 0.3s !important;

                    &:hover {
                        transform: translateY(-2px) !important;
                        box-shadow: 0 6px 16px rgba(45, 140, 240, 0.4) !important;
                    }
                }

                .btn-delete {
                    &:hover {
                        color: @danger-color !important;
                        background: rgba(237, 65, 20, 0.1) !important;
                    }
                }
            }

            // 详情模态框
            .detail-modal {
                .ivu-modal {
                    .ivu-modal-content {
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    }
                }

                .modal-header-custom {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1f2937 100%);
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
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                    }
                }

                .content-detail {
                    height: 55vh;
                    overflow-y: auto;
                    padding: 28px;
                    background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;

                    h3 {
                        text-align: center;
                        color: #1e293b;
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: 3px solid @primary-color;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            bottom: -3px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 60px;
                            height: 3px;
                            background: linear-gradient(135deg, #667eea, #764ba2);
                        }
                    }

                    h4 {
                        color: #1e293b;
                        font-size: 17px;
                        font-weight: 600;
                        margin: 24px 0 14px;
                        padding-left: 14px;
                        border-left: 4px solid @primary-color;
                    }

                    p {
                        color: #475569;
                        line-height: 1.9;
                        margin-bottom: 14px;
                    }

                    img {
                        max-width: 100%;
                        border-radius: 12px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                        margin: 20px 0;
                        transition: transform 0.3s;

                        &:hover {
                            transform: scale(1.02);
                        }
                    }

                    hr {
                        border: none;
                        border-top: 2px dashed #e2e8f0;
                        margin: 28px 0;
                    }

                    strong {
                        color: #1e293b;
                    }
                }
            }

            // 添加/编辑模态框
            .add-modal {
                .ivu-modal {
                    .ivu-modal-content {
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    }
                }

                .modal-header-custom {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1f2937 100%);
                    padding: 24px 28px;
                    border-bottom: none;

                    .modal-title {
                        color: #fff;
                        font-size: 20px;
                        font-weight: 600;
                        text-align: center;
                    }
                }

                .form-container {
                    padding: 24px;
                }

                .modal-footer-custom {
                    padding: 20px 24px;
                    border-top: 1px solid #f1f5f9;
                    background: #fafbfc;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
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
                            border-color: @primary-color;
                            transform: translateY(-1px);
                        }

                        &.ivu-page-item-active {
                            background: linear-gradient(135deg, @primary-color 0%, #5aa5ff 100%);
                            border-color: @primary-color;
                            box-shadow: 0 4px 12px rgba(45, 140, 240, 0.3);
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
            .analysis-page {
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
