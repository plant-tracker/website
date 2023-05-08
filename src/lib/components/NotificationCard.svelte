<script lang="ts">
	import { taskTypes } from '$lib/types/taskTypes';
	import { DeleteBinLine, SparklingLine } from 'svelte-remixicon';
	import type { Notification } from '$lib/types';
	import { deleteDoc, doc } from 'firebase/firestore';
	import { auth, firestore, userStore } from '$lib/firebase';

	export let notification: Notification;

	const user = userStore(auth);
	const icon = taskTypes.find((t) => t.value === notification.type)?.icon || SparklingLine;

	async function removeNotification() {
		await deleteDoc(doc(firestore, `users/${$user?.uid}/notifications/${notification.id}`));
	}
</script>

<div class="card flex flex-row p-3 gap-3 items-center w-full">
	<svelte:component this={icon} class="h-16 w-16" />
	<div class="flex flex-col gap-2 w-full">
		<h2>{notification.body}</h2>
		<span>
			{notification.title}
		</span>
	</div>
	<div class="flex justify-end">
		<button class="btn btn-primary" on:click={removeNotification}
			><DeleteBinLine class="h-8 w-8" /></button
		>
	</div>
</div>
