export async function copyToClipboard(element: HTMLElement) {
	try {
		let htmlContent = element.innerHTML;

		// Wrap h3 elements with <strong> tags and add =============== underneath:
		htmlContent = htmlContent.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g, (_, innerContent) => {
			return `<br><strong>${innerContent}</strong><p>=======================</p>`;
		});

		// Remove h2 elements:
		htmlContent = htmlContent.replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/g, '');

		// Process all p elements:
		const allPElements = element.querySelectorAll('p');
		for (const p of allPElements) {
			// Check if the p element has the whitespace-pre-line class
			if (p.classList.contains('whitespace-pre-line')) {
				const formattedPValue = p.textContent?.replace(/\n/g, '<br>') + '<br>'; // Add <br> at the end
				htmlContent = htmlContent.replace(p.outerHTML, formattedPValue || '');
			}
			// Add additional conditions for other formatting requirements if needed
			else {
				// Handle other cases as needed
			}
		}

		// Create a Blob with the HTML content
		const blob = new Blob([htmlContent], { type: 'text/html' });

		// Use the Clipboard API to write the data
		await navigator.clipboard.write([
			new ClipboardItem({
				'text/html': blob
			})
		]);

		console.log(
			'HTML content (including <strong> for h3 elements, excluding h2 elements, preserving whitespace) copied to clipboard!'
		);
	} catch (error) {
		console.error('Error copying to clipboard:', error);
	}
}
