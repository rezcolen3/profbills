<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex justify-center h-screen w-full bg-black">
	<span class="text-white"></span>
	{@render children?.()}
</div>
