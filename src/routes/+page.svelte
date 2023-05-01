<script>
	import { FirebaseApp, User, firestore, auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
</script>

<FirebaseApp {auth} {firestore}>
	<User let:user>
		Hello {user.displayName}

		<div slot="signedOut">
			<button on:click={() => signInWithPopup(auth, provider)}>Sign in</button>
		</div>
	</User>
</FirebaseApp>
