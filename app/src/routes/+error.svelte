<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<div>
	<h3>Here's some debug info:</h3>
	{$page.error?.path}
	{$page.error?.pwd}
</div>
