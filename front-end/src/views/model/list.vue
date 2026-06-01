<style lang="less">
    .table-min-width{
        min-width:120px;
        width:120px
    }

     .table-min-width2{
        min-width:150px;
        width:150px
    }
    .img-pic{
        display:block;
        width:200px;
        height:200px;
    }
    
    /* ============ 弹窗样式优化 ============ */
    
    // 弹窗主体
    .predict-modal-wrap {
        .ivu-modal {
            max-width: 750px;
        }
        .ivu-modal-content {
            background: linear-gradient(145deg, #1a1f4e 0%, #0d1b2a 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(0, 217, 165, 0.2);
        }
        .ivu-modal-header {
            background: linear-gradient(90deg, #00D9A5, #4CAF50);
            padding: 16px 24px;
            border-bottom: none;
            .ivu-modal-header-inner {
                color: #fff;
                font-size: 18px;
                font-weight: 600;
            }
            .ivu-modal-close {
                .ivu-icon-ios-close {
                    color: #fff;
                    font-size: 28px;
                    &:hover { color: #fff; opacity: 0.8; }
                }
            }
        }
        .ivu-modal-body { padding: 24px; }
        .ivu-modal-footer {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding: 16px 24px;
        }
    }
    
    // 图片上传区
    .upload-section {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    .upload-box {
        flex: 1;
        .upload-label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 14px;
            color: #A0A0A0;
            .frame-tag {
                background: linear-gradient(135deg, #00D9A5, #4CAF50);
                color: #fff;
                padding: 2px 10px;
                border-radius: 10px;
                font-size: 12px;
                font-weight: 600;
            }
        }
    }
    .upload-area {
        position: relative;
        height: 180px;
        border: 2px dashed rgba(0, 217, 165, 0.4);
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        overflow: hidden;
        &:hover, &.drag-over {
            border-color: #00D9A5;
            background: rgba(0, 217, 165, 0.08);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 217, 165, 0.15);
        }
        &.has-image {
            border-style: solid;
            border-color: rgba(0, 217, 165, 0.5);
        }
        input[type="file"] {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        .upload-icon {
            font-size: 48px;
            color: #00D9A5;
            margin-bottom: 12px;
            animation: floatUp 3s ease-in-out infinite;
        }
        .upload-hint {
            color: #A0A0A0;
            font-size: 13px;
            text-align: center;
            .highlight { color: #00D9A5; font-weight: 600; }
        }
        .upload-tip { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 8px; }
        .preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
        .remove-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 28px;
            height: 28px;
            background: rgba(244, 67, 54, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s;
            z-index: 10;
            &:hover { transform: scale(1.15); background: #F44336; }
        }
        &:hover .remove-btn { opacity: 1; }
    }
    
    // 预测结果区
    .result-box {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 20px;
        border: 1px solid rgba(0, 217, 165, 0.2);
        .result-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            .result-icon {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, #00D9A5, #4CAF50);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 18px;
            }
            .result-title { color: #E8E8E8; font-size: 15px; font-weight: 600; flex: 1; }
            .btn-generate-report {
                background: linear-gradient(135deg, #667eea, #764ba2) !important;
                border: none !important;
                color: #fff !important;
                font-size: 12px;
                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }
                &.ivu-btn-loading {
                    background: rgba(102, 126, 234, 0.7) !important;
                }
                .ivu-icon { margin-right: 4px; }
            }
        }
        .result-body {
            display: flex;
            gap: 20px;
            .result-img {
                flex-shrink: 0;
                width: 200px;
                height: 200px;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
                img { width: 100%; height: 100%; object-fit: cover; }
            }
            .analysis-text {
                flex: 1;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                padding: 16px;
                max-height: 200px;
                overflow-y: auto;
                color:#fff;
                font-size: 16px;
                &::-webkit-scrollbar { width: 6px; }
                &::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 3px; }
                &::-webkit-scrollbar-thumb { background: rgba(0, 217, 165, 0.5); border-radius: 3px; }
                /deep/ p { color: #E8E8E8; line-height: 1.8; margin-bottom: 8px; &:last-child { margin-bottom: 0; } }
                /deep/ strong { color: #00D9A5; }
            }
        }
    }
    
    // 空状态
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        color: #A0A0A0;
        .empty-icon { font-size: 56px; margin-bottom: 16px; animation: pulse 2s ease-in-out infinite; }
        p { font-size: 14px; }
    }
    
    // 按钮
    .btn-submit {
        background: linear-gradient(135deg, #00D9A5, #4CAF50) !important;
        border: none !important;
        font-weight: 600;
        padding: 0 24px;
        height: 36px;
        &:hover {
            background: linear-gradient(135deg, #00B894, #00D9A5) !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 217, 165, 0.4);
        }
    }
    .btn-cancel {
        background: rgba(255,255,255,0.1) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        color: #A0A0A0 !important;
        &:hover { background: rgba(255,255,255,0.15) !important; color: #fff !important; }
    }
    
    @keyframes floatUp {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
</style>

<template>
     <div>    
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        模型列表
                    </p>
                    <Row>
                        <Input v-model="searchForm.name" placeholder="请输入模型名称" style="width: 200px" />
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                        <!--<Button type="info" @click="add">添加</Button>-->
                    </Row>
                    
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table border stripe :columns="columns" :data="data" :loading="loading" style="width: 100%;margin-top:10px"></Table>
                        <Page :total="count" :current="searchForm.current" show-total  style="margin-top:10px;" @on-change="pageChange"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>

    <Modal class-name="predict-modal-wrap" title="水稻预测" :width="800" :mask-closable="false" v-model="modalAdd">
        <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :loading="modalLoading">
            <!-- 图片上传 -->
            <div class="upload-section">
                <div class="upload-box">
                    <div class="upload-label">
                        <span class="frame-tag">帧 1</span>
                        <span>水稻生长图片（第一帧）</span>
                    </div>
                    <div class="upload-area" :class="{ 'has-image': img1 }" 
                         @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @drop.prevent="handleDrop($event, 1)">
                        <input @change="onFileChange1" type="file" id="imageUpload1" accept="image/*" />
                        <template v-if="!img1">
                            <Icon type="ios-cloud-upload-outline" class="upload-icon" />
                            <div class="upload-hint">拖拽图片或<span class="highlight">点击选择</span></div>
                            <div class="upload-tip">支持 JPG、PNG 格式</div>
                        </template>
                        <template v-else>
                            <img :src="img1" class="preview-img" />
                            <span class="remove-btn" @click.stop="removeImage(1)"><Icon type="ios-close" /></span>
                        </template>
                    </div>
                </div>
                <div class="upload-box">
                    <div class="upload-label">
                        <span class="frame-tag">帧 2</span>
                        <span>水稻生长图片（第二帧）</span>
                    </div>
                    <div class="upload-area" :class="{ 'has-image': img2 }"
                         @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @drop.prevent="handleDrop($event, 2)">
                        <input @change="onFileChange2" type="file" id="imageUpload2" accept="image/*" />
                        <template v-if="!img2">
                            <Icon type="ios-cloud-upload-outline" class="upload-icon" />
                            <div class="upload-hint">拖拽图片或<span class="highlight">点击选择</span></div>
                            <div class="upload-tip">支持 JPG、PNG 格式</div>
                        </template>
                        <template v-else>
                            <img :src="img2" class="preview-img" />
                            <span class="remove-btn" @click.stop="removeImage(2)"><Icon type="ios-close" /></span>
                        </template>
                    </div>
                </div>
            </div>
            
            <!-- 预测结果 -->
            <div class="result-box" v-if="img3">
                <div class="result-header">
                    <div class="result-icon"><Icon type="ios-analytics" /></div>
                    <span class="result-title">预测分析结果</span>
                    <Button type="primary" size="small" @click="generateReport" :loading="reportLoading" class="btn-generate-report">
                        <Icon type="ios-document-outline" />
                        {{ reportGenerated ? '已生成报告' : '生成报告' }}
                    </Button>
                </div>
                <div class="result-body">
                    <div class="result-img"><img :src="img3" /></div>
                    <div class="analysis-text"><div v-html="predictInfo"></div></div>
                </div>
            </div>
            
            <!-- 空状态 -->
            <div class="empty-state" v-if="!img1 && !img2">
                <Icon type="ios-images-outline" class="empty-icon" />
                <p>请上传两张水稻生长图片进行预测分析</p>
            </div>
             
        </Form>
       <div slot="footer">
                <Button @click.native="addPeroidFun" :loading="modalLoading" class="btn-submit">生长期识别</Button>
                <Button @click.native="addOkFun(1)" :loading="modalLoading" class="btn-submit">预测1天后</Button>
                <Button @click.native="addOkFun(3)" :loading="modalLoading" class="btn-submit">预测3天后</Button>
                <Button @click.native="analysisFun()" :loading="modalLoading" class="btn-submit">星火大模型分析</Button>
            </div>
    </Modal>    
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    export default {
        data () {
            return {
                sessionId: "",
                predictInfo: "",
                img3: "",
                img1:[],
                img2:[],
                modalAdd:false,
                modalEdit:false,
                loading:false,
                modalLoading:false,
                modalCanBut:true,
                reportLoading:false,
                reportGenerated:false,
                data: [],
                roleList:[],
                growth_stage: "",
                formValidate: {                   
                },
                searchForm:{
                   
                    current:1
                },
                count:0,
                loginNameDisabled:false,
                columns: [                  
                    {
                        title: '模型地址',
                        key: 'model_path',
                        className: 'table-min-width',
                        ellipsis:true
                    },
                    {
                        title: '模型名称',
                        key: 'model_name',
                        className: 'table-min-width',
                        ellipsis:true
                    },
                    {
                        title: '修改时间',
                        key: 'file_modified_time',
                        className: 'table-min-width',
                        ellipsis:true
                    },
                    {
                        title: '模型大小',
                        key: 'model_size',
                        width: 100,
                        className: 'table-min-width',
                        ellipsis:true,
                        render: (h, params) => {
                            let size = params.row.model_size;
                            if (size && size > 0) {
                                let sizeInMB = (size / (1024 * 1024)).toFixed(2);
                                return h('span', sizeInMB + ' M');
                            }
                            return h('span', '-');
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        ellipsis:true,
                        render: (h, params) => {
                            let buttons = [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params);
                                        }
                                    }
                                }, '进行预测')
                            ];
                            // 只有管理员才能看到删除按钮
                            if (this.isAdmin) {
                                buttons.push(h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteModel(params);
                                        }
                                    }
                                }, '删除'));
                            }
                            return h('div', buttons);
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
                },
                filelist1:[],
                filelist2:[],
                allList:[]
            }
        },
        computed: {
            isAdmin() {
                let userInfo = localStorage.getItem('userInfo');
                if (userInfo) {
                    try {
                        let user = JSON.parse(userInfo);
                        // id为1的是超级管理员
                        return user.id == '1' || user.id == 1;
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            }
        },
        methods: {
            onFileChange1(e) {
                var selectedFile = e.target.files[0]; // 获取选中的文件
                this.uploadImage(selectedFile,1)
            },
            onFileChange2(e) {
                var selectedFile = e.target.files[0]; // 获取选中的文件
                this.uploadImage(selectedFile,2)
            },
            // 拖拽悬停
            handleDragOver(e) {
                e.currentTarget.classList.add('drag-over');
            },
            // 拖拽离开
            handleDragLeave(e) {
                e.currentTarget.classList.remove('drag-over');
            },
            // 拖拽放下
            handleDrop(e, type) {
                e.currentTarget.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    this.uploadImage(files[0], type);
                }
            },
            // 移除图片
            removeImage(type) {
                if (type === 1) {
                    this.img1 = '';
                    document.getElementById('imageUpload1').value = '';
                } else {
                    this.img2 = '';
                    document.getElementById('imageUpload2').value = '';
                }
                // 重置报告状态
                this.reportGenerated = false;
            },
            // 生成报告
            generateReport() {
                if (this.reportGenerated) {
                    this.$Message.info('报告已生成，可前往报告列表查看');
                    return;
                }
                this.reportLoading = true;
                let _self = this;
                // 生成报告标题
                const now = new Date();
                const title = `水稻预测报告_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
                
                // 构建报告内容（包含预测图片和分析结果）
                const reportContent = `
                    <h3>水稻生长预测分析报告</h3>
                    <p><strong>生成时间：</strong>${now.toLocaleString('zh-CN')}</p>
                    <hr/>
                    <h4>一、预测结果图片</h4>
                    <div class="image-gallery"> 
                        <div class="image-item">
                            <span class="image-label">帧1</span>
                            <img src="${this.img1}" style="max-width:100%;border-radius:8px;" />
                        </div>
                         <div class="image-item">
                            <span class="image-label">帧2</span>
                            <img src="${this.img2}" style="max-width:100%;border-radius:8px;" />
                        </div>
                        <div class="image-item">
                            <span class="image-label">预测的生长情况</span>
                            <img src="${this.img3}" style="max-width:100%;border-radius:8px;" />
                        </div>
                    </div>
                    <hr/>
                    <h4>二、分析结果</h4>
                    <div class="analysis-result">${this.predictInfo}</div>
                    <hr/>
                    <h4>三、备注</h4>
                    <p>本报告由水稻生长可视化预测系统自动生成，基于水稻生长图片序列预测分析。</p>
                `;
                
                util.post(this, 'admin/sys_analysis/addData', {
                    title: title,
                    info: reportContent
                }, function(datas) {
                    _self.reportLoading = false;
                    _self.reportGenerated = true;
                    _self.$Message.success('报告生成成功！可前往报告列表查看');
                }, function(err) {
                    _self.reportLoading = false;
                    _self.$Message.error('报告生成失败：' + (err.message || '未知错误'));
                });
            },
            uploadImage(selectedFile,type) {
                var that = this
                if (!selectedFile) {
                    alert('请选择一个文件');
                    return;
                }
                util.imageUpload(this,selectedFile,function(response){
                     if(response.success="success"){
                        if(type==1)
                        that.img1=response.files[0].file_url
                        if(type==2)
                        that.img2=response.files[0].file_url
                    }
                })
            },
            deleteModel(param) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '确定要删除模型【' + param.row.model_name + '】吗？此操作不可恢复！',
                    onOk: () => {
                        let _self = this;
                        util.post1(this, '/db/delete-model', { model_name: param.row.model_name }, function(datas) {
                            console.log(datas)
                            if (datas.success || datas.status === 'success') {
                                _self.$Message.success('删除成功');
                                _self.init();
                            } else {
                                _self.$Message.error('删除失败：' + (datas.message || '未知错误'));
                            }
                        });
                    },
                    onCancel: () => {
                        // 取消操作
                    }
                });
            },
            init () {
                let _self=this;
                _self.loading=true;
                util.post(_self,'admin/sys_model/pageData',this.searchForm,function(datas){ 
                
                    _self.data = datas.data;
                    _self.count = datas.count;
                    _self.loading=false;            
                }); 
                 
            },
            handleSearch(){
                this.searchForm.current=1;
                this.init();
            },
            pageChange(current){
                console.log("current",current)
                this.searchForm.current=current;
                // 天机获取的条数
                this.init()
            },
            
            add (){           
                this.loginNameDisabled=false;       
                this.formValidate={};   
                this.modalAdd=true;            
            },
            edit (param) {
                document.getElementById('imageUpload1').value="";
                document.getElementById('imageUpload2').value="";
                var that = this
                util.post(this,`http://localhost:8000/load-model?checkpoint_path=checkpoints/${param.row.model_name}&sequence_length=2&predict_length=1&base_size=256,256&model_type=mobile&base_filters=64`,this.searchForm,function(datas){                                   
                    console.log(datas)
                    if(datas.status=='success'){
                        that.modalAdd=true;
                        that.img1=""
                        that.img2=""
                        that.img3=""       
                    }
                                    
                });             
            },
            remove (param) {
                let _self=this;
                this.$Modal.confirm({
                    title: '删除',
                    content: '删除后数据无法恢复，是否继续？',
                    onOk: () => {
                        this.loading=true;
                        util.post(this,'admin/sys_user/delData',{id:param.row.id},function(datas){ 
                            _self.data.splice(param.index, 1);
                            _self.loading =false;               
                            _self.$Message.success('删除成功！');              
                        });
                    }
                });                          
            },
            changeStatus (value,param) {
                let _self=this;
                this.loading=true;
                let status=0;
                if(value){
                    status=1;
                }
                util.post(this,'admin/sys_user/changeStatus',{id:param.row.id,status:status},function(datas){ 
                    _self.data[param.index].status=value;
                    _self.loading =false;               
                    _self.$Message.success('修改成功！');              
                });
            },  
            async addPeroidFun() {
                this.modalLoading=true
                var _self = this
                const formData = new FormData();
                const fileInput1 = document.getElementById('imageUpload1')
                formData.append('file', fileInput1.files[0]);    
                const response = await fetch('http://localhost:5000/predict_simple', {
                    method: 'POST',
                    body: formData
                });
                
                var data = await response.json();
                console.log(data,"data")
                if(data.success) {
                    _self.$Message.success("当前生长期为:"+data.result.growth_stage);
                    _self.growth_stage=data.result.growth_stage
                    util.changeModalLoading(this)
                }
            },
            async analysisFun() {
                this.modalLoading=true
                const formData = new FormData();
                const fileInput1 = this.img3//document.getElementById('imageUpload1')
                formData.append('image', fileInput1); 
                formData.append('sessionId',this.sessionId );
                var data = {
                    'session_id':this.sessionId,
                    "image_data": fileInput1,
                    "growth_stage": this.growth_stage //"tillering"  
                }   
                const response = await fetch('http://localhost:8000/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(data)
                });
                
                var data = await response.json();
                console.log("data",data)
                if(data.analysis) {
                    this.predictInfo=data.analysis.result
                    util.changeModalLoading(this)
                }
            },
            addOkFun(days){
                let _self=this;
                if(_self.img1!="" && _self.img2!=""){
                    util.changeModalLoading(this,true);
                        this.getPredict(days)
                } else {
                    _self.$Message.warning('请上传图片！');     
                    util.changeModalLoading(this);
                }
             
            },         
            addCanFun(){      
                this.modalAdd=false; 
                util.changeModalLoading(this);         
                this.$refs['formRef'].resetFields();
                // 重置报告状态
                this.reportGenerated = false;
                //this.formValidate=initform;
            },
            async getPredict(days) {
                const formData = new FormData();
                var _self = this
                const fileInput1 = document.getElementById('imageUpload1');
                const files1 = fileInput1.files;
                const fileInput2 = document.getElementById('imageUpload2');
                const files2 = fileInput2.files;
                formData.append('files', files1[0]);  // 第一张图片
                formData.append('files',files2[0]);  // 第二张图片
                formData.append("predict_days",days)
                    try  {
                    // 3. 发送请求（可选：添加 output_format=base64 参数）
                        const response = await fetch('http://localhost:8000/predict?enable_analysis=true', {
                            method: 'POST',
                            body: formData
                        });
                       
                        var data = await response.json();
                        console.log(data,"response")
                        if (data.predictions && data.predictions[2]) {
                            const imageUrl = 'data:image/png;base64,' + data.predictions[2].base64;
                            this.img3 = imageUrl;
                            // this.predictInfo=data.analysis
                            // this.predictInfo.analysis=this.predictInfo.analysis.substr(45)
                            this.sessionId=data.sessionId
                        }
                        if (!response.ok) {
                            const error = await response.json();
                           util.notice(_self,error.detail || '超分请求失败');
                        }
                    
                        util.changeModalLoading(this)
                        
                    } catch (error) {
                        console.error('超分失败：', error);
                        // util.notice(_self,'超分失败：' + error.message);
                        util.changeModalLoading(this)
                }      
            }
        },
        mounted () {
            this.init();   
        }
    }
</script>