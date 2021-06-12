const canvas = require("canvas");

/**
 * canvas.js - generates a captcha image
 * @param {string} code - captcha text to display
 * @returns Promise <PNG Image Buffer>
 */
module.exports = code =>
	new Promise((res, rej) => {
		let width = 300,
			height = 150;

		/* set up canvas */
		let cvs = canvas.createCanvas(width, height);
		let ctx = cvs.getContext("2d");

		/* draw background */
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);

		/* draw random circles */
		for (let i = 0; i < 150; i++) {
			ctx.beginPath();
			ctx.arc(Math.random() * width, Math.random() * height, 12, 0, 2 * Math.PI, false);

			ctx.fillStyle = `rgba(150, 150, 150, .3)`;
			ctx.fill();
		}

		/* set up text */
		ctx.font = "bold 20pt arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#fff";

		/* draw text */
		ctx.translate(90 + Math.random() * 120, 85);
		ctx.rotate((Math.PI / 180) * (Math.random() * 60 - 30));
		ctx.fillText(code, 0, 0);

		/* get and return image data */
		res(cvs.toBuffer("image/png"));
	});
