<script>
	import { Lists, currentEditingList } from './store';

	function calculateItemTotal(item) {
		let discount = item.costPerItem * item.Quantity * (item.discountPercent / 100);
		let finalCost = item.costPerItem * item.Quantity - discount;

		return finalCost;
	}

	function calculateTotal(items) {
		let total = 0;

		for (let item of items) {
			total += calculateItemTotal(item);
		}

		return total;
	}
</script>

<span class="text-4xl">Bill {$Lists[$currentEditingList].name}: </span>

<div class="flex justify-between">
	<label for="BillName">
		<span class="text-gray-700">Bill Name:</span>
		<input
			type="text"
			id="BillName"
			class="border-1 rounded border-gray-500 px-2"
			bind:value={$Lists[$currentEditingList].name}
		/>
	</label>

	<button
		class="hover:scale-120 cursor-pointer transition"
		on:click={() => {
			if (
				confirm(`Are you sure you want to delete the bill: ${$Lists[$currentEditingList].name}?`)
			) {
				Lists.update((lists) => {
					currentEditingList.set(null);
					lists.splice($currentEditingList, 1);
					return lists;
				});
			}
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#999999"
			><path
				d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
			/>
		</svg>
	</button>
</div>

{#each $Lists[$currentEditingList].items as item, i}
	<div class="flex h-fit w-full flex-col gap-1 rounded border-2 border-gray-400 p-1">
		<label>
			<span class="bitfont text-gray-500">Item Name:</span>
			<input type="text" class="border-1 rounded border-gray-500 px-2" bind:value={item.name} />
		</label>

		<label>
			<span class="bitfont text-gray-500">Cost:</span>
			<input
				type="number"
				min="0"
				class="border-1 rounded border-gray-500 px-2"
				bind:value={item.costPerItem}
			/>
		</label>

		<label>
			<span class="bitfont text-gray-500">Quantity:</span>
			<input
				type="number"
				class="border-1 rounded border-gray-500 p-0 px-2"
				min="0"
				bind:value={item.Quantity}
			/>
		</label>

		<label>
			<span class="bitfont text-gray-500">Discount %:</span>
			<input
				type="number"
				class="border-1 rounded border-gray-500 p-0 px-2"
				min="0"
				max="100"
				bind:value={item.discountPercent}
				on:input={(e) => {
					const val = +e.target.value;
					if (val > 100) e.target.value = 100;
					if (val < 0) e.target.value = 0;
					item.discountPercent = +e.target.value;
				}}
			/>
		</label>
		<div class="flex justify-between">
			<span><span class="bitfont text-gray-500">Total:</span> ₹{calculateItemTotal(item)}</span>
			<button
				class="hover:scale-120 cursor-pointer transition"
				on:click={() => {
					if (
						confirm(`Are you sure you want to delete ${$Lists[$currentEditingList].items[i].name}?`)
					) {
						Lists.update((lists) => {
							lists[$currentEditingList].items.splice(i, 1);
							return lists;
						});
					}
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#999999"
					><path
						d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
					/>
				</svg>
			</button>
		</div>
	</div>
{/each}

<div class="w-full p-1">
	<button
		on:click={() => {
			Lists.update((lists) => {
				lists[$currentEditingList].items.push({
					name: 'New Item',
					costPerItem: 0,
					Quantity: 1,
					discountPercent: 0
				});
				return lists;
			});
		}}
		class="w-full cursor-pointer rounded bg-gray-300 transition hover:bg-gray-500 hover:text-white"
	>
		New Item
	</button>
</div>

<div class="w-full p-1 text-center text-4xl">
	Total: ₹{calculateTotal($Lists[$currentEditingList].items)}
</div>
