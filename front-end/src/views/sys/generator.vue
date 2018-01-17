<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                代码生成器
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                >
                    <FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="手机：" prop="phone" >
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.phone"></Input>
                        </div>                      
                    </FormItem>
                    <FormItem label="邮箱：" prop="email" >
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.email"></Input>
                        </div>                      
                    </FormItem>
                    <FormItem label="角色：">
                        <span>{{ userForm.rolename }}</span>
                    </FormItem>                   
                    <div>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>       
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    data () {       
        return {
            save_loading:false,
            userForm: {

            },
        };
    },
    methods: {
        saveEdit () {
            let _self=this;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    _self.save_loading = true;
                    let _data=util.copy(_self.userForm); 
                    util.post(this,'sys_user/updateInfo',_data,function(datas){                  
                        //_self.userForm=datas;    
                        _self.$Message.success('保存成功！');
                        _self.save_loading = false;           
                    });                                          
                }
            });
        },     
        init () {
            let _self=this;
            util.post(this,'sys_user/myDetail',{},function(datas){                  
                _self.userForm=datas;               
            });
        }
    },
    mounted () {

    }
};
</script>
