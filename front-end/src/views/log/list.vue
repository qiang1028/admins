<style lang="less">
    // 日志管理主题色变量
    @primary-color: #2d8cf0;
    @success-color: #19be6b;
    @warning-color: #ff9900;
    @danger-color: #ed4014;
    @log-purple: #722ed1;
    @log-dark: #531dab;
    @log-light: #b37feb;
    @bg-dark: #1a1a2e;
    @bg-card: #16213e;
    @accent-gradient: linear-gradient(135deg, #722ed1, #b37feb);
    @glass-bg: rgba(255, 255, 255, 0.95);
    @shadow-light: 0 4px 16px rgba(0, 0, 0, 0.08);
    @shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);

    // 页面容器 - 所有样式嵌套在此
    .log-page {
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
            background: radial-gradient(circle at 30% 20%, rgba(114, 46, 209, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(179, 127, 235, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        // 页面标题区域
        .page-header {
            background: linear-gradient(135deg, #531dab 0%, #722ed1 50%, #b37feb 100%);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 8px 32px rgba(83, 29, 171, 0.3);
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
                    background: linear-gradient(135deg, #d3adf7 0%, #efdbff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 4px rgba(211, 173, 247, 0.3));
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
                --accent-color: @log-purple;
                border-left: 4px solid @log-purple;
                &::after { background: @log-purple; }
            }

            &.stat-info {
                --accent-color: @primary-color;
                border-left: 4px solid @primary-color;
                &::after { background: @primary-color; }
            }

            &.stat-warning {
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
                background: linear-gradient(135deg, #531dab 0%, #722ed1 100%);
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
                background: linear-gradient(135deg, rgba(247, 240, 255, 0.9) 0%, rgba(240, 230, 255, 0.9) 100%);
                display: flex;
                align-items: center;
                justify-content: space-between;

                .card-title {
                    font-size: 17px;
                    font-weight: 600;
                    color: #531dab;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                        color: @log-purple;
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
                background: linear-gradient(135deg, #f9f0ff 0%, #f0e6ff 100%);
                border-radius: 12px;
                border: 1px dashed #d3adf7;

                .search-input {
                    width: 300px;
                    transition: all 0.3s;

                    &:hover {
                        box-shadow: 0 2px 8px rgba(114, 46, 209, 0.1);
                    }

                    &:focus {
                        box-shadow: 0 0 0 3px rgba(114, 46, 209, 0.15);
                    }
                }

                .btn-search {
                    background: linear-gradient(135deg, @log-purple 0%, @log-light 100%) !important;
                    border: none !important;
                    color: #fff !important;
                    box-shadow: 0 4px 12px rgba(114, 46, 209, 0.3) !important;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(114, 46, 209, 0.4) !important;
                    }
                }

                .btn-reset {
                    background: #fff !important;
                    border: 1px solid #d3adf7 !important;
                    color: @log-purple !important;
                    transition: all 0.3s;

                    &:hover {
                        border-color: @log-purple !important;
                        background: rgba(114, 46, 209, 0.05) !important;
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
                            background: linear-gradient(135deg, #531dab 0%, #722ed1 100%) !important;
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
                                background: rgba(114, 46, 209, 0.04) !important;
                            }
                        }

                        .ivu-table-row-hover {
                            td {
                                background: rgba(114, 46, 209, 0.04) !important;
                            }
                        }
                    }

                    .cell-name {
                        font-weight: 600;
                        color: #531dab;
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        .name-icon {
                            color: @log-light;
                        }
                    }

                    .cell-type {
                        .type-tag {
                            padding: 4px 10px;
                            border-radius: 4px;
                            font-size: 12px;
                            font-weight: 500;

                            &.type-info {
                                background: rgba(45, 140, 240, 0.1);
                                color: @primary-color;
                            }

                            &.type-warning {
                                background: rgba(255, 153, 0, 0.1);
                                color: @warning-color;
                            }

                            &.type-error {
                                background: rgba(237, 64, 20, 0.1);
                                color: @danger-color;
                            }
                        }
                    }

                        .content-preview {
                            max-width: 300px;
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
                                color: #d3adf7;
                            }
                        }
                    }
                }
            }

            // 操作按钮
            .action-btn {
                display: flex;
                gap: 10px;
                justify-content: center;

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
            background: linear-gradient(135deg, #531dab 0%, #722ed1 50%, #b37feb 100%);
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
                    background: linear-gradient(135deg, #d3adf7, #efdbff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }

        .content-detail {
            height: 55vh;
            overflow-y: auto;
            padding: 28px;
            background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
            border-radius: 16px;
            border: 1px solid #d3adf7;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 13px;
            line-height: 1.8;
            white-space: pre-wrap;
            word-break: break-all;
            color: #531dab;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-track {
                background: rgba(114, 46, 209, 0.1);
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(114, 46, 209, 0.3);
                border-radius: 4px;

                &:hover {
                    background: rgba(114, 46, 209, 0.5);
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

            .btn-close {
                background: linear-gradient(135deg, @log-purple 0%, @log-light 100%) !important;
                border: none !important;
                color: #fff !important;
                box-shadow: 0 4px 12px rgba(114, 46, 209, 0.3) !important;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(114, 46, 209, 0.4) !important;
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
                    border-color: @log-purple;
                    transform: translateY(-1px);
                }

                &.ivu-page-item-active {
                    background: linear-gradient(135deg, @log-purple 0%, @log-light 100%);
                    border-color: @log-purple;
                    box-shadow: 0 4px 12px rgba(114, 46, 209, 0.3);
                }
            }

            .ivu-page-prev, .ivu-page-next {
                border-radius: 8px;
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
        padding: 16px;

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
</style>

<template>
    <div class="log-page">    
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="ios-list-box-outline" class="header-icon" />
                日志管理
            </div>
            <div class="header-desc">查看和管理系统操作日志记录</div>
        </div>

        <!-- 统计卡片区域 -->
        <div class="stats-container">
            <Row :gutter="16">
                <Col span="8">
                    <div class="stat-card stat-total">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #722ed1, #b37feb);">
                            <Icon type="ios-list-box-outline" />
                        </div>
                        <div class="stat-value">{{ count }}</div>
                        <div class="stat-label">日志总数</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-info">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #2d8cf0, #5aa5ff);">
                            <Icon type="ios-information-circle-outline" />
                        </div>
                        <div class="stat-value">{{ infoCount }}</div>
                        <div class="stat-label">信息日志</div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="stat-card stat-warning">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #ff9900, #ffb340);">
                            <Icon type="ios-warning" />
                        </div>
                        <div class="stat-value">{{ warnCount }}</div>
                        <div class="stat-label">警告日志</div>
                    </div>
                </Col>
            </Row>
        </div>

        <!-- 主内容卡片 -->
        <div class="content-card">
            <div class="card-header">
                <div class="card-title">
                    <Icon type="ios-list-outline" class="title-icon" />
                    日志列表
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索日志内容" clearable class="search-input" @on-enter="handleSearch">
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

        <!-- 详情模态框 -->
        <Modal 
            class="custom-modal"
            v-model="modalDetail" 
            :width="70"
            :mask-closable="false"
        >
            <div slot="header" class="modal-header-custom">
                <div class="modal-title">
                    <Icon type="ios-list-box-outline" class="title-icon" />
                    {{ details.source }}
                </div>
            </div>
            <div class="content-detail" v-html="details.content"></div>
            <div slot="footer" class="modal-footer-custom">
                <Button type="primary" @click="modalDetail = false" class="btn-close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    export default {
        data () {
            return {
                modalDetail: false,
                details: {},
                modalAdd: false,
                modalEdit: false,
                loading: false,
                modalLoading: false,
                modalCanBut: true,
                data: [],
                formValidate: {   
                    title: '',
                    info: ''                
                },
                searchForm: {
                    name: '',
                    current: 1
                },
                count: 0,
                columns: [
                    {
                        title: '名称',
                        key: 'source',
                        width: 180,
                        render: (h, params) => {
                            return h('div', {
                                class: 'cell-name'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-document-text-outline' },
                                    class: 'name-icon'
                                }),
                                h('span', params.row.source)
                            ]);
                        }
                    },
                    {
                        title: '类型',
                        key: 'log_type',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const type = params.row.log_type;
                            let typeClass = 'type-info';
                            if (type === 'warning' || type === '警告') {
                                typeClass = 'type-warning';
                            } else if (type === 'error' || type === '错误') {
                                typeClass = 'type-error';
                            }
                            return h('div', {
                                class: 'cell-type'
                            }, [
                                h('span', {
                                    class: 'type-tag ' + typeClass
                                }, type)
                            ]);
                        }
                    },
                    {
                        title: '内容',
                        key: 'content',
                        ellipsis: true,
                        tooltip: true,
                        render: (h, params) => {
                            const text = this.stripHtml(params.row.content);
                            return h('div', {
                                class: 'content-preview',
                                attrs: { title: text }
                            }, text);
                        }
                    },
                    {
                        title: '时间',
                        key: 'create_time',
                        width: 180,
                        render: (h, params) => {
                            return h('div', {
                                class: 'date-cell'
                            }, [
                                h('Icon', {
                                    props: { type: 'ios-time-outline' },
                                    class: 'date-icon'
                                }),
                                h('span', params.row.create_time)
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
                                    class: 'btn-detail',
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.detail(params);
                                        }
                                    }
                                }, [
                                    h('Icon', { props: { type: 'ios-eye-outline' } }),
                                    h('span', '查看')
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
            infoCount() {
                return this.data.filter(item => 
                    item.log_type === 'info' || 
                    item.log_type === '信息' || 
                    item.log_type === 'INFO'
                ).length;
            },
            warnCount() {
                return this.data.filter(item => 
                    item.log_type === 'warning' || 
                    item.log_type === '警告' ||
                    item.log_type === 'WARNING'
                ).length;
            }
        },
        methods: {
            stripHtml(html) {
                if (!html) return '';
                const div = document.createElement('div');
                div.innerHTML = html;
                return div.textContent || div.innerText || '';
            },
            handleReset() {
                this.searchForm.name = '';
                this.searchForm.current = 1;
                this.init();
            },
            init () {
                let _self = this;
                _self.loading = true;
                util.post(this, 'admin/sys_log/pageData', this.searchForm, function(datas) {                  
                    _self.data = datas.data;
                    _self.loading = false;  
                    _self.count = datas.count;          
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
            detail(param) {
                var _self = this;
                this.modalDetail = true;
                util.post(this, 'admin/sys_log/getData', {id: param.row.id}, function(datas) { 
                   _self.details = datas;
                });
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
                        util.post(this, 'admin/sys_log/delData', {id: param.row.id}, function(datas) { 
                            _self.data.splice(param.index, 1);
                            _self.loading = false;               
                            _self.$Message.success('删除成功！');
                            _self.init();
                        });
                    }
                });                          
            }
        },
        mounted () {
            this.init();   
        }
    }
</script>
