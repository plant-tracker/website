<script>
	import { auth, docStore, firestore, userStore } from '$lib/firebase';

	const user = userStore(auth);
	const stats = docStore(firestore, `users/${$user?.uid}`);
</script>

Hello {$user?.displayName}
{$stats?.total_plants ?? 0}
{$stats?.total_tasks ?? 0}
