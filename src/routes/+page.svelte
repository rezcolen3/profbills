<script>
	import { onMount } from 'svelte';
	import EditList from './EditList.svelte';
	import Nav from './nav.svelte';
	import { currentEditingList, Lists } from './store';
	import ViewLists from './viewLists.svelte';

	$inspect($Lists);

	onMount(() => {
		Lists.set(
			JSON.parse(localStorage.getItem('lists')) || [
				{
					name: 'Example Grocery Bill',
					dateCreated: new Date().toLocaleDateString(),
					items: [
						{
							name: 'Bananas',
							costPerItem: 10,
							Quantity: 12,
							discountPercent: 10
						},
						{
							name: 'Milk',
							costPerItem: 60,
							Quantity: 2,
							discountPercent: 30
						}
					]
				}
			]
		);

		Lists.subscribe((value) => {
			localStorage.setItem('lists', JSON.stringify(value));
		});
	});
</script>

<div class="aspect-9/19 flex h-full flex-col gap-4 bg-white p-2">
	<Nav />

	<div class="flex h-full flex-col gap-2 overflow-y-auto">
		{#if $currentEditingList == null}
			<ViewLists />
		{:else}
			<EditList />
		{/if}
	</div>
</div>
