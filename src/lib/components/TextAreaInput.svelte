<script lang="ts">
	export let labelText: string;
	export let isRequired: boolean;
	export let id: string;
	export let name: string;
	export let placeholderText: string;
	export let numRows: number;
	let value: string;
</script>

<div class="form-control">
	<label for={id} class="form-control">
		<div class="label">
			<span class="label-text">{labelText}</span>
		</div>
		<textarea
			{name}
			{id}
			bind:value
			placeholder={placeholderText}
			class="textarea textarea-bordered textarea-sm leading-normal"
			rows={numRows}
			spellcheck="true"
			required={isRequired}
		/>
	</label>
</div>
