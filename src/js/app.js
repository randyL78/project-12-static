/*jshint esversion: 6 */


// wait until html loads
document.addEventListener('DOMContentLoaded', function () {
	"use strict";
	

// ************************************************************
//				Utility Functions
// ************************************************************	
	
	
	
	
	
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
			console.log(navBar.offsetTop + ", " + portfolio.offsetTop + ", " + window.pageYOffset + ", " + (portfolio.offsetTop - window.getComputedStyle(navBar).height));
		if (window.pageYOffset >= navBar.offsetTop && !navBar.classList.contains("sticky")) {
			navBar.classList.add("sticky");
		} else if (window.pageYOffset <= (portfolio.offsetTop - window.getComputedStyle(navBar).height)) {

		}
		
	};
	
	

	
	
});