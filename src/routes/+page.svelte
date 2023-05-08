<script lang="ts">
	import NotificationCard from '$lib/components/NotificationCard.svelte';
	import { auth, collectionStore, docStore, firestore, userStore } from '$lib/firebase';
	import { Avatar } from '@skeletonlabs/skeleton';
	import logo_shocked from '$lib/assets/vectors/logo_shocked.svg';

	import logo from '$lib/assets/vectors/logo_smile.svg';

	import { AndroidFill, MenuAddLine, PlantLine, WindowsFill } from 'svelte-remixicon';
	import type { Notification } from '$lib/types';

	const user = userStore(auth);
	const stats = docStore(firestore, `users/${$user?.uid}`);
	const notifications = collectionStore<Notification>(
		firestore,
		`users/${$user?.uid}/notifications`
	);
</script>

<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<div class="flex gap-10 flex-col lg:flex-row">
		<div class="w-full flex flex-col gap-6 justify-center">
			<div class="flex justify-center">
				<div class="flex flex-row gap-4 items-center">
					<img alt="Plant Tracker logo" src={logo} class="h-32 w-32 md:h-48 md:w-48" />
					<div class="flex flex-col">
						<h1 class="text-4xl font-bold">
							<span
								class="bg-gradient-to-br from-teal-300 to-cyan-600 bg-clip-text text-transparent box-decoration-clone"
								>Plant Tracker</span
							>
						</h1>
						<span>Cultivate companion</span>
					</div>
				</div>
			</div>
			<div class="flex gap-5 items-center">
				<Avatar src={$user?.photoURL} width="w-24" rounded="rounded-full" />
				<div class="flex flex-col">
					<h1>Hello,</h1>
					<h3>{$user?.displayName}</h3>
				</div>
			</div>
			<h2>Statistics</h2>
			<div class="logo-cloud grid-cols-1 sm:grid-cols-2 gap-1">
				<div class="logo-item">
					<PlantLine class="h-10 w-10" />
					<h3>Plants:</h3>
					<h3>{$stats?.total_plants ?? 0}</h3>
				</div>
				<div class="logo-item">
					<MenuAddLine class="h-10 w-10" />
					<h3>Tasks:</h3>
					<h3>{$stats?.total_tasks ?? 0}</h3>
				</div>
			</div>
		</div>
		<div class="w-full flex flex-col gap-3">
			<h2>Notifications</h2>
			<div class="flex flex-col justify-center gap-3">
				<div class="card flex flex-row p-4 gap-2">
					<img alt="Smiling Planti" src={logo_shocked} class="w-16 h-16" />
					<div class="flex flex-col gap-2 w-full">
						<h4>Don't want to miss any notifications?</h4>
						<div class="flex flex-col gap-2">
							<a
								href="https://github.com/plant-tracker/mobile"
								target="_blank"
								class="btn variant-filled-primary"
							>
								<AndroidFill class="h-6 w-6" />
								<span>Android App</span>
							</a>
							<a
								href="https://github.com/plant-tracker/desktop"
								class="btn variant-filled-tertiary"
								target="_blank"
							>
								<WindowsFill class="h-6 w-6" />
								<span>Windows App</span>
							</a>
						</div>
					</div>
				</div>

				{#if $notifications}
					{#each $notifications as notification}
						<NotificationCard {notification} />
					{/each}
				{:else}
					<p>No new notifications</p>
				{/if}
			</div>
		</div>
	</div>
</div>
