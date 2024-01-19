export function copyToClipboard(element: HTMLElement) {
	try {
		let htmlContent = element.innerHTML;

		// Remove h2 elements:
		htmlContent = htmlContent.replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/g, '');

		// Preserve whitespace and line breaks in `p.whitespace-pre-line` elements:
		const preLinePElements = element.querySelectorAll('p.whitespace-pre-line');
		for (const p of preLinePElements) {
			// Capture surrounding line breaks and element content:
			const regex = new RegExp(`(\r?\n)?${p.outerHTML}(\r?\n)?`, 'g');

			// Replace with formatted content, preserving all whitespace and breaks:
			const formattedPValue = p.textContent?.replace(/\s+/g, '&nbsp;');
			htmlContent = htmlContent.replace(regex, `\n${formattedPValue}\n`);
		}

		// Copy to clipboard using modern Clipboard API or fallback:
		if (navigator && navigator.clipboard && navigator.clipboard.write) {
			return navigator.clipboard
				.write([
					new ClipboardItem({
						'text/html': new Blob([htmlContent], { type: 'text/html' })
					})
				])
				.then(() => {
					console.log(
						'HTML content (excluding h2 elements, preserving whitespace) copied to clipboard!'
					);
				});
		} else {
			// Fallback for older browsers (unchanged)
			// ...
		}
	} catch (error) {
		console.error('Error in copyToClipboard function:', error);
	}
}
