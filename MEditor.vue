/***
*  @author misaka
*  @date 2017/12/6
*/
<style>
    .m-span:hover{
        background-color: lightgoldenrodyellow;
    }
</style>

<template>
    <Tooltip content="单击编辑" v-if="!edit" @click.native="edit=true" placement="top">
        <span class="m-span"><slot></slot></span>
    </Tooltip>
    <Input v-else-if="type=='input'" v-model="currentValue" :type="inputType" @keydown.native.enter="close" :autofocus="true"/>
    <Select
            v-else-if="type=='select'"
            v-model="currentSelectValue"
            :label-in-value="true"
            :filterable="filterable"
            :multiple="multiple"
            :loading="loading"
            @on-query-change = 'onQuery'
            @on-change="closeSelect">
        <slot name="option"></slot>
    </Select>
</template>

<script>
    export default {
        props:{
            value:{
                type:[String,Number,Object,Array],
                required:true
            },
            type:{
                type:String,
                validator(value){
                    return ['input','select'].indexOf(value)>-1;
                },
                default:'input'
            },
            inputType:{
                type:String,
                default:'text'
            },
            filterable:{
                type:Boolean,
                default:false
            },
            multiple:Boolean,
            loading:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                edit:false,
                currentValue:this.value,
                currentSelectValue:this.value
            };
        },
        methods:{
            close(){
                this.edit = false;
                this.$emit('input',this.currentValue);
            },
            closeSelect(value){
                if(!this.multiple){
                    this.edit = false;
                }
                this.$emit('input',value);
            },
            onQuery(value){
                this.$emit('on-query',value);
            },
            finish(){
                this.edit = false;
            }
        }
    };
</script>