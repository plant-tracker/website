<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppRail, AppRailTile, LightSwitch } from '@skeletonlabs/skeleton';
	import {
		Home3Line,
		PlantLine,
		AddBoxLine,
		Settings2Line,
		LogoutBoxLine,
		GoogleFill,
		AndroidFill
	} from 'svelte-remixicon';
	import Icon from '$lib/components/AppRailIcon.svelte';
	import { writable, type Writable } from 'svelte/store';
	import logo from '$lib/assets/icons/logo.png';
	import { userStore } from '$lib/firebase';
	import { auth } from '$lib/firebase/init';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	const storeValue: Writable<number> = writable(0);
	const user = userStore(auth);
</script>

{#if $user}
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
					<AppRailTile label="Logout" on:click={() => signOut(auth)} value={4}
						><Icon src={LogoutBoxLine} /></AppRailTile
					>
				</svelte:fragment>
			</AppRail></svelte:fragment
		>

		<slot />
	</AppShell>
{:else}
	<div class="container h-full mx-auto flex flex-col gap-8 justify-center items-center">
		<div class="flex flex-row gap-4 items-center">
			<img alt="Plant Tracker logo" src={logo} class="h-32 w-32 md:h-48 md:w-48" />
			<h1 class="text-4xl font-bold">Plant Tracker</h1>
		</div>
		{#if $user !== undefined}
			<button
				type="button"
				on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}
				class="btn btn-lg variant-filled"
			>
				<span><GoogleFill /></span>
				<span>Login with Google</span>
			</button>
			<span>or</span>
			<a
				href="https://github.com/plant-tracker/mobile/releases"
				target="_blank"
				class="btn btn-lg variant-filled"
			>
				<span><AndroidFill /></span>
				<span>Download Android app</span>
			</a>
		{/if}
	</div>
{/if}
