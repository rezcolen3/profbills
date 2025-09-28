import { writable } from 'svelte/store';

export var currentEditingList = writable(null);
export var Lists = writable([
	{
		name: 'Example Grocery',
		dateCreated: '',
        items: [
            {
                name: "Bananas",
                costPerItem: 10,
                Quantity: 12,
                discoutPercent: 10
            },
            {
                name: "Milk",
                costPerItem: 60,
                Quantity: 2,
                discoutPercent: 30
            },
        ]
	}
]);

