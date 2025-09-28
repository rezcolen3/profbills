<script>
	import EditList from './EditList.svelte';
	import Nav from './nav.svelte';
	import { currentEditingList } from './store';
	import ViewLists from './viewLists.svelte';
</script>

<div class="w-100 flex h-full gap-4 flex-col bg-white p-2">
	<Nav />
    
    <div class="h-full flex flex-col gap-2 overflow-y-auto">
        {#if $currentEditingList == null}
		<ViewLists />
	{:else}
		<EditList />
	{/if}
    </div>
</div>
