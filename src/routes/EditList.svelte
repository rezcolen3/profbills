<script>
	import { Lists, currentEditingList } from './store';

	function calculateTotal(items) {
		let total = 0;

		for (let item of items) {
			let discount = item.costPerItem * item.Quantity * (item.discoutPercent / 100);
			let finalCost = item.costPerItem * item.Quantity - discount;
			total += finalCost;
		}

		return total;
	}
</script>

<span class="text-4xl">Bill {$Lists[$currentEditingList].name}: </span>

<label for="BillName">
	<span class="text-gray-700">Bill Name:</span>
	<input
		type="text"
		id="BillName"
		class="border-1 rounded border-gray-500 px-2"
		bind:value={$Lists[$currentEditingList].name}
	/>
</label>

{#each $Lists[$currentEditingList].item as item, i}
	<div class="flex h-fit w-full flex-col rounded border-2 border-gray-400 p-1">
		<span class="text-xl"><span class="bitfont text-gray-500">Bill Name:</span> {item.name}</span>
		<span><span class="bitfont text-gray-500">Date Created:</span> {item.dateCreated}</span>
		<span><span class="bitfont text-gray-500">No. of items:</span> {item.items.length}</span>
		<span><span class="bitfont text-gray-500">Total:</span> ₹{calculateTotal(item.items)}</span>
		<button
			on:click={() => currentEditingList.set(i)}
			class="cursor-pointer rounded bg-gray-300 transition hover:bg-gray-500 hover:text-white"
		>
			Open
		</button>
	</div>
{/each}

<div class="w-full p-1">
	<button
		on:click={() => {
			Lists.update((lists) => {
				lists.push({
					name: 'New Bill',
					dateCreated: new Date().toLocaleDateString(),
					items: []
				});
				return lists;
			});
			currentEditingList.set($Lists.length - 1);
		}}
		class="w-full cursor-pointer rounded bg-gray-300 transition hover:bg-gray-500 hover:text-white"
	>
		New Items
	</button>
</div>
