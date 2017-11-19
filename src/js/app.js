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
	// find the computed height for where the nav needs to start "sticking"
	function getStickyPoint() {
		// get the height of the navbar and convert it to a number
		let navHeight = window.getComputedStyle(navBar).height;
		navHeight = stringToNumber(navHeight, 'px');
		
		return portfolio.offsetTop - navHeight;
	}
	
	// ======= mobile menu
	const mobileMenu = document.getElementById("button--menu");
	const mobileNav = document.querySelector(".nav--mobile");
	const navBar = document.querySelector("#main-nav");
	
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
			let stickyHeight = getStickyPoint();
			window.scrollTo(0, stickyHeight);
			scrollButton.classList.add("flip");
		}
		scrolled = !scrolled;		
	};
	
	
	// ======= sticky nav
	window.onscroll = () => {
		stickyScroller();
	};
	
	function stickyScroller () {
		let stickyHeight = getStickyPoint();
		
		if (window.pageYOffset >= navBar.offsetTop && !navBar.classList.contains("sticky")) {
			navBar.classList.add("sticky");
			scrolled = true;				
			if (!scrollButton.classList.contains("flip")) {
				scrollButton.classList.add("flip");			
			}

		} else if (window.pageYOffset <= stickyHeight) {
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
	
// ************************************************************
//				Controller
// ************************************************************
	const prevButton = document.getElementById("project--prev");
	const nextButton = document.getElementById("project--next");
	const numberDisplay = document.getElementById("project--number");
	const projectScreen = document.getElementById("project--screen");
	
	let projectNumber = parseInt(numberDisplay.textContent);
	
	function setProject() {
		if (projectNumber > 11) {projectNumber = 1;}
		if (projectNumber < 1) {projectNumber = 11;}
	
		numberDisplay.textContent = projectNumber;
		projectScreen.setAttribute("xlink:href", "./images/Project" + projectNumber + ".png");		
	}
	
	// select next project
	nextButton.onclick = () => {
		projectNumber++;
		setProject();
	};
	// select previous project
	prevButton.onclick = () => {
		projectNumber--;
		setProject();
	};	
	
	
	
	
	
});



















