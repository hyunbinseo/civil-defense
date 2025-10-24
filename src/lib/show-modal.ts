// NOTE Removing script avoids `hydration_mismatch`
export const showModalScript = `<script>(${() => {
	const dialog = document.currentScript?.previousElementSibling;
	if (dialog instanceof HTMLDialogElement) dialog.showModal();
	document.currentScript?.remove();
}})()</script>`;
