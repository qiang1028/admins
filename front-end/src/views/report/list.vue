<style lang="less">
    // ==========================================
    // 报告中心页面 - 柔和蓝色主题
    // ==========================================
    
    // 主题色变量 - 柔和的蓝色
    @primary-color: #5a9fd4;
    @success-color: #6b9e7a;
    @warning-color: #d4a574;
    @danger-color: #c97878;
    @report-blue: #6b8eb5;
    @report-dark: #5a7a9a;
    @report-light: #a8c4d8;
    @bg-dark: #f5f7fa;
    @bg-card: rgba(255, 255, 255, 0.95);
    @glass-bg: rgba(255, 255, 255, 0.95);
    @shadow-light: 0 2px 8px rgba(0, 0, 0, 0.06);
    @shadow-hover: 0 6px 20px rgba(107, 142, 181, 0.15);

    // 页面容器
    .report-page {
        padding: 24px;
        min-height: 100vh;
        position: relative;
        background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 50%, #f0f2f5 100%);
        overflow: hidden;

        // 页面标题区域
        .page-header {
            background: linear-gradient(135deg, #6b8eb5, #7a9ec5, #8aaeD5);
            border-radius: 12px;
            padding: 24px 28px;
            margin-bottom: 24px;
            color: #fff;
            box-shadow: 0 4px 16px rgba(107, 142, 181, 0.2);
            position: relative;
            overflow: hidden;
            z-index: 10;
            animation: headerSlide 0.6s ease-out;
            border: 1px solid rgba(107, 142, 181, 0.2);

            @keyframes headerSlide {
                0% {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .header-title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                z-index: 1;

                .header-icon {
                    font-size: 28px;
                    color: rgba(255, 255, 255, 0.9);
                }

                .title-text {
                    position: relative;
                }
            }

            .header-desc {
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
                position: relative;
                z-index: 1;
                margin-left: 40px;
            }
        }

        // 统计卡片区域
        .stats-container {
            margin-bottom: 24px;
            position: relative;
            z-index: 10;

            .ivu-row {
                margin: 0 -12px;

                .ivu-col {
                    padding: 0 12px;
                }
            }
        }

        .stat-card {
            background: @glass-bg;
            border-radius: 12px;
            padding: 20px;
            box-shadow: @shadow-light;
            transition: all 0.3s ease;
            border: 1px solid rgba(107, 142, 181, 0.1);
            position: relative;
            overflow: hidden;

            &:hover {
                box-shadow: @shadow-hover;
                transform: translateY(-2px);
            }

            &.stat-total {
                border-left: 3px solid @primary-color;
            }

            &.stat-recent {
                border-left: 3px solid @success-color;
            }

            &.stat-today {
                border-left: 3px solid @warning-color;
            }

            .stat-icon {
                width: 48px;
                height: 48px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 12px;

                .ivu-icon {
                    font-size: 24px;
                    color: #fff;
                }
            }

            .stat-value {
                font-size: 28px;
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 13px;
                color: #64748b;
            }
        }

        // 主内容卡片
        .content-card {
            background: @glass-bg;
            border-radius: 12px;
            box-shadow: @shadow-light;
            border: 1px solid rgba(107, 142, 181, 0.08);
            overflow: hidden;
            position: relative;
            z-index: 10;

            .card-header {
                padding: 16px 20px;
                border-bottom: 1px solid #e8ecf1;
                background: linear-gradient(135deg, #fafbfc, #f5f7fa);
                display: flex;
                align-items: center;
                justify-content: space-between;

                .card-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #2c3e50;
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    .title-icon {
                        color: @report-blue;
                        font-size: 18px;
                    }

                    .title-badge {
                        background: linear-gradient(135deg, @report-blue, @report-light);
                        color: #fff;
                        padding: 2px 8px;
                        border-radius: 10px;
                        font-size: 11px;
                    }
                }
            }

            .card-body {
                padding: 20px;
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
                width: 240px;

                .ivu-input-wrapper {
                    .ivu-input {
                        border-radius: 8px;
                    }
                }
            }

            .btn-search {
                background: linear-gradient(135deg, @report-blue, @report-light) !important;
                border: none !important;
                border-radius: 8px;
            }

            .btn-reset {
                border-radius: 8px;
                border-color: rgba(107, 142, 181, 0.3) !important;
            }
        }

        // 表格样式
        .report-table {
            border-radius: 10px;
            overflow: hidden;

            .ivu-table-wrapper {
                border-radius: 10px;
                overflow: hidden;

                .ivu-table {
                    font-size: 13px;

                    th {
                        background: linear-gradient(135deg, #f5f7fa, #e8ecf1) !important;
                        color: #2c3e50;
                        font-weight: 600;
                        font-size: 13px;
                        padding: 14px 12px !important;
                        border-bottom: 1px solid #e8ecf1 !important;
                    }

                    td {
                        padding: 14px 12px !important;
                        color: #475569;
                        border-bottom: 1px solid #f1f5f9 !important;
                    }

                    tr:hover td {
                        background: rgba(107, 142, 181, 0.04) !important;
                    }
                }
            }

            .title-cell {
                font-weight: 600;
                color: #2c3e50;
                display: flex;
                align-items: center;
                gap: 8px;

                .title-icon {
                    color: @report-blue;
                    font-size: 18px;
                }
            }

            .content-preview {
                max-width: 350px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #64748b;
                font-size: 13px;
                padding: 6px 10px;
                background: #f5f7fa;
                border-radius: 6px;
            }

            .date-cell {
                color: #64748b;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 6px;

                .date-icon {
                    color: @report-light;
                }
            }
        }

        // 操作按钮
        .action-btn {
            display: flex;
            gap: 8px;
            justify-content: center;

            .btn-detail {
                background: linear-gradient(135deg, @report-blue, @report-light) !important;
                border: none !important;
                color: #fff !important;
                border-radius: 6px;

                &:hover {
                    transform: translateY(-1px);
                }
            }
        }

        
        // 分页样式
        .pagination-wrapper {
            margin-top: 20px;
            padding: 16px 0;
            display: flex;
            justify-content: center;

            .ivu-page {
                .ivu-page-item {
                    border-radius: 6px;

                    &.ivu-page-item-active {
                        background: linear-gradient(135deg, @report-blue, @report-light);
                        border-color: @report-blue;
                    }
                }

                .ivu-page-prev, .ivu-page-next {
                    border-radius: 6px;
                }
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
            }

            .search-area {
                flex-direction: column;
                align-items: stretch;

                .search-input {
                    width: 100%;
                }
            }

            .stat-card {
                margin-bottom: 12px;
            }
        }
    }
    // 详情模态框
        .detail-modal {
            .ivu-modal {
                .ivu-modal-content {
                    border-radius: 12px;
                    overflow: hidden;
                }
            }

            .modal-header {
                background: linear-gradient(135deg, @report-dark, @report-blue);
                padding: 20px 24px;
                border-bottom: none;

                .modal-title {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .title-icon {
                        font-size: 20px;
                        color: rgba(255, 255, 255, 0.9);
                    }
                }
            }

            .modal-body {
                padding: 20px;
            }

            .content-detail {
                height: 55vh;
                overflow-y: auto;
                padding: 20px;
                background: #fafbfc;
                border-radius: 8px;
                border: 1px solid #e8ecf1;

                &::-webkit-scrollbar {
                    width: 8px;
                }

                &::-webkit-scrollbar-track {
                    background: #f5f7fa;
                    border-radius: 4px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(107, 142, 181, 0.3);
                    border-radius: 4px;
                }

                h3 {
                    text-align: center;
                    color: #2c3e50;
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    padding-bottom: 16px;
                    border-bottom: 2px solid #e8ecf1;
                }

                h4 {
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 20px 0 12px;
                    padding-left: 12px;
                    border-left: 3px solid @report-blue;
                }

                p {
                    color: #475569;
                    line-height: 1.8;
                    margin-bottom: 12px;
                    padding: 12px;
                    background: #fff;
                    font-size: 16px;
                    border-radius: 6px;
                }

                img {
                    max-width: 100%;
                    border-radius: 8px;
                    margin: 16px 0;
                }

                hr {
                    border: none;
                    border-top: 1px dashed #e8ecf1;
                    margin: 20px 0;
                }

                strong {
                    color: #2c3e50;
                    font-weight: 600;
                }

                // 图片横向一排展示样式
                .image-gallery {
                    display: flex;
                    flex-wrap: nowrap;
                    gap: 20px;
                    margin: 24px 0;
                    animation: galleryFadeIn 0.5s ease-out;
                    
                    @keyframes galleryFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(15px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .image-item {
                        flex: 1;
                        position: relative;
                        
                        .image-label {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin-bottom: 10px;
                            font-size: 14px;
                        
                            background: linear-gradient(135deg, #00D9A5, #4CAF50);
                            color: #fff;
                            padding: 2px 10px;
                            border-radius: 10px;
                            font-weight: 600;
                            
                        }
                        
                        img {
                            width: 100%;
                            height: 180px;
                            object-fit: cover;
                            border-radius: 10px;
                            display: block;
                            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                            
                            &:hover {
                                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                                transform: translateY(-3px);
                            }
                        }
                    }
                }
                
                // 分析结果样式
                .analysis-result {
                    margin: 28px 0;
                    animation: resultSlideUp 0.5s ease-out;
                    font-size:15px;
                    @keyframes resultSlideUp {
                        from {
                            opacity: 0;
                            transform: translateY(15px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .result-label {
                        font-size: 14px;
                        font-weight: 600;
                        color: #666;
                        margin-bottom: 8px;
                        letter-spacing: 1px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        
                        &::before {
                            content: '';
                            width: 8px;
                            height: 8px;
                            background: #00D9A5;
                            border-radius: 50%;
                        }
                    }
                    
                    .result-value {
                        font-size: 18px;
                        font-weight: 600;
                        color: #333;
                        line-height: 1.5;
                    }
                }
                
                // 保留旧类名兼容性
                .prediction-result {
                    .analysis-result();
                }
            }

            .modal-footer {
                padding: 16px 20px;
                border-top: 1px solid #e8ecf1;
                text-align: center;

                .ivu-btn-text {
                    color: #64748b;
                    border: 1px solid #e8ecf1;
                    padding: 6px 20px;
                    border-radius: 6px;

                    &:hover {
                        color: @report-blue;
                        border-color: @report-blue;
                    }
                }
            }
        }

</style>

<template>
    <div class="report-page">    
        <!-- 页面标题区域 -->
        <div class="page-header">
            <div class="header-title">
                <Icon type="ios-paper" class="header-icon" />
                <span class="title-text">分析报告列表</span>
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
                    <span class="title-badge">实时更新</span>
                </div>
            </div>
            <div class="card-body">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <Input v-model="searchForm.name" placeholder="搜索报告名称" clearable class="search-input" @on-enter="handleSearch">
                        <Icon type="ios-search" slot="prefix" />
                    </Input>
                    <Button type="primary" icon="search" class="btn-search" @click="handleSearch">搜索</Button>
                    <Button icon="ios-refresh" class="btn-reset" @click="handleReset">重置</Button>
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

        <!-- 详情模态框 -->
        <Modal 
            class="detail-modal"
            v-model="modalDetail" 
            :width="70"
            :mask-closable="false"
            :scrollable="true"
        >
            <div slot="header" class="modal-header">
                <div class="modal-title">
                    <Icon type="ios-document-text" class="title-icon" />
                    {{ details.title }}
                </div>
            </div>
            <div class="modal-body">
                <div class="content-detail" ref="reportContent" v-html="details.info"></div>
            </div>
            <div slot="footer" class="modal-footer">
                <Button type="primary" icon="ios-download-outline" @click="downloadReport" style="margin-right:12px;">下载报告</Button>
                <Button type="text" @click="modalDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    import html2canvas from 'html2canvas';
    export default {
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
                                
                                h('span', params.row.update_date)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                class: 'action-btn'
                            }, [
                                h('Button', {
                                    props: { type: 'primary', size: 'small' },
                                    class: 'btn-detail',
                                    on: {
                                        click: () => {
                                            this.detail(params);
                                        }
                                    }
                                }, [
                                    
                                    h('span', '查看详情')
                                ])
                            ]);
                        }
                    }
                ]               
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
            handleReset(){
                this.searchForm.name = '';
                this.searchForm.current = 1;
                this.init();
            },
            pageChange(current){
                this.searchForm.current=current;
                this.init();
            },
            detail(param){
                var _self=this;
                this.modalDetail=true
                util.post(this,'admin/sys_analysis/getData',{id:param.row.id},function(datas){ 
                   _self.details=datas;
                   // 处理图片横向展示
                   _self.$nextTick(() => {
                       _self.processImages();
                   });
                });
            },
            // 处理图片横向展示
            processImages() {
                const detailContent = document.querySelector('.report-page .content-detail');
                if (!detailContent) return;
                
                // 查找所有独立的图片
                const images = detailContent.querySelectorAll('img');
                if (images.length === 0) return;
                
                // 检查是否已经有 image-gallery
                let gallery = detailContent.querySelector('.image-gallery');
                if (!gallery) {
                    gallery = document.createElement('div');
                    gallery.className = 'image-gallery';
                } else {
                    gallery.innerHTML = '';
                }
                
                // 为图片添加标签
                const labels = ['帧 1', '帧 2', '预测图片', '图片4', '图片5', '图片6'];
                images.forEach((img, index) => {
                    const item = document.createElement('div');
                    item.className = 'image-item';
                    item.style.animationDelay = `${index * 0.1}s`;
                    
                    const label = document.createElement('div');
                    label.className = 'image-label';
                    label.textContent = labels[index] || ('图片' + (index + 1));
                    
                    item.appendChild(label);
                    item.appendChild(img.cloneNode(true));
                    gallery.appendChild(item);
                    
                    // 移除原图
                    img.remove();
                });
                
                // 找到第一个图片后面的位置插入 gallery
                const firstImg = detailContent.querySelector('img');
                if (firstImg) {
                    firstImg.parentNode.insertBefore(gallery, firstImg);
                } else {
                    detailContent.insertBefore(gallery, detailContent.firstChild);
                }
                
                // 处理预测结果文字
                this.processPredictionResult(detailContent);
            },
            // 处理分析结果文字样式
            processPredictionResult(detailContent) {
                // 查找包含"预测"或"结果"的文本段落
                const paragraphs = detailContent.querySelectorAll('p, h4, div');
                paragraphs.forEach(p => {
                    const text = p.textContent;
                    // 如果包含预测相关关键词
                    if (text.includes('预测') || text.includes('结果') || text.includes('准确率') || text.includes('置信度')) {
                        // 检查是否已经有 analysis-result 类
                        if (!p.classList.contains('analysis-result')) {
                            // 查找紧跟的兄弟元素作为值
                            let nextEl = p.nextElementSibling;
                            if (nextEl && (nextEl.textContent.includes('%') || nextEl.textContent.includes('概率') || /\d+\.?\d*/.test(nextEl.textContent))) {
                                // 创建分析结果容器
                                const resultDiv = document.createElement('div');
                                resultDiv.className = 'analysis-result';
                                
                                const labelEl = document.createElement('div');
                                labelEl.className = 'result-label';
                                labelEl.textContent = text.replace(/[：:]/g, '').trim() || '分析结果';
                                
                                const valueEl = document.createElement('div');
                                valueEl.className = 'result-value';
                                valueEl.textContent = nextEl.textContent.trim();
                                
                                resultDiv.appendChild(labelEl);
                                resultDiv.appendChild(valueEl);
                                
                                p.parentNode.insertBefore(resultDiv, nextEl);
                                p.remove();
                                nextEl.remove();
                            }
                        }
                    }
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
            // 下载报告
            downloadReport() {
                if (!this.details.title || !this.details.info) {
                    this.$Message.warning('暂无报告内容');
                    return;
                }
                
                const printWindow = window.open('', '_blank');
                if (!printWindow) {
                    this.$Message.warning('请允许弹出窗口以便下载PDF');
                    return;
                }
                
                var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + this.details.title + '</title>' +
                    '<style>' +
                    '*{margin:0;padding:0;box-sizing:border-box;}' +
                    'body{font-family:"Microsoft YaHei","PingFang SC","SimSun",sans-serif;padding:40px;max-width:800px;margin:0 auto;background:#fafbfc;color:#333;}' +
                    'h2{text-align:center;font-size:20px;color:#333;border-bottom:2px solid #6b8eb5;padding-bottom:15px;margin:0 0 30px 0;}' +
                    '.content{color:#475569;line-height:1.8;font-size:14px;background:#fafbfc;padding:20px;border-radius:8px;}' +
                    '.content p{margin-bottom:12px;background:#fff;padding:12px;border-radius:6px;}' +
                    '.content img{max-width:100%;width:100%;height:180px;object-fit:cover;border-radius:10px;display:block;margin:16px 0;box-shadow:0 2px 12px rgba(0,0,0,0.1);}' +
                    '.image-gallery{display:flex;flex-wrap:nowrap;gap:20px;margin:24px 0;width:100%;}' +
                    '.image-gallery .image-item{flex:1;min-width:0;background:#fff;padding:15px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);}' +
                    '.image-gallery .image-label{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:14px;background:linear-gradient(135deg,#00D9A5,#4CAF50);color:#fff;padding:2px 10px;border-radius:10px;font-weight:600;width:fit-content;}' +
                    '.image-gallery img{width:100% !important;height:180px;object-fit:cover;border-radius:10px;display:block;box-shadow:0 2px 12px rgba(0,0,0,0.1);}' +
                    '.frame-tag{background:linear-gradient(135deg,#00D9A5,#4CAF50);color:#fff;padding:2px 10px;border-radius:10px;font-size:12px;font-weight:600;}' +
                    '.analysis-result{margin:28px 0;font-size:15px;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);}' +
                    '.result-label{font-size:14px;font-weight:600;color:#666;margin-bottom:8px;}' +
                    '.result-value{font-size:18px;font-weight:600;color:#333;line-height:1.5;}' +
                    '@media print{body{padding:20px;background:#fff;}.content{background:#fff;}.content p{background:#fff;}.analysis-result{background:#fff;}.image-item{background:#fff;box-shadow:none;}}' +
                    '</style></head><body><h2>' + this.details.title + '</h2><div class="content">' + this.details.info + '</div>' +
                    '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},500);}</scr' + 'ipt></body></html>';
                printWindow.document.write(html);
                printWindow.document.close();
            }
        },
        mounted () {
            this.init();   
        }
    }
</script>
