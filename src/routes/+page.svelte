<script lang="ts">
	import { enhance } from '$app/forms';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	import CopyToCliboard from '$lib/components/CopyToCliboard.svelte';

	export let form: ActionData = null;

	let loading: boolean = false;
	let jiraDescriptionSection: HTMLElement;
	let stepsToReproduceSection: HTMLElement;
	let issueSummarySection: HTMLElement;

	let issueSummary: string;
	let issueDetails: string;
	let tenantUrl: string;
	let tenantStack: string;
	let problemStatement: string = `Problem:
========
Delete this line and describe the issue here.

Expected Result:
================
Delete this line and describe the expected result or behavior here.

Additional Details:
===================
Delete these lines and add additional issue details below, such as log file snippets, product queries that cause performance
issues, and other details to support the problem description are helpful here.`;

	let isOtherEvent: string = '';
	let isOtherCustomers: string = '';
	let otherCustomers: string;
	let doesAffectMobile: string = '';
	let mobileInfo: string;
	let appInfo: string;
	let impactedUsers: string;
	let numberAffected: string;
	let otherEvent: string;
	let scope: string;
	let reproducibility: string;
	let stepsToReproduce: string;
	// let businessImpact: string;
	// let workaroundAvailable: string;
	// let workaround: string;
	let doesAffectIntegrations: string = '';
	let integrationsInfo: string;
</script>

