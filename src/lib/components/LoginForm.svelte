<script lang="ts">
	import logo from '$lib/assets/icons/logo.png';
	import { auth } from '$lib/firebase';
	import {
		GoogleAuthProvider,
		createUserWithEmailAndPassword,
		signInWithPopup,
		signOut
	} from 'firebase/auth';
	import { GoogleFill, AndroidFill, LoginBoxLine, WindowsFill } from 'svelte-remixicon';
	import TextInput from './form/fields/TextInput.svelte';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { showToast } from '$lib/toastWrapper';
	import { PasswordValidator } from './form/validators/password';
	import { EmailValidator } from './form/validators/email';

	let email: string;
	let password: string;

	function loginWithEmail() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				if (error.code === 'auth/user-not-found') {
					createUserWithEmailAndPassword(auth, email, password)
						.then((userCredential) => {
							const user = userCredential.user;
						})
						.catch((error) => {
							showToast(error.message, 'error');
						});
				} else {
					showToast(error.message, 'error');
				}
			});
	}
</script>

<div class="flex flex-row gap-4 items-center">
	<img alt="Plant Tracker logo" src={logo} class="h-32 w-32 md:h-48 md:w-48" />
	<h1 class="text-4xl font-bold">
		<span
			class="bg-gradient-to-br from-teal-300 to-cyan-600 bg-clip-text text-transparent box-decoration-clone"
			>Plant Tracker</span
		>
	</h1>
</div>

<div class="card flex flex-col p-10 gap-8 mx-8">
	<button
		type="button"
		on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}
		class="btn btn-lg variant-filled"
	>
		<span><GoogleFill /></span>
		<span>Use Google Account</span>
	</button>
	<div class="flex items-center">
		<div class="border-t w-full" />
		<span class="px-2">or</span>
		<div class="border-t w-full" />
	</div>
	<div class="flex flex-col gap-5">
		<TextInput
			label="Email"
			type="email"
			validators={[new EmailValidator()]}
			bind:value={email}
			placeholder="Enter your email"
		/>
		<TextInput
			label="Password"
			type="password"
			validators={[new PasswordValidator()]}
			bind:value={password}
			placeholder="Enter your password"
		/>
		<div class="flex flex-col gap-2 items-center">
			<button type="button" on:click={loginWithEmail} class="btn btn-lg variant-filled w-full">
				<span><LoginBoxLine /></span>
				<span>Log In</span>
			</button>
			<span class="text-primary text-sm">Your account will be created automatically.</span>
		</div>
	</div>
	<div class="flex gap-3 flex-wrap items-center justify-center">
		<a
			href="https://github.com/plant-tracker/mobile"
			target="_blank"
			class="btn variant-filled-primary"
		>
			<span><AndroidFill /></span>
			<span>Get Android app</span>
		</a>
		<a
			href="https://github.com/plant-tracker/desktop"
			target="_blank"
			class="btn variant-filled-tertiary"
		>
			<span><WindowsFill /></span>
			<span>Get Windows app</span>
		</a>
	</div>
</div>
