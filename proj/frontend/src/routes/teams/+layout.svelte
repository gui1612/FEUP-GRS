<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/';

	$: path = $page.url.pathname.split('/');
</script>

<div class="flex w-full justify-between">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{#each path as pathToken, i (`breadcrumb-${i}`)}
				{@const isLastToken = pathToken === path.at(-1)}
				{@const currentPath = path.slice(0, i + 1).join('/')}

				{#if !isLastToken}
					<Breadcrumb.Item>
						<Breadcrumb.Link href={currentPath || '/'} data-sveltekit-preload-data="tap"
							>{pathToken || '/'}</Breadcrumb.Link
						>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
				{:else}
					<Breadcrumb.Item>
						<Breadcrumb.Page>{pathToken}</Breadcrumb.Page>
					</Breadcrumb.Item>
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>
<div class="flex-1 py-10">
	<slot />
</div>
