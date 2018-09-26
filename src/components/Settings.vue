<template>
<div class="modal" v-bind:class="{ 'is-active' : settingsActive}">
	<div class="modal-background" @click="$emit('close-settings')"></div>
	  <div class="modal-card">
    <header class="modal-card-head is-radiusless" style="padding:10px">
      <p class="modal-card-title has-text-centered">Settings</p>
      <button class="delete" @click="$emit('close-settings')" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="content">
		<div class="field">
			<label class="label">Results per page</label>
			<div class="field-body">
				<div class="field">
					<div class="select">
						<select v-model="app_conf.page_size_new">
							<option value="9">9</option>
							<option value="18">18</option>
							<option value="36">36</option>
							<option value="63">72</option>
							<option value="90">90</option>
							<option value="150">144</option>
							<option value="200">200</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		
	    <div class="field">
				<label class="label">Box color</label>
			<div class="field-body">
				<div class="field">
					<div class="select">
						<select v-model="app_conf.box_color_new">
						  <option v-for="(option,index) in app_conf.colors" v-bind:value="option">
						    {{ index }}
						  </option>
						</select>
					</div>
				</div>
			</div>
		</div>
		
	    <div class="field">
			<label class="label">Selected Box color</label>
			<div class="field-body">
				<div class="field">
					<div class="select">
						<select v-model="app_conf.selected_box_color_new">
						  <option v-for="(option,index) in app_conf.colors" v-bind:value="option">
						    {{ index }}
						  </option>
						</select>
					</div>
				</div>
			</div>
		</div>
     </div>
       <label>Note: Changes are valid only for this session and does not saved.</label>
       <br/>
		<div class="field is-grouped is-pulled-right">			
			<div class="control">
				<button class="button is-warning" @click="apply">Apply</button>
			</div>
		</div>
     </section>
     	
		
		</div>
	</div>




</template>

<script>
export default {
	name: 'Settings',
	props: {
		settingsActive: {
			type: Boolean,
			required: true,
		},
		app_conf: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			perPageResult: 12,
		};
	},
	methods: {
		apply: function() {
			this.$emit('apply-settings');
			this.$emit('close-settings');
		},
	},
};
</script>

<style scoped>
</style>
