<script lang="ts">
	export let labelText: string;
	export let isRequired: boolean;
	export let id: string;
	export let name: string;
</script>

<div class="form-control">
	<label for={id} class="form-control">
		<div class="label">
			<span class="label-text">{labelText}</span>
		</div>
		<select {name} {id} class="select select-bordered select-sm" tabindex="0" required={isRequired}>
			<option disabled selected>Select an option...</option>
			<slot />
		</select>
	</label>
</div>
