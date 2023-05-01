<script>
	import { FirebaseApp, User, firestore, auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
	//const user = userStore(auth);
</script>

<FirebaseApp {auth} {firestore}>
	<User let:user>
		Hello {user.displayName}

		<div slot="signedOut">
			<button on:click={() => signInWithPopup(auth, provider)}>Sign in</button>
		</div>
	</User>
</FirebaseApp>
