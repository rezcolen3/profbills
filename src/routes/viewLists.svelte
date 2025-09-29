<script>
	import { Lists, currentEditingList } from './store';

	function calculateTotal(items) {
		let total = 0;

		for (let item of items) {
			let discount = item.costPerItem * item.Quantity * (item.discountPercent / 100);
			let finalCost = item.costPerItem * item.Quantity - discount;
			total += finalCost;
		}

		return total;
	}
</script>

<span class="text-4xl">View Bills: </span>

{#each $Lists as list, i}
	<div class="flex h-fit w-full flex-col rounded border-2 border-gray-400 p-1">
		<span class="text-xl"><span class="bitfont text-gray-500">Bill Name:</span> {list.name}</span>
		<span><span class="bitfont text-gray-500">Date Created:</span> {list.dateCreated}</span>
		<span><span class="bitfont text-gray-500">No. of items:</span> {list.items.length}</span>
		<span><span class="bitfont text-gray-500">Total:</span> ₹{calculateTotal(list.items)}</span>
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
					items: [
						{
							name: 'New Item',
							costPerItem: 0,
							Quantity: 0,
							discountPercent: 0
						}
					]
				});
				return lists;
			});
			currentEditingList.set($Lists.length - 1);
		}}
		class="w-full cursor-pointer rounded bg-gray-300 transition hover:bg-gray-500 hover:text-white"
	>
		New Bill
	</button>
</div>
