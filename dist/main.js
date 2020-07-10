/** * @author misaka * @date 2017/12/6 * @licence MIT * @github
https://github.com/misakamaiyako/inlineEditor ***/
Vue.component("inlineEditor",
	{
		template: `
      <Tooltip
          content="单击编辑"
          v-if="!edit"
          @click.native="edit = true"
          placement="top"
      >
      <span class="m-span"><slot></slot></span>
      </Tooltip>
      <div
          v-else-if="type == 'input'"
          :class="{
		'complex-inline': showSwitch,
	}"
      >
      <Input v-model="currentValue" :type="inputType" @keydown.native.enter="close" :autofocus="true" :icon="icon"
          @on-click="iconClick" ref="input" @on-blur="blur" />
      <div class="inline-append" v-if="showSwitch">
        <a href="javascript: void 0">
          <Icon type="checkmark-round" style="margin-right: .5rem;" @click.native="append(true)"></Icon>
        </a>
        <a href="javascript: void 0">
          <Icon type="close-round" @click.native="append(false)"></Icon>
        </a>
      </div>
      </div>
      <div
          v-else-if="type == 'select'"
          :class="{
		'complex-inline': showSwitch,
	}"
      >
      <Select
          v-model="currentSelectValue"
          :label-in-value="true"
          :filterable="filterable"
          :multiple="multiple"
          :loading="loading"
          @on-query-change="onQuery"
          @on-change="closeSelect"
          style=" flex-grow:1">
        <slot name="option"></slot>
      </Select>
      <div class="inline-append" v-if="showSwitch">
        <a href="javascript: void 0">
          <Icon type="checkmark-round" style="margin-right: .5rem;" @click.native="append(true)"></Icon>
        </a>
        <a href="javascript: void 0">
          <Icon type="close-round" @click.native="append(false)"></Icon>
        </a>
      </div>
      </div>
		`, props: {
			value: { type: [String, Number, Object, Array], required: true },
			type: {
				type: String, validator(value) {
					return ["input",
						"select"].indexOf(value) > -1;
				}, default: "input",
			}, inputType: {
				type:
				String, default: "text",
			}, filterable: { type: Boolean, default: false },
			multiple: { type: Boolean, default: false }, loading: {
				type: Boolean, default:
					false,
			}, icon: String, blurClose: { type: Boolean, default: false },
			showSwitch: { type: Boolean, default: false },
		}, data() {
			return {
				edit: false,
				currentValue: this.value, currentSelectValue: this.value,
			};
		}, methods: {
			close() {
				this.edit = false;
				this.$emit("input", this.currentValue);
			},
			closeSelect(value) {
				if (!(!this.multiple || this.blurClose)) {
					this.edit =
						false;
					this.$emit("input", value);
				}
			}, onQuery(value) {
				this.$emit("on-query",
					value);
			}, finish() {
				this.edit = false;
			}, iconClick() {
				this.$emit("on-click");
			}, blur() {
				this.blurClose === true && (this.edit =
					false);
			}, append(bool) {
				if (bool) {
					this.edit = false;
					this.$emit("input",
						this.type === "input" ? this.currentValue : this.currentSelectValue);
				} else {
					this.edit = false;
				}
			},
		}, watch: {
			edit(value) {
				if (!value) {
					this.$emit("on-close", {
						value: this.type === "input" ? this.currentValue :
							this.currentSelectValue,
					});
				} else {
					this.$nextTick(() => {
						"input" ===
						this.type && this.$refs.input.focus();
						this.currentValue = this.value;
						this.currentSelectValue = this.value;
					});
				}
			},
		},
	});
