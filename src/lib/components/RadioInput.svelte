<script lang="ts">
	export let labelText: string;
	export let labelFor: string;
	export let name: string;
	export let options: RadioOption[] = [];
	export let groupValue: string = '';

	type RadioOption = {
		value: string;
		label: string;
		required?: boolean;
	};

	$: console.log(groupValue);
</script>

<div class="form-control">
	<label for={labelFor}>
		<div class="label">
			<span class="label-text">{labelText}</span>
		</div>
		<div class="join join-horizontal space-x-3">
			{#each options as option (option.value)}
				<label for={option.value} class="label space-x-2">
					<input
						type="radio"
						{name}
						value={option.label}
						bind:group={groupValue}
						id={option.value}
						class="radio checked:bg-primary"
						required={option.required}
					/>
					<span class="label-text font-normal">{option.label}</span>
				</label>
			{/each}
		</div>
	</label>
</div>
