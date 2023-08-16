// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lastModified: Date;
		}
		interface PageData {
			regionText: string;
		}
		// interface Platform {}
	}
}

export {};
