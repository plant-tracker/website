<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import {
		AppShell,
		AppRail,
		AppRailTile,
		LightSwitch,
		Toast,
		Modal
	} from '@skeletonlabs/skeleton';
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
	import logo from '$lib/assets/icons/logo.png';
	import logo_smile from '$lib/assets/vectors/logo_smile.svg';
	import { userStore, auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { storeCurrentUrl } from '$lib/stores/stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import PlantiLoading from '$lib/components/PlantiLoading.svelte';

	const user = userStore(auth);

	onMount(() => {
		storeCurrentUrl.set($page.url.pathname);
	});
</script>

<Toast />
<Modal />
{#if $user}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
			<AppRail selected={storeCurrentUrl}>
				<img alt="Plant Tracker logo" src={logo_smile} slot="lead" />
				<AppRailTile tag="a" href="/" label="Home" value={'/'}><Icon src={Home3Line} /></AppRailTile
				>
				<AppRailTile tag="a" href="/plants" label="Plants" value={'/plants'}
					><Icon src={PlantLine} /></AppRailTile
				>
				<AppRailTile tag="a" href="/plants/add" label="Add plant" value={'/plants/add'}
					><Icon src={AddBoxLine} /></AppRailTile
				>

				<svelte:fragment slot="trail">
					<div class="flex justify-center items-center w-full aspect-square space-y-1.5">
						<LightSwitch />
					</div>
					<AppRailTile tag="a" href="/settings" label="Settings" value={'/settings'}
						><Icon src={Settings2Line} /></AppRailTile
					>
					<AppRailTile label="Logout" on:click={() => signOut(auth)}
						><Icon src={LogoutBoxLine} /></AppRailTile
					>
				</svelte:fragment>
			</AppRail></svelte:fragment
		>

		<slot />
	</AppShell>
{:else}
	<div class="container h-full mx-auto flex flex-col gap-8 justify-center items-center">
		{#if $user === undefined}
			<PlantiLoading />
		{:else}
			<div class="flex flex-row gap-4 items-center">
				<img alt="Plant Tracker logo" src={logo} class="h-32 w-32 md:h-48 md:w-48" />
				<h1 class="text-4xl font-bold">Plant Tracker</h1>
			</div>
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
		<LightSwitch class="hidden" />
	</div>
{/if}
