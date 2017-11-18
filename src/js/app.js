/*jshint esversion: 6 */


// wait until html loads
document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	

// ************************************************************
//				Utility Functions
// ************************************************************	
	
	// Convert a string to a number with optional replacement of substring
	function stringToNumber (str, remove = '') {
		if (remove !== '') {
			str.replace(remove, '');
		}
		try {
			return parseInt(str);
		} catch(err) {
			console.log(err.message);
			console.log("Unable to convert string to number");
			return NaN;	
		}	
	}
	
// ************************************************************
//				Navigation
// ************************************************************
	// ======= mobile menu
	const mobileMenu = document.getElementById("button--menu");
	const mobileNav = document.querySelector(".nav--mobile");
	
	mobileMenu.onclick = () => {
		if (mobileNav.classList.contains("hidden")) {
			mobileNav.classList.remove("hidden");
		} else {
			mobileNav.classList.add("hidden");
		}
	};

	// ======= handle scroll button for portfolio
	const scrollButton = document.getElementById("button--scroll");
	const portfolio = document.getElementById("portfolio");
	let scrolled = false;
	
	
	scrollButton.onclick = () => {
		if (scrolled) {
			window.scrollTo(0,0);
			scrollButton.classList.remove("flip");
		} else {
				portfolio.scrollIntoView();		
				scrollButton.classList.add("flip");
		}
		scrolled = !scrolled;		
	};
	
	
	// ======= sticky nav
	const navBar = document.querySelector("#main-nav");

	window.onscroll = () => {
		stickyScroller();
	};
	
	function stickyScroller () {
		// get the height of the navbar and convert it to a number
		let navHeight = window.getComputedStyle(navBar).height;
		navHeight = stringToNumber(navHeight, 'px');
		
		if (window.pageYOffset >= navBar.offsetTop && !navBar.classList.contains("sticky")) {
			navBar.classList.add("sticky");
			scrolled = true;				
			if (!scrollButton.classList.contains("flip")) {
				scrollButton.classList.add("flip");			
			}

		} else if (window.pageYOffset <= (portfolio.offsetTop - navHeight)) {
			navBar.classList.remove("sticky");		
			scrolled = false;		
			if (scrollButton.classList.contains("flip")) {
				scrollButton.classList.remove("flip");			
			}
		}
		
	}
	
	// ========= reset scroller/nav positions after user resizes window 
	let resizeTimer;
	
	window.onresize = () => {
		// for performance reasons add a delay before firing
		// reset existing timeout first to avoid multiple fires
		clearTimeout(resizeTimer);
		
		// initialize timeout
		resizeTimer = setTimeout( () => {stickyScroller();}, 50); 
		
	};
	
	

	
	
});