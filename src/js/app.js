/*jshint esversion: 6 */


// wait until html loads
document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	

// ************************************************************
//				Utility Functions
// ************************************************************	
	
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

	// handle scroll button for portfolio
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
	
	
	// sticky nav
	const navBar = document.querySelector(".navbar");

	window.onscroll = function() {
		
		// get the height
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
		
	};
	
	

	
	
});