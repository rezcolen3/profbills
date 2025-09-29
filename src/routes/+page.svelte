<script>
	import EditList from './EditList.svelte';
	import Nav from './nav.svelte';
	import { currentEditingList, Lists } from './store';
	import ViewLists from './viewLists.svelte';

	$inspect($Lists);
</script>

<div class="w-100 flex h-full flex-col gap-4 bg-white p-2">
	<Nav />

	<div class="flex h-full flex-col gap-2 overflow-y-auto">
		{#if $currentEditingList == null}
			<ViewLists />
		{:else}
			<EditList />
		{/if}
	</div>
</div>
