import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const summary = data.get('summary') as string;
		const issue = data.get('issue') as string;
		const problemStatement = data.get('problem-statement') as string;
		const url = data.get('tenant-url') as string;
		const stack = data.get('tenant-stack') as string;
		const mobileApp = data.get('mobile-app') as string;
		const mobileInfo = data.get('mobile-info') as string;
		const appInfo = data.get('app-info') as string;
		const integrations = data.get('integrations') as string;
		const integrationsInfo = data.get('integrations-info') as string;
		const impactedUsers = data.get('impacted-users') as string;
		const numberAffected = data.get('number-affected') as string;
		const customersAffected = data.get('customers-affected') as string;
		const otherEvent = data.get('other-event') as string;
		const otherCustomers = data.get('other-customers') as string;
		const additionalScope = data.get('addtl-scope') as string;
		const stepsToReproduce = data.get('steps-to-reproduce') as string;
		// const businessImpact = data.get('business-impact') as string;
		// const workaroundAvailable = data.get('workaround-available') as string;
		// const workaround = data.get('workaround') as string;

		return {
			summary,
			issue,
			problemStatement,
			url,
			stack,
			mobileApp,
			mobileInfo,
			appInfo,
			integrations,
			integrationsInfo,
			impactedUsers,
			numberAffected,
			customersAffected,
			otherEvent,
			otherCustomers,
			additionalScope,
			stepsToReproduce,
			// businessImpact,
			// workaroundAvailable,
			// workaround,
			success: true
		};
	}
};
