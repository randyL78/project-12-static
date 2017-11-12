/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function () {
	"use strict";

	const navBar = document.querySelector(".navbar");
	const main = document.querySelector("body");

	window.onscroll = function(e) {
		console.log(navBar.scrollHeight + ", " + e.target.scrollTop);
		
	};
	
	
	
});