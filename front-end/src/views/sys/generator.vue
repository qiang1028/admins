<style lang="less">
</style>

<template>
     <div>    
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        代码生成器
                    </p>
                    <Row>
                        <Select v-model="tablename" placeholder="请选择要生成代码的表名" style="width: 200px">
                            <Option v-for="item in tableList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary">开始配置</Button></span>
                    </Row>
                    <Row style="margin-top:10px;">
                        <Button type="info" @click="add">生成代码</Button>
                    </Row>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table border :columns="columns" :data="data" :loading="loading"style="width: 100%;margin-top:10px"></Table>
                    </Row>
                </Card>
            </Col>
        </Row> 
    </div>
</template>

<script>
    import util from '@/libs/util.js';
    export default {
        data () {
            return {
                loading:false,
                tablename:'',
                tableList:[],
                columns: [                  
                    {
                        title: '字段名',
                        key: 'name'
                    },
                    {
                        title: '字段注释',
                        key: 'comment',
                        render: (h, params) => {
                            let _self=this;
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: params.row.comment
                                },
                                on: {
                                    'on-blur' (event) {
                                        _self.formData[params.index].comment=event.target.value;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '是否在列表中显示',
                        key: 'is_show',
                        render: (h, params) => {
                            let _self=this;
                            return h('Checkbox', {
                                props: {
                                    size: 'large',
                                    value: params.row.is_show,
                                    'true-value':1,
                                    'false-value':0
                                },
                                on: {
                                    'on-change' (value) {
                                        _self.formData[params.index].is_show=value;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '是否是搜索项',
                        key: 'is_search',
                        render: (h, params) => {
                            let _self=this;
                            return h('Checkbox', {
                                props: {
                                    size: 'large',
                                    value: params.row.is_search,
                                    'true-value':1,
                                    'false-value':0
                                },
                                on: {
                                    'on-change' (value) {
                                        _self.formData[params.index].is_search=value;
                                    }
                                }
                            });
                        }
                    },                  
                ],
                data: [],  
                formData:[] 
            }
        },
        methods: {
            init () {
                let _self=this;
                _self.loading=true;
                util.post(this,'generator/getTables',this.searchForm,function(datas){                  
                    _self.tableList=datas;
                    _self.loading=false;                  
                });
            },
            handleSearch(){
                if(!this.tablename){
                    this.$Message.error('请先选择要生成代码的表名！');
                    return false;
                }
                let _self=this;
                _self.loading=true;
                util.post(this,'generator/getColumns',{tablename:_self.tablename},function(datas){                  
                    _self.data=datas;
                    _self.formData=util.copy(datas);                   
                    _self.loading=false;                  
                });
            },           
            add (){     
                if(!this.tablename){
                    this.$Message.error('请先选择要生成代码的表名！');
                    return false;
                }
                let _self=this;
                _self.loading=true;
                this.$Message.loading({
                    content: '正在生成代码中，请耐心等耐。。。',
                    duration: 0
                });
                util.post(this,'generator/todoCode',{parameter:_self.formData,tablename:_self.tablename},function(datas){                  
                    _self.$Message.destroy();
                    _self.$Message.info({
                        content: datas.msg,
                        duration: 5,
                        closable: true
                    });                  
                    _self.loading=false;                  
                });           
            },                  
        },
        mounted () {
            this.init();
        }
    }
</script>