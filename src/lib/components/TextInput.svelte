<script lang="ts">
	export let labelText: string;
	export let placeholderText: string;
	export let isRequired: boolean;
	export let id: string;
	export let name: string;
</script>

<div class="form-control">
	<label for={id}>
		<div class="label">
			<span class="label-text">{labelText}</span>
		</div>
		<input
			tabindex="0"
			type="text"
			{name}
			{id}
			placeholder={placeholderText}
			class="input input-sm input-bordered w-full"
			required={isRequired}
		/>
	</label>
</div>
