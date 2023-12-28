// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			done?: boolean;
			loading?: boolean;
			result?: ActionResult<
				Record<string, unknown> | undefined,
				Record<string, unknown> | undefined
			>;
		}
		// interface Platform {}
	}
}

export {};
