import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const issueSummary = data.get('issue-summary') as string;
		const issueDetails = data.get('issue-details') as string;
		const problem = data.get('problem') as string;
		const expectedResult = data.get('expected-result') as string;
		const additionalInformation = data.get('additional-information') as string;
		const troubleshootingPerformed = data.get('troubleshooting-performed') as string;
		const url = data.get('tenant-url') as string;
		const stack = data.get('tenant-stack') as string;
		const reportName = data.get('report-name') as string;
		const reportRequirements = data.get('report-requirements') as string;
		const reportType = data.get('report-type') as string;
		const projectFilesAttached = data.get('project-files-attached') as string;
		const rdoTypes = data.getAll('rdo-types-used');
		const whoDevelopedReport = data.get('who-created-report') as string;
		const professionalServicesDeveloper = data.get('professional-services-developer') as string;
		const reportedBy = data.get('reported-by') as string;
		const stepsToReproduce = data.get('steps-to-reproduce') as string;
		const businessImpact = data.get('business-impact') as string;

		const formattedRdoTypes = rdoTypes.join(', ');

		return {
			issueSummary,
			issueDetails,
			problem,
			expectedResult,
			additionalInformation,
			troubleshootingPerformed,
			url,
			stack,
			reportName,
			reportRequirements,
			reportType,
			projectFilesAttached,
			formattedRdoTypes,
			whoDevelopedReport,
			professionalServicesDeveloper,
			reportedBy,
			stepsToReproduce,
			businessImpact,
			success: true
		};
	}
};
