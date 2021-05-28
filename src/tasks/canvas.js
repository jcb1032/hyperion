const canvas = require("canvas");
const fs = require("fs");
//canvas.registerFont("../assets/arial.ttf", { family: "Arial" });

module.exports = code => {
	return new Promise((res, rej) => {
		let cvs = canvas.createCanvas(200, 100);
		let context = cvs.getContext("2d");

		context.font = "bold 20pt arial";
		context.textAlign = "center";
		context.fillStyle = "#fff";

		context.fillText(code, 100, 60);

		let buffer = cvs.toBuffer("image/png");
		fs.writeFile("./src/assets/captcha.png", buffer, err => {
			if (err) rej();
			else res();
		});
	});
};