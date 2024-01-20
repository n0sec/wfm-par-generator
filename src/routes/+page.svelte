<script lang="ts">
	import { enhance } from '$app/forms';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	import CopyToCliboard from '$lib/components/CopyToCliboard.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import TextAreaInput from '$lib/components/TextAreaInput.svelte';
	import RadioInput from '$lib/components/RadioInput.svelte';
	import CheckboxInput from '$lib/components/CheckboxInput.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import icon from '$lib/images/problems.png';
	import { quintOut } from 'svelte/easing';

	export let form: ActionData = null;

	let whoCreatedReport: string;
	let reportType: string;

	let loading: boolean = false;
	let jiraDescriptionSection: HTMLElement;
	let stepsToReproduceSection: HTMLElement;
	let issueSummarySection: HTMLElement;

	$: console.log(whoCreatedReport);
</script>

{#if !$page.state.done}
	<article>
		<h1 class="text-center">
			<img src={icon} alt="test" class="inline w-10 h-10" /> Pre-PAR Form for Custom & Custom
			Read-Only Reports
			<img src={icon} alt="test" class="inline w-10 h-10" />
		</h1>

		<div class="divider"></div>

		<section id="instructions">
			<h2>Instructions</h2>
			<p>
				This PAR form should be used for cases that involve a Custom or Custom Read-Only report
				where the issue is within the report and not external to the report such as in the
				application.
			</p>
			<p class="mt-2">You may want to use this form if:</p>
			<ul>
				<li>A report is not returning data as expected</li>
				<li>A report is not returning data at all</li>
				<li>A report is returning an unknown error</li>
				<li>A report is failing for an otherwise unspecified or unknown reason</li>
				<li>A report now works differently or not at all where it used to</li>
			</ul>
			<p>
				Complete the form on this page, including as much detail as possible. Once all required
				fields are completed, press the "Generate" button at the bottom of the page. This will
				generate a template that you can copy and paste into the JIRA PAR form.
			</p>
			<p></p>
			<Alert
				type="warning"
				message="Support must, to the best of their ability, perform enough troubleshooting that demonstrates they attempted to determine the root cause but are unable to do so and are unsure whether the root cause is within the application or report design. If the case is opened by a Professional Services Consultant and a PAR is being opened on their behalf, the troubleshooting performed must show both parties attempted to identify the root cause of the issue and were unable to do so. PARs submitted using this form should be used as a last resort and only when the root cause of the issue is unknown and further troubleshooting will not lead to an answer."
			/>
		</section>

		<div class="divider"></div>

		<!-- Start PAR Form -->
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ result, update }) => {
					pushState('', {
						done: true,
						loading: false,
						result
					});
					update();
				};
			}}
		>
			<h2>Section I: Issue Summary</h2>
			<section id="issue-summary" class="border border-neutral p-4">
				<p>
					Provide a brief summary of the issue. This will be used as the title of the JIRA defect
					and should be concise and descriptive of the issue.
				</p>

				<!-- Issue Summary -->
				<TextInput
					labelText="Issue Summary"
					placeholderText="Enter a summary"
					isRequired={true}
					id="issue-summary"
					name="issue-summary"
				/>
			</section>

			<h2>Section II: JIRA Description</h2>
			<section id="jira-description" class="border border-neutral p-4">
				<h3>A. Issue Details</h3>
				<p>
					Has this ever worked? If <em>Yes</em>, what change or event seemed to be what started this
					problem?
				</p>

				<!-- A. Issue Details -->
				<!-- ! Might need more options after reviewing with Engineering/Mgmt -->
				<SelectInput
					labelText="Issue Details"
					isRequired={true}
					id="issue-details"
					name="issue-details"
				>
					<option
						>Yes, this has worked in the past, but there are no clues reported or discovered to
						clearly define what started the issue so Support is reporting the origin as 'uncertain'
						and is requesting assistance in identifying the root cause</option
					>
					<option
						>Yes, this has worked until a recent update caused the report to stop working as
						originally designed (i.e. errors, lack of data).
					</option>
					<option
						>No, this has not worked since the report was developed by the customer or Professional
						Services and Support nor Professional Services can identify the origin of the issue and
						is requesting assistance in identifying the root cause</option
					>
				</SelectInput>

				<!-- Problem -->
				<TextInput
					labelText="Problem"
					placeholderText="WFD xx.xx.xx - Description"
					isRequired={true}
					id="problem"
					name="problem"
				/>

				<!-- Expected Result -->
				<TextInput
					labelText="Expected Result"
					placeholderText="The report should..."
					isRequired={true}
					id="expected-result"
					name="expected-result"
				/>

				<!-- Additional Information -->
				<TextAreaInput
					labelText="Additional Information"
					placeholderText="Provide any additional information that may be helpful in troubleshooting this issue"
					numRows={5}
					isRequired={false}
					id="additional-information"
					name="additional-information"
				/>

				<!-- Troubleshooting Performed -->
				<TextAreaInput
					labelText="Troubleshooting Performed"
					placeholderText="Provide a comprehensive list of the troubleshooting steps performed to date. Please be detailed and specific."
					numRows={10}
					isRequired={false}
					id="troubleshooting-performed"
					name="troubleshooting-performed"
				/>

				<!-- B. Tenant Information -->
				<h3>B. Tenant Information</h3>

				<!-- Tenant URL -->
				<TextInput
					labelText="Tenant URL"
					placeholderText="https://tenant-name.prd.mykronos.com"
					isRequired={true}
					id="tenant-url"
					name="tenant-url"
				/>

				<!-- Tenant Stack -->
				<SelectInput
					labelText="Tenant Stack"
					isRequired={true}
					id="tenant-stack"
					name="tenant-stack"
				>
					<option>NAM PRD</option>
					<option>NAM NPR</option>
					<option>CFN</option>
					<option>APAC PRD/NPR</option>
					<option>CAN PRD/NPR</option>
					<option>EMEA PRD/NPR</option>
				</SelectInput>

				<!-- C. Report Information -->
				<h3>C. Report Information</h3>

				<!-- Report Name -->
				<TextInput
					labelText="Report Name"
					placeholderText="Report Name"
					isRequired={true}
					id="report-name"
					name="report-name"
				/>

				<!-- Report Requirements -->
				<TextAreaInput
					labelText="Report Requirements"
					placeholderText="Describe what the report requirements are and what the report is supposed to do. This should be a detailed description of the report and what it is supposed to do. This should not restate the 'Expected Result' from above."
					numRows={5}
					isRequired={true}
					id="report-requirements"
					name="report-requirements"
				/>

				<!-- Report Type -->
				<RadioInput
					labelText="Report Type"
					labelFor="report-type"
					name="report-type"
					bind:groupValue={reportType}
					options={[
						{
							value: 'custom',
							label: 'Custom'
						},
						{
							value: 'custom read-only',
							label: 'Custom Read-Only'
						}
					]}
				/>

				{#if reportType === 'Custom Read-Only'}
					<!-- Custom Read-Only -->
					<div class="mt-0 mb-2 ml-8 md:w-1/5">
						<RadioInput
							labelText="BIRT Project Files Attached"
							labelFor="project-files-attached"
							name="project-files-attached"
							options={[
								{
									value: 'yes',
									label: 'Yes'
								},
								{
									value: 'no',
									label: 'No'
								}
							]}
						/>
					</div>
				{/if}

				<!-- RDO Types Used -->
				<CheckboxInput
					labelText="What RDO types are used in the report?"
					labelFor="rdo-types-used"
					name="rdo-types-used"
					options={[
						{
							value: 'employee',
							label: 'Employee'
						},
						{
							value: 'business structure',
							label: 'Business Structure'
						},
						{
							value: 'employee time series',
							label: 'Employee Time Series'
						},
						{
							value: 'business structure time series',
							label: 'Business Structure Time Series'
						}
					]}
				/>

				<!-- Who developed the report -->
				<RadioInput
					labelText="Who developed this report?"
					labelFor="who-created-report"
					name="who-created-report"
					bind:groupValue={whoCreatedReport}
					options={[
						{
							value: 'customer',
							label: 'Customer'
						},
						{
							value: 'professional-services',
							label: 'Professional Services'
						}
					]}
				/>

				<!-- Name of Report Developer from PS -->
				{#if whoCreatedReport === 'Professional Services'}
					<!-- Professional Services Developer -->
					<div class="mt-0 mb-2 ml-8 md:w-1/5">
						<TextInput
							labelText="Professional Services Developer"
							placeholderText="Professional Services Developer"
							isRequired={true}
							id="professional-services-developer"
							name="professional-services-developer"
						/>
					</div>
				{/if}

				<!-- Who is reporting the issue -->
				<RadioInput
					labelText="Who is reporting the issue?"
					labelFor="reported-by"
					name="reported-by"
					options={[
						{
							value: 'customer-reported',
							label: 'Customer'
						},
						{
							value: 'professional-services-reported',
							label: 'Professional Services'
						}
					]}
				/>

				<!-- D. Steps to Reproduce -->
				<h3>D. Steps to Reproduce</h3>

				<!-- Reproducibility -->
				<!-- <SelectInput
					labelText="Reproducibility"
					isRequired={true}
					id="reproducibility"
					name="reproducibility"
				>
					<option
						>The issue reported is specific to this customer, tenant, and report, and therefore
						cannot be reproduced anywhere else</option
					>
					<option>The issue reported is specific to this customer</option>
				</SelectInput> -->

				<!-- Steps to Reproduce -->
				<TextAreaInput
					labelText="Steps to Reproduce"
					placeholderText="If there is an issue with the report that can be reproduced by Support, please provide the steps to reproduce the issue. Provide numbered, detailed steps to reproduce the issue. If the issue is within BIRT Designer, please work with the Professional Services Consultant to obtain the exact steps to reproduce."
					numRows={15}
					isRequired={true}
					id="steps-to-reproduce"
					name="steps-to-reproduce"
				/>

				<h3>E. Business Impact</h3>
				<TextInput
					labelText="Business Impact"
					placeholderText="Business Impact"
					isRequired={true}
					id="business-impact"
					name="business-impact"
				/>
			</section>

			<div class="flex justify-center">
				<button
					type="submit"
					name="submit"
					class="btn btn-primary rounded-md w-1/4 min-w-1/2 max-w-1/4"
				>
					{#if !loading && !$page.state.done}
						Generate
					{:else}
						<span class="loading loading-spinner" style="font-size: inherit;" />
					{/if}
				</button>
			</div>
		</form>
	</article>
{/if}

{#if $page.state.done}
	<article>
		<h1 class="text-center">Custom Reporting PAR Template</h1>
		<div class="divider"></div>

		<section id="instructions">
			<h2>Instructions</h2>
			<p>
				Copy the generated template below into the JIRA PAR form. Use the "copy to clipboard"
				buttons on the right side of each section to copy that section to the clipboard for easier
				pasting into the JIRA Form.
			</p>
			{#if form?.projectFilesAttached}
				<Alert
					type="error"
					message="Do not forget to attach the BIRT project files to the JIRA PAR form."
				/>
			{/if}
		</section>

		<!-- Issue Summary -->
		<section id="issue-summary" bind:this={issueSummarySection}>
			<div class="content-hero bg-accent text-primary-content text-center p-4">
				<h2>Issue Summary</h2>
			</div>

			<div class="relative mt-4">
				<p>{form?.issueSummary}</p>
			</div>
		</section>

		<!-- JIRA Description -->
		<section id="description" bind:this={jiraDescriptionSection}>
			<div class="content-hero bg-primary text-primary-content text-center p-4">
				<h2>JIRA Description</h2>
			</div>

			<div class="relative mt-4">
				<CopyToCliboard elementToCopy={jiraDescriptionSection} />

				<!-- Problem -->
				<h3>Problem</h3>
				<p class="mt-4">{form?.problem}</p>

				<!-- Expected Result -->
				<h3>Expected Result</h3>
				<p class="mt-4">{form?.expectedResult}</p>

				<!-- Additional Information -->
				<h3>Additional Information</h3>
				<p class="mt-4 whitespace-pre-line">{form?.additionalInformation}</p>

				<!-- Troubleshooting Performed -->
				<h3>Troubleshooting Performed</h3>
				<p class="mt-4 whitespace-pre-line">{form?.troubleshootingPerformed}</p>

				<!-- Suspected Problem Origin -->
				<h3>Suspected Problem Origin</h3>
				<p class="mt-4">{form?.issueDetails}</p>

				<!-- Tenant Information -->
				<h3>Tenant Information</h3>
				<p>
					<strong>Tenant URL:</strong>
					{form?.url}
				</p>
				<p>
					<strong>Tenant Stack:</strong>
					{form?.stack}
				</p>

				<!-- Report Information -->
				<h3>Report Information</h3>
				<p>
					<strong>Report Name:</strong>
					{form?.reportName}
				</p>
				<p>
					<strong>Report Requirements:</strong>
					{form?.reportRequirements}
				</p>
				<p>
					<strong>Report Type:</strong>
					{form?.reportType}
				</p>
				{#if form?.projectFilesAttached}
					<p>
						<strong>BIRT Project Files Attached:</strong>
						{form?.projectFilesAttached}
					</p>
				{/if}
				<p>
					<strong>RDO Types Used:</strong>
					{form?.formattedRdoTypes}
				</p>
				<p>
					<strong>Who Developed the Report:</strong>
					{form?.whoDevelopedReport}
				</p>
				{#if form?.professionalServicesDeveloper}
					<p>
						<strong>Professional Services Developer:</strong>
						{form?.professionalServicesDeveloper}
					</p>
				{/if}
				<p>
					<strong>Who is Reporting the Issue:</strong>
					{form?.reportedBy}
				</p>
			</div>
		</section>

		<!-- Steps to Repro -->
		<section id="steps-to-reproduce" bind:this={stepsToReproduceSection}>
			<div class="content-hero bg-secondary text-secondary-content text-center p-4">
				<h2>JIRA Steps to Reproduce</h2>
			</div>

			<div class="relative mt-4">
				<CopyToCliboard elementToCopy={stepsToReproduceSection} />
				<p class="whitespace-pre-line">{form?.stepsToReproduce}</p>
			</div>
		</section>
	</article>
{/if}
