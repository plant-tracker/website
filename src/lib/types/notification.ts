import type { Timestamp } from 'firebase/firestore';

export interface Notification {
	id: string;
	title: string;
	body: string;
	type: string;
	createdAt: Timestamp;
}
