<script>
	import { currentEditingList } from './store';
</script>

<div class="flex h-fit w-full justify-between rounded border-2 p-1 text-2xl">
	<span class="bitfont">ProfBills</span>
	{#if $currentEditingList != null}
		<button
			class="bitfont cursor-pointer transition hover:text-gray-500"
			on:click={() => currentEditingList.set(null)}
		>
			Go Back
		</button>
	{/if}
</div>
