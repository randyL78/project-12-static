/*jshint esversion: 6 */


// wait until html loads
document.addEventListener('DOMContentLoaded', function () {
	"use strict";
// ************************************************************
//				Utility Functions
// ************************************************************	
const imageURL = "./images/";	

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
//				Object Constructors
// ************************************************************		
	// Create a project object to store important information about each project to display in modal
	let projectKey = 0;
	
	function project(number, title, desription, skills, url) {
		this.key = projectKey;
		projectKey ++;
		this.number = number;
		this.title = title;
		this.desription = desription;
		this.skills = skills;
		this.url = url;
		this.image = () => {
			 return (imageURL + "Project" + this.number + ".png");
			};
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
		if (mobileNav.classList.contains("collapsed")) {
			mobileNav.classList.remove("collapsed");
		} else {
			mobileNav.classList.add("collapsed");
		}
	};

	// ======= handle scroll button for portfolio
	const scrollButton = document.getElementById("button--scroll");
	const portfolio = document.getElementById("portfolio");
	let scrolled = false;
	
	// avoid undefined error for experince.html page that doesn't have a scroll button 
	if (scrollButton !== null) {
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
		
		// ======= sticky scrolling nav
		window.onscroll = () => {
			stickyScroller();
		};
		
		window.onresize = () => {
			// for performance reasons add a delay before firing
			// reset existing timeout first to avoid multiple fires
			clearTimeout(resizeTimer);

			// initialize timeout
			resizeTimer = setTimeout( () => {stickyScroller();}, 50); 

		};
		
	}
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
	

	
// ************************************************************
//				Controller
// ************************************************************
	const projectScreen = document.getElementById("project--screen");
	const numberDisplay = document.getElementById("project--number");
	const prevButton = document.getElementById("project--prev");
	const nextButton = document.getElementById("project--next");
	const infoButton = document.getElementById("project--info");
	const modalOverlay = document.querySelector(".overlay");
	
	let projectNumber = 0;
	
	
	// =========== Change the display number on the controller and update image in the svg computer screen
	function setProject() {
		if (projectNumber >= projects.length) {projectNumber = 0;}
		if (projectNumber < 0) {projectNumber = projects.length - 1;}
	
		numberDisplay.textContent = projects[projectNumber].number;
		let currentImage = projects[projectNumber].image();
		projectScreen.setAttribute("xlink:href", currentImage);		
	}
	
	
	// ============ Event handlers
	
	// check to see if there is a need for a modal, if not don't add evenlisteners to avoid null references
	if (modalOverlay !== null) {
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

		// use a modal to display more information about a project
		infoButton.onclick = () => {
			if (modalOverlay.classList.contains("hidden")) {
				modalOverlay.classList.remove("hidden");
				addModalContent();
			}
		};
	}
	
// ************************************************************
//				Modal
// ************************************************************
	// const modalOverlay declared in "Contoller" section to be accessible to controller event handlers
	const modalContainer = document.querySelector(".modal__container");
	const modalClose = document.getElementById("modal-close");
	
	// ======= add html content to modal
	function addModalContent() {
		let skillsHTML = "<ul>";
		projects[projectNumber].skills.forEach( (currentValue) => {
			skillsHTML += "<li>" + currentValue + "</li>";
		});
		
		skillsHTML += "</ul>";
		
		let modalInner = 
		`
			<h2>Project ${projects[projectNumber].number}</h2>
			<h3>${projects[projectNumber].title}</h3>
			<p>${projects[projectNumber].desription}</p>
			<h4>Skills Used:</h4>
			${skillsHTML}
			<a href="http://${projects[projectNumber].url}" target="_blank" class="link">Live Demo</a>
			<hr>
		`;
		
		modalContainer.innerHTML = modalInner;
	}
	
	
	// ======= prevent user from scrolling page while modal is open
//	function handleScrollPrevention(e) {
//		if (!modalOverlay.classList.contains("hidden")) {
//			e.preventDefault();
//		}
//	}

	// check to see if there is a need for a modal, if not don't add evenlisteners to avoid null references
	if (modalOverlay !== null) {
		// close the modal
		modalClose.onclick = () => {
			modalOverlay.classList.add("hidden");	
		};
	}


// ************************************************************
//				Create project objects
// ************************************************************
	const projects = [];
	
	projects.push(new project(1, 
														"Personal Profile",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities. We also learned the power of anchors to link to different areas both in our own website and to other websites.",
													 	["HTML", "CSS", "Git"],
													 	"randylayne.com"));
	projects.push(new project(2, 
														"Responsive Layout",
													 	"When preparing to do this project, the main focus of the courses we were taking was a mobile first approach to building a website. Specifically, we learned to format the head of HTML documents for mobile devices and how to use min-width media queries to adjust our layout for different screen sizes.",
													 	["HTML", "CSS"],
													 	"randylayne.com/Techdegree-Projects/Responsive-Layout/"));
	projects.push(new project(3, 
														"Online Registration Form",
													 	"This project is all about being able to structure a web form to have a consistent cross-browser look, as well as utilizing HTML5 validation features.",
													 	["HTML", "CSS"],
													 	"randylayne.com/Techdegree-Projects/Online-Registration-Form/"));
	projects.push(new project(4, 
														"Interactive Photo Gallery",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "Javascript", "jQuery", "Plugins"],
													 	"randylayne.com/Techdegree-Projects/Interactive-Photo-Gallery/"));	
	projects.push(new project(5, 
														"Web Style Guide",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "SASS"],
													 	"randylayne.com/Techdegree-Projects/Web-Style-Guide/"));
	projects.push(new project(6, 
														"Interactive Video Player",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "Javascript"],
													 	"randylayne.com/Techdegree-Projects/Interactive-Video-Player/"));
	projects.push(new project(7, 
														"SVG Site Update",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "SVG", "Design"],
													 	"randylayne.com/Techdegree-Projects/SVG-Site_Update/"));
	projects.push(new project(8, 
														"Game Show App",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["Javascript", "CSS"],
													 	"randylayne.com/Techdegree-Projects/Game-Show-App/"));
	projects.push(new project(9, 
														"Web App Dashboard",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "Javascript", "Widgets", "LocalStorage"],
													 	"randylayne.com/Techdegree-Projects/Web-App-Dashboard/index.html"));
	projects.push(new project(10, 
														"Employee Directory",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "CSS", "Javascript", "AJAX", "JSON"],
													 	"randylayne.com/Techdegree-Projects/Employee-Directory/"));
	projects.push(new project(11, 
														"React Flickr Gallery",
													 	"In this project we take a given template and customize placeholder text and edit styles to match with our own goals and personalities",
													 	["HTML", "Javascript", "React", "AJAX", "Node", "JSON", "JSX"],
													 	"randylayne.com"));



}); // ===== end DOMContentLoaded ===











