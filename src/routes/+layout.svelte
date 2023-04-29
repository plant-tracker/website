<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppRail, AppRailTile, LightSwitch } from '@skeletonlabs/skeleton';
	import { Home3Line, PlantLine, AddBoxLine, Settings2Line, LogoutBoxLine } from 'svelte-remixicon';
	import Icon from '$lib/components/AppRailIcon.svelte';
	import { writable, type Writable } from 'svelte/store';
	import logo from '$lib/assets/icons/logo.png';

	const storeValue: Writable<number> = writable(0);
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue}>
			<img alt="Plant Tracker logo" src={logo} slot="lead" />
			<AppRailTile label="Home" value={0}><Icon src={Home3Line} /></AppRailTile>
			<AppRailTile label="Plants" value={1}><Icon src={PlantLine} /></AppRailTile>
			<AppRailTile label="Add plant" value={2}><Icon src={AddBoxLine} /></AppRailTile>

			<svelte:fragment slot="trail">
				<div class="flex justify-center items-center w-full aspect-square space-y-1.5">
					<LightSwitch />
				</div>
				<AppRailTile label="Settings" value={3}><Icon src={Settings2Line} /></AppRailTile>
				<AppRailTile label="Logout" value={4}><Icon src={LogoutBoxLine} /></AppRailTile>
			</svelte:fragment>
		</AppRail></svelte:fragment
	>

	<slot />
</AppShell>
