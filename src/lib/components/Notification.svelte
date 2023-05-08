<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, collectionStore, firestore, userStore } from '$lib/firebase';
	import { showToast } from '$lib/toastWrapper';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	const user = userStore(auth);
	const notifications = collectionStore(firestore, `users/${$user?.uid}/notifications`);

	const enableNotifications: Writable<boolean> = localStorageStore('enableNotifications', true);

	onMount(() => {
		if ($enableNotifications) {
			notifications.subscribe((n) => {
				if (n.length > 0) {
					showToast('You have new notifications.', 'success', {
						action: {
							label: 'Check them out',
							response: () => goto('/')
						}
					});
				}
			});
		}
	});
</script>
