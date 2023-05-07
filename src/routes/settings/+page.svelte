<script lang="ts">
	import { AppBar, SlideToggle } from '@skeletonlabs/skeleton';
	import { DeleteBinLine, GithubFill, LogoutBoxLine, Settings2Line } from 'svelte-remixicon';
	import { getAuth, deleteUser, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { showToast } from '$lib/toastWrapper';
	import { auth } from '$lib/firebase';
	import type { Writable } from 'svelte/store';
	import { localStorageStore } from '@skeletonlabs/skeleton';

	const enableTipsStore: Writable<boolean> = localStorageStore('enableTips', true);
	const enableNotifications: Writable<boolean> = localStorageStore('enableNotifications', true);

	async function deleteAccount(): Promise<void> {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();

			const { user } = await signInWithPopup(auth, provider);

			if (user) {
				await deleteUser(user);
				showToast('Account deleted', 'success');
			} else {
				showToast('No user is currently signed in.', 'error');
			}
		} catch (error: any) {
			showToast(error.message, 'error');
		}
	}
</script>

<AppBar class="sticky top-0 z-30">
	<svelte:fragment slot="lead"><Settings2Line class="h-8 w-8 md:h-12 md:w-12" /></svelte:fragment>
	<h3>Settings</h3>
</AppBar>
<div class="container mx-auto max-w-screen-xl p-4 md:p-10">
	<div class="flex flex-row flex-wrap gap-8">
		<div class="flex flex-col flex-1 gap-3">
			<h3>General</h3>
			<div class="flex gap-3 items-center">
				<SlideToggle bind:checked={$enableTipsStore} name="slide" />
				<span>Enable helpful tips</span>
			</div>
			<div class="flex gap-3 items-center">
				<SlideToggle bind:checked={$enableNotifications} name="slide" />
				<span>Enable notifications</span>
			</div>
		</div>
		<div class="flex flex-col flex-1 gap-3">
			<h3>Actions</h3>
			<a href="https://github.com/plant-tracker/website/" target="_blank" class="btn variant-soft">
				<GithubFill class="w-6 h-6" />
				<span>View source code</span>
			</a>
			<button class="btn variant-soft" on:click={() => signOut(auth)}>
				<LogoutBoxLine class="w-6 h-6" />
				<span>Sign out</span>
			</button>
			<button class="btn variant-soft-error" on:click={deleteAccount}>
				<DeleteBinLine class="w-6 h-6" />
				<span>Delete account</span>
			</button>
		</div>
	</div>
</div>
