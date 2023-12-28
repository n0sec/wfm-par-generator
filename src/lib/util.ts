import { htmlToText } from 'html-to-text';

export function copyToClipboard(element: HTMLElement | undefined) {
	if (!element) return Promise.reject('No element provided.');

	const htmlContent = element.innerHTML;

	const textContent = htmlToText(htmlContent, {
		formatters: {
			h3: function (elem, walk, builder, formatOptions) {
				builder.openBlock();
				builder.addInline('*');
				walk(elem.children, builder);
				builder.addInline('*\\\\');
				builder.closeBlock();
			}
		},
		wordwrap: false,
		preserveNewlines: true,
		baseElements: {
			selectors: ['div'],
			orderBy: 'occurrence'
		},

		selectors: [
			{
				selector: 'p',
				options: { trailingLineBreaks: 1, leadingLineBreaks: 1, trimEmptyLines: true }
			},
			{ selector: 'div', options: { leadingLineBreaks: 1, trailingLineBreaks: 2 } },
			{
				selector: 'h3',
				format: 'h3',
				options: { leadingLineBreaks: 0 }
			},
			{ selector: 'h2', format: 'skip' }
		]
	});

	if (navigator && navigator.clipboard && navigator.clipboard.write) {
		return navigator.clipboard.write([
			new ClipboardItem({
				'text/plain': new Blob([textContent], { type: 'text/plain' })
			})
		]);
	}
	return Promise.reject('The Clipboard API is not available.');
}