{#if !$page.state.done}
	<article>
		<h1 class="text-center">Pre-PAR Form for Pro WFM Defects</h1>

		<div class="divider"></div>

		<section id="instructions">
			<h2>Instructions</h2>
			<p>
				A valid JIRA defect must be accurate and complete. Fill in the form below to generate
				content for your Pro WFM defect which will be reviewed by an Approver prior to promotion to
				the FLC
			</p>

			<ol>
				<li>
					Accurately complete all information in the form, then click the <strong>Generate</strong> button
				</li>
				<li>The application will redirect to a new page with your formatted output</li>
				<li>
					Copy and paste the text from the new page into the appropriate fields in either the
					Salesforce Case JIRA Form or in a new JIRA defect. For tips on choosing the right Severity
					in JIRA, click <a href="http://asgwebd/PARFORM/PARSeverityandPriorityLevels.html">here</a>
				</li>
				<li>
					Create a Salesforce subcase to <strong>Cloud.DBA</strong> for a schema dump to be provided.
				</li>
				<li>
					Create a Salesforce subcase for PAR review and dispatch to the proper Salesforce queue
				</li>
			</ol>
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
			<section id="issue-summary">
				<h2>Section I: Issue Summary/Title</h2>

				<p>Enter one concise sentence that summarizes the issue</p>
				<div role="alert" class="alert alert-warning p-2">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-4 h-4"
						><path
							d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575ZM8 5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5Zm1 6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
						></path></svg
					>
					<span>Do not use the Salesforce case title</span>
				</div>

				<!-- Issue Summary -->
				<div class="form-control">
					<label for="summary" class="form-control">
						<div class="label">
							<span class="label-text">Summary</span>
						</div>
						<input
							tabindex="0"
							type="text"
							name="summary"
							id="summary"
							bind:value={issueSummary}
							placeholder="Enter a summary"
							class="input input-sm input-bordered"
							required
						/>
					</label>
				</div>
			</section>

			<section id="jira-description">
				<h2>Section II: JIRA Description</h2>

				<p>PARs for product defects must include a detailed description consisting of:</p>
				<ul>
					<li>Information about what change or event precipitated the problem</li>
					<li>A concise problem description, which also provides the scope of the problem</li>
					<li>The expected product behavior or expected result</li>
					<li>Clear steps to reproduce the problem</li>
					<li>Business impact to the customer or UKG</li>
					<!-- <li>Workaround Details (if applicable)</li> -->
				</ul>

				<p>PARs for customer enhancements should include:</p>
				<ul>
					<li>A clear statement of the desired new functionality</li>
					<li>
						A detailed business impact of how adding the feature will positively impact the customer
						or UKG (or how the lack of it negatively impacts either, or both)
					</li>
				</ul>

				<h3>A. Issue Details</h3>
				<p>
					Has this ever worked? If <em>Yes</em>, what change or event seemed to be what started this
					problem?
				</p>

				<!-- A. Issue Details -->
				<div class="form-control">
					<label for="issue-details" class="form-control">
						<div class="label">
							<span class="label-text">Issue Details</span>
						</div>
						<select
							name="issue"
							id="issue"
							class="select select-bordered select-sm"
							tabindex="0"
							bind:value={issueDetails}
							required
						>
							<option disabled selected>Select an option...</option>
							<!-- prettier-ignore -->
							<option>Yes, but while there is reasonable proof or a creditable claim that this previously worked, there are no clues reported or discovered to more clearly define what started the issue, so Support is reporting the origin as 'uncertain'</option
							>
							<!-- prettier-ignore -->
							<option>Yes, this was working, and Support has proven that this is a regression introduced by a regular release or update. JIRA's 'Regression Yes/No' and 'Regression Introduced' fields will be set to reflect Support's findings</option>
							<!-- prettier-ignore -->
							<option>Yes, this was working, and Support has proven that this is a regression introduced by an Express Upgrade or a Patch (details must be provided in the Problem description and JIRA's 'Regression' fields filled out as well)</option>
							<!-- prettier-ignore -->
							<option>Yes, this was working, but the problem began after changes to Pay Policy, Accruals, or other configuration (see Problem description for details)</option>
							<!-- prettier-ignore -->
							<option>Yes, this was working, but the problem started happening after a change to an Integration or to a Custom Report (see Problem description for details)</option>
							<!-- prettier-ignore -->
							<option>Yes, this was working as expected, but we have determined with some certainty that it started after some OTHER event or change</option>
							<!-- prettier-ignore -->
							<option>No, this has not worked since originally set up and configured by UKG professional services, partner, or by the customer</option>
						</select>
					</label>
				</div>

				<!-- Problem Statement -->
				<div class="form-control">
					<label for="problem-statement" class="form-control">
						<div class="label">
							<span class="label-text">Problem Statement</span>
						</div>
						<textarea
							name="problem-statement"
							id="problem-statement"
							placeholder="Enter a problem statement"
							bind:value={problemStatement}
							class="textarea textarea-bordered textarea-sm leading-normal"
							rows="13"
							spellcheck="true"
							required
						/>
					</label>
				</div>

				<!-- B. Issue Scope -->
				<h3>B. Issue Scope</h3>

				<!-- Tenant URL -->
				<div class="form-control">
					<label for="tenant-url">
						<div class="label">
							<span class="label-text">Tenant URL</span>
						</div>
						<input
							tabindex="0"
							type="text"
							name="tenant-url"
							id="tenant-url"
							bind:value={tenantUrl}
							placeholder="https://supertenant.prd.mykronos.com"
							class="input input-sm input-bordered w-full xl:w-1/4"
							required
						/>
					</label>
				</div>

				<!-- Tenant Stack -->
				<div class="form-control">
					<label for="tenant-stack">
						<div class="label">
							<span class="label-text">Tenant Stack</span>
						</div>
						<select
							name="tenant-stack"
							id="tenant-stack"
							class="select select-bordered w-full xl:w-auto select-sm"
							tabindex="0"
							bind:value={tenantStack}
							required
						>
							<option disabled selected>Select an option...</option>
							<option>Australia PRD/NPR</option>
							<option>Canada PRD/NPR</option>
							<option>CFN - Cross Functional</option>
							<option>Europe EU PRD/NPR</option>
							<option>NAM NPR</option>
							<option>NAM PRD</option>
							<option>Other (please find details in problem description)</option>
						</select>
					</label>
				</div>

				<!-- Mobile App -->
				<div class="form-control">
					<label for="mobile-app">
						<div class="label">
							<span class="label-text">Does this issue affect the mobile app?</span>
						</div>
						<div class="join join-horizontal space-x-3">
							<label for="mobile-app" class="label space-x-2">
								<input
									type="radio"
									name="mobile-app"
									value="Yes"
									bind:group={doesAffectMobile}
									id="mobile-app-yes"
									class="radio checked:bg-primary"
									required
								/>
								<span class="label-text font-normal">Yes</span>
							</label>
							<label for="mobile-app" class="label space-x-2">
								<input
									type="radio"
									name="mobile-app"
									value="No"
									bind:group={doesAffectMobile}
									id="mobile-app-no"
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">No</span>
							</label>
						</div>
						{#if doesAffectMobile === 'Yes'}
							<div class="mobile-info-container">
								<div class="form-control">
									<label for="mobile-info">
										<div class="label">
											<span class="label-text"
												>Mobile Device - Manufacturer, Model and OS with Version</span
											>
										</div>
										<input
											tabindex="0"
											type="text"
											name="mobile-info"
											id="mobile-info"
											bind:value={mobileInfo}
											placeholder="iPhone 11, iOS 14.4"
											class="input input-sm input-bordered w-full xl:w-1/4"
											required
										/>
									</label>
								</div>
								<div class="form-control">
									<label for="app-info">
										<div class="label">
											<span class="label-text"> Mobile App - Name, Version</span>
										</div>
										<input
											tabindex="0"
											type="text"
											name="app-info"
											id="app-info"
											bind:value={appInfo}
											placeholder="UKG Pro Mobile, 3.0.0"
											class="input input-sm input-bordered w-full xl:w-1/4"
											required
										/>
									</label>
								</div>
							</div>
						{/if}
					</label>
				</div>

				<!-- Integrations -->
				<!-- ? This might cause an issue? -->
				<div class="form-control">
					<label for="integrations">
						<div class="label">
							<span class="label-text">Does this issue affect Integrations?</span>
						</div>
						<div class="join join-horizontal space-x-3">
							<label for="integrations" class="label space-x-2">
								<input
									type="radio"
									name="integrations"
									value="Yes"
									bind:group={doesAffectIntegrations}
									id="integrations-yes"
									class="radio checked:bg-primary"
									required
								/>
								<span class="label-text font-normal">Yes</span>
							</label>
							<label for="integrations" class="label space-x-2">
								<input
									type="radio"
									name="integrations"
									value="No"
									bind:group={doesAffectIntegrations}
									id="integrations-no"
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">No</span>
							</label>
						</div>
						{#if doesAffectIntegrations === 'Yes'}
							<div class="integrations-info-container">
								<div class="label">
									<span class="label-text"> How does this issue affect Integrations?</span>
								</div>
								<div class="join join-horizontal space-x-3">
									<label for="integrations-info" class="label space-x-2">
										<input
											type="radio"
											name="integrations-info"
											value="The issue only occurs in Integration Hub"
											id="integration-hub"
											bind:group={integrationsInfo}
											class="radio checked:bg-primary"
											required
										/>
										<span class="label-text font-normal"
											>The issue only occurs in Integration Hub</span
										>
									</label>
									<label for="integrations-info" class="label space-x-2">
										<input
											type="radio"
											name="integrations-info"
											value="The issue occurs any time an API call is sent"
											id="integrations-api-call"
											bind:group={integrationsInfo}
											class="radio checked:bg-primary"
										/>
										<span class="label-text font-normal"
											>The issue occurs any time an API call is sent</span
										>
									</label>
								</div>
							</div>
						{/if}
					</label>
				</div>

				<!-- Impacted Users -->
				<div class="form-control">
					<label for="impacted-users">
						<div class="label">
							<span class="label-text"> Who or what is impacted by this issue? </span>
						</div>
						<select
							name="impacted-users"
							id="impacted-users"
							bind:value={impactedUsers}
							class="select select-bordered w-full xl:w-auto select-sm"
							tabindex="0"
							required
						>
							<option disabled selected>Select an option...</option>
							<option>Pro WFM Users, Managers or Administrators</option>
							<option>Pro WFM Timekeeper Employee(s)</option>
							<option>Timekeeper Terminal(s)</option>
							<option>Pro WFM HCM User(s)/Manager(s)</option>
						</select></label
					>
				</div>

				<div class="form-control">
					<label for="number-affected">
						<div class="label">
							<span class="label-text">How many are affected?</span>
						</div>
						<div class="join join-horizontal space-x-3">
							<label for="number-affected" class="label space-x-2">
								<input
									type="radio"
									name="number-affected"
									id="affected-one"
									bind:group={numberAffected}
									value="One"
									class="radio checked:bg-primary"
									required
								/>

								<span class="label-text font-normal">One</span>
							</label>
							<label for="number-affected" class="label space-x-2">
								<input
									type="radio"
									name="number-affected"
									id="affected-some"
									bind:group={numberAffected}
									value="Some"
									class="radio checked:bg-primary"
								/>

								<span class="label-text font-normal">Some</span>
							</label>
							<label for="number-affected" class="label space-x-2">
								<input
									type="radio"
									name="number-affected"
									id="affected-all"
									bind:group={numberAffected}
									value="All"
									class="radio checked:bg-primary"
								/>

								<span class="label-text font-normal">All</span>
							</label>
						</div>
					</label>
				</div>

				<!-- Trigger Event -->
				<div class="form-control">
					<label for="trigger-event">
						<div class="label">
							<span class="label-text"
								>Is there a specific time or event that triggers the issue?</span
							>
						</div>
						<div class="join join-vertical place-items-start">
							<label for="trigger-event" class="label space-x-3">
								<input
									type="radio"
									name="trigger-event"
									id="trigger-event-all"
									value="No, it is reproducible any time"
									bind:group={isOtherEvent}
									class="radio checked:bg-primary"
									required
								/>
								<span class="label-text font-normal">No, it is reproducible any time</span>
							</label>
							<label for="trigger-event" class="label space-x-3">
								<input
									type="radio"
									name="trigger-event"
									value="No, it occurs intermittently"
									id="trigger-event-intermittent"
									bind:group={isOtherEvent}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">No, it occurs intermittently</span>
							</label>
							<label for="trigger-event" class="label space-x-3">
								<input
									type="radio"
									name="trigger-event"
									id="trigger-event-payroll"
									value="Yes, on payroll processing days"
									bind:group={isOtherEvent}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">Yes, on payroll processing days</span>
							</label>
							<label for="trigger-event" class="label space-x-3">
								<input
									type="radio"
									name="trigger-event"
									id="trigger-event-dst"
									value="Yes, on a Daylight Savings Time change"
									bind:group={isOtherEvent}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">Yes, on a Daylight Savings Time change</span>
							</label>
							<label for="trigger-event" class="label space-x-3">
								<input
									type="radio"
									name="trigger-event"
									id="trigger-event-other"
									value="Other"
									bind:group={isOtherEvent}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">Yes, by some other event not listed</span>
							</label>
							{#if isOtherEvent === 'Other'}
								<div class="form-control w-full">
									<input
										type="text"
										name="other-event"
										bind:value={otherEvent}
										placeholder="Please specify the event"
										class="input input-bordered input-primary input-sm mt-2 w-full xl:w-auto"
										required
									/>
								</div>
							{/if}
						</div>
					</label>
				</div>

				<!-- Customers affected -->
				<div class="form-control">
					<label for="customers-affected">
						<div class="label">
							<span class="label-text">What customers would be affected by this issue?</span>
						</div>
						<div class="join join-vertical place-items-start">
							<label for="customers-affected" class="label space-x-3">
								<input
									type="radio"
									name="customers-affected"
									id="customers-affected-all"
									value="The issue is customer specific"
									bind:group={isOtherCustomers}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">The issue is customer specific</span>
							</label>
							<label for="customers-affected" class="label space-x-3">
								<input
									type="radio"
									name="customers-affected"
									id="customers-affected-some"
									value="The issue affects all customers"
									bind:group={isOtherCustomers}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal">The issue affects all customers</span>
							</label>
							<label for="customers-affected" class="label space-x-3">
								<input
									type="radio"
									name="customers-affected"
									id="customers-affected-one"
									value="Other"
									bind:group={isOtherCustomers}
									class="radio checked:bg-primary"
								/>
								<span class="label-text font-normal"
									>The issue would only affect specific customers</span
								>
							</label>
							{#if isOtherCustomers === 'Other'}
								<div class="form-control w-full">
									<input
										type="text"
										name="other-customers"
										bind:value={otherCustomers}
										placeholder="This issue affects customers who..."
										class="input input-bordered input-primary input-sm mt-2 w-full xl:w-auto"
										required
									/>
								</div>
							{/if}
						</div>
					</label>
				</div>

				<!-- Additional Scope -->
				<div class="form-control">
					<label for="addtl-scope" class="form-control">
						<div class="label">
							<span class="label-text">Additional Scope Detail</span>
						</div>
						<input
							tabindex="0"
							type="text"
							name="addtl-scope"
							id="addtl-scope"
							bind:value={scope}
							placeholder="Enter any other additional scope"
							class="input input-sm input-bordered w-full xl:w-1/2"
						/>
					</label>
				</div>

				<!-- C. Steps to Reproduce -->
				<h3>C. Steps to Reproduce</h3>

				<!-- Reproducibility -->
				<div class="form-control">
					<label for="reproducibility">
						<div class="label">
							<span class="label-text">What is the reproducibility for the issue?</span>
						</div>
						<select
							name="reproducibility"
							id="reproducibility"
							bind:value={reproducibility}
							class="select select-bordered select-primary select-sm"
							required
						>
							<option disabled selected>Select an option...</option>
							<option
								>The issue was reported by a customer, but can be reproduced in any tenant using the
								steps below</option
							>
							<option
								>The issue was reported by a customer, but cannot be reproduced in any other tenant</option
							>
							<option
								>The problem was reported on a CFN tenant, but can also be reproduced in any CFN
								tenant</option
							>
							<option
								>The problem was reported on a CFN tenant but cannot be reproduced on any other CFN
								tenant</option
							>
							<option
								>The problem was reported on a NXT or EVL tenant, but can also be reproduced in any
								CFN tenant</option
							>
							<option
								>The problem was reported on a NXT or EVL tenant but cannot be reproduced on any
								other CFN tenant due to version differences</option
							>
						</select>
					</label>
				</div>

				<!-- Steps to Reproduce -->
				<div class="form-control">
					<label for="steps-to-reproduce" class="form-control">
						<div class="label">
							<span class="label-text">Steps to Reproduce</span>
						</div>
						<textarea
							name="steps-to-reproduce"
							id="steps-to-reproduce"
							bind:value={stepsToReproduce}
							placeholder="Provide numbered, detailed steps to reproduce the issue. For issues reproduced in non-customer environments, include the tenant and user/password information. For customer issues, advise using the Engineering-staged environment built from the schema dump that you provide and logging in with either logical access or as the user name that encounters the problem."
							class="textarea textarea-bordered textarea-sm leading-normal"
							rows="20"
							spellcheck="true"
							required
						/>
					</label>
				</div>
			</section>

			<!-- <section>
				<h2 id="business-impact">Section III: Business Impact</h2>
				<p>Provide details on the business impact to customers or to UKG below</p>

				<div class="form-control">
					<label for="business-impact" class="form-control">
						<div class="label">
							<span class="label-text">Business Impact</span>
						</div>
						<textarea
							name="business-impact"
							id="business-impact"
							bind:value={businessImpact}
							placeholder="Describe the business impact of this issue including things such as loss of payroll accuracy, time lost due to poor performance or errors, threats to implementation 'Go-Live' and other problems caused by this issue."
							class="textarea textarea-bordered textarea-primary textarea-sm leading-normal"
							rows="5"
							spellcheck="true"
							required
						/>
					</label>
				</div>
			</section> -->

			<!-- <section>
				<h2 id="business-impact">Section IV: Workaround</h2>

				<div class="form-control">
					<label for="workaround-available">
						<div class="label">
							<span class="label-text">Is there a workaround available?</span>
						</div>
						<select
							name="workaround-available"
							id="workaround-available"
							bind:value={workaroundAvailable}
							class="select select-bordered select-primary select-sm"
							required
						>
							<option disabled selected>Select an option...</option>
							<option>No</option>
							<option>Yes</option>
							<option value="A workaround is available, but is not acceptable to the customer."
								>Yes, but the customer does not accept the workaround</option
							>
						</select>
					</label>
				</div>

				<div class="form-control">
					<label for="workaround" class="form-control">
						<div class="label">
							<span class="label-text">Workaround</span>
						</div>
						<textarea
							name="workaround"
							id="workaround"
							bind:value={workaround}
							placeholder="Provide the details of the workaround"
							class="textarea textarea-bordered textarea-primary textarea-sm leading-normal"
							rows="5"
							spellcheck="true"
							required
						/>
					</label>
				</div>
			</section> -->
			<div class="flex justify-center">
				<button
					type="submit"
					name="submit"
					class="btn btn-primary rounded-md w-1/4 min-w-1/2 max-w-1/4"
				>
					{#if !loading}
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
		<h1 class="text-center">Pro WFM PAR Template</h1>
		<div class="divider"></div>

		<section id="instructions">
			<h2>Instructions</h2>
			<p>
				Copy the generated template below into the JIRA PAR form. Use the "copy to clipboard"
				buttons on the right side of each section to copy that section to the clipboard for easier
				pasting into the JIRA Form.
			</p>
		</section>

		<!-- Issue Summary -->
		<section id="issue-summary" bind:this={issueSummarySection}>
			<h2>Issue Summary</h2>
			<div class="relative">
				<CopyToCliboard elementToCopy={issueSummarySection} />
				<p>{form?.summary}</p>
			</div>
		</section>

		<!-- JIRA Description -->
		<section id="description" bind:this={jiraDescriptionSection}>
			<div class="content-hero bg-primary text-primary-content text-center p-4">
				<h2>JIRA Description</h2>
			</div>

			<div class="relative">
				<CopyToCliboard elementToCopy={jiraDescriptionSection} />
				<!-- Problem Statement -->
				<div id="problem-statement" class="whitespace-pre-line">
					<h3 class="mt-8 mb-4">Problem Statement</h3>
					<p class="">{form?.problemStatement}</p>
					<p class="mt-4"><strong>Has this ever worked?</strong> {form?.issue}</p>
				</div>

				<!-- Scope -->
				<h3 class="mt-4 mb-4">Scope</h3>

				<!-- Mobile Issue -->
				{#if form?.mobileApp === 'Yes'}
					<div id="mobile-app">
						<p class="mb-4">This issue is a mobile application issue. Details noted below</p>
						<p><strong>Mobile Device - Manufacturer, Model, and OS:</strong></p>
						<p>{form.mobileInfo}</p>
						<p class="mt-4"><strong>Mobile App - Name and Version:</strong></p>
						<p>{form.appInfo}</p>
					</div>
				{/if}

				<!-- Integrations Issue -->
				{#if form?.integrations === 'Yes'}
					<div id="integrations">
						<p class="mt-4">
							<strong>This issue is an integration issue. Details noted below</strong>
						</p>
						<p>{form.integrationsInfo}</p>
					</div>
				{/if}

				<!-- Who is impacted -->
				<div id="impacted-users">
					<p class="mt-4"><strong>Who or what is impacted by this issue?</strong></p>
					<p class="">{form?.impactedUsers}</p>
				</div>

				<!-- How many affected -->
				<div id="number-affected">
					<p class="mt-4"><strong>How many are affected?</strong></p>
					<p class="">{form?.numberAffected}</p>
				</div>

				<!-- If triggered by other event -->
				{#if form?.otherEvent}
					<p class="mt-4">
						<strong>This issue is triggered by an event not listed:</strong>
					</p>
					<p>{form?.otherEvent}</p>
				{/if}

				<!-- What customers would be affected-->
				<div id="customers-affected">
					<p class="mt-4"><strong>What customers would be affected by this issue?</strong></p>
					<p class="">{form?.customersAffected}</p>
				</div>

				<!-- Other customers -->
				{#if form?.otherCustomers}
					<p class="mt-4"><strong>This issue is customer specific to customers who:</strong></p>
					<p>{form?.otherCustomers}</p>
				{/if}

				<!-- Tenant URL/Stack -->
				<div id="tenant-details">
					<h3 class="mt-8 mb-4">Tenant Details</h3>
					<p class=""><strong>Tenant URL:</strong> {form?.url}</p>
					<p class=""><strong>Tenant Stack:</strong> {form?.stack}</p>
				</div>

				<!-- Business Impact -->
				<!-- <h3 class="mt-8 mb-4">Business Impact</h3>
				<p>{form?.businessImpact}</p> -->
			</div>
		</section>

		<section id="steps-to-reproduce" bind:this={stepsToReproduceSection}>
			<!-- Steps to Repro -->
			<div class="content-hero bg-secondary text-secondary-content text-center p-4">
				<h2>JIRA Steps to Reproduce</h2>
			</div>

			<div class="relative mt-4">
				<CopyToCliboard elementToCopy={stepsToReproduceSection} />
				<p class="whitespace-pre-line">{form?.stepsToReproduce}</p>
			</div>
		</section>

		<!-- Workaround -->
		<!-- <section id="workaround">
			<div class="content-hero bg-accent text-accent-content text-center p-4">
				<h2>JIRA Workaround</h2>
			</div>
			<p>{form?.workaroundAvailable}</p>
			{@html form?.workaround}
		</section> -->
	</article>
{/if}

<!-- <style>
	.mobile-info-container,
	.integrations-info-container {
		@apply ml-8 mt-4;
	}

	.content-hero {
		@apply mt-4 mb-4;
	}
</style> -->
