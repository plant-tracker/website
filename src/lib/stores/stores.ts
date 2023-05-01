import { writable, type Writable } from 'svelte/store';

export const storeCurrentUrl: Writable<string | undefined> = writable(undefined);

export function setCurrentUrl(pathname: string) {
	if (pathname.startsWith('/plants/add')) {
		storeCurrentUrl.set(pathname);
	} else {
		const segments = pathname.split('/');
		storeCurrentUrl.set('/' + segments[1]);
	}
}

storeCurrentUrl.subscribe((newUrl) => {
	setCurrentUrl(newUrl || '/');
});
