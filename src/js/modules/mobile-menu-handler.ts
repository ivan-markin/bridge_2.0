export const mobileMenuHandler = () => {
	const mobileMenuPopup = document.querySelector('.mobile-menu');

	const openMenu = () => {
		mobileMenuPopup?.classList.add('active');
		document.body.classList.add('fixed');
	}

	const closeMenu = () => {
		mobileMenuPopup?.classList.remove('active');
		document.body.classList.remove('fixed');
	}

	return {
		open: openMenu,
		close: closeMenu
	}
}