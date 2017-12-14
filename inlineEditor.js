/***
 *  @author misaka
 *  @date 2017/12/6
 *  @licence MIT
 *  @git https://github.com/misakamaiyako/inlineEditor
 */
;(function register (everment,component) {
    if( 'undefined' === typeof Vue ) {
        throw 'inlineEditor requires Vue'
    } else if ( 'undefined'===typeof iview ) {
        throw 'inlineEditor requires iview(for temporary )'
    } else {
        Vue.component('inlineEditor',component())
    }
})(this,function () {
    return {
       render(_h){
           let _vm = this;
           let _c = _vm._self._c || _h;
           return (!_vm.edit) ? _c('Tooltip', {
               attrs: {
                   "content": "单击编辑",
                   "placement": "top"
               },
               nativeOn: {
                   "click": function($event) {
                       _vm.edit = true
                   }
               }
           }, [_c('span', {
               staticClass: "m-span"
           }, [_vm._t("default")], 2)]) : (_vm.type == 'input') ? _c('Input', {
               ref: "input",
               attrs: {
                   "type": _vm.inputType,
                   "autofocus": true,
                   "icon": _vm.icon
               },
               on: {
                   "on-click": _vm.iconClick,
                   "on-blur": _vm.blur
               },
               nativeOn: {
                   "keydown": function($event) {
                       if (!('button'in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                           return null;
                       }
                       _vm.close($event)
                   }
               },
               model: {
                   value: (_vm.currentValue),
                   callback: function($$v) {
                       _vm.currentValue = $$v
                   },
                   expression: "currentValue"
               }
           }) : (_vm.type == 'select') ? _c('Select', {
               attrs: {
                   "label-in-value": true,
                   "filterable": _vm.filterable,
                   "multiple": _vm.multiple,
                   "loading": _vm.loading
               },
               on: {
                   "on-query-change": _vm.onQuery,
                   "on-change": _vm.closeSelect
               },
               model: {
                   value: (_vm.currentSelectValue),
                   callback: function($$v) {
                       _vm.currentSelectValue = $$v
                   },
                   expression: "currentSelectValue"
               }
           }, [_vm._t("option")], 2) : _vm._e()
       },
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
            },
            icon:String,
            blurClose:{
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
        },
        mounted(){
        },
        watch:{
            edit(value){
                !value&&this.$emit("on-close",{ value: this.type==='input'?this.currentValue:this.currentSelectValue})
            }
        }
    }
});
