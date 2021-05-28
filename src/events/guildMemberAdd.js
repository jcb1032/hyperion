const fs = require("fs");
let captchas = JSON.parse(fs.readFileSync("data/captcha.json"));
let config = JSON.parse(fs.readFileSync("data/config.json"));

module.exports = member => {
	if (!config.verification) return;

	let captchaCode = (() => {
		let a = "";
		for (let i = 0; i < 6; i++) a += String.fromCharCode(65 + Math.floor(Math.random() * 26));
		return a;
	})();

	captchas[member.id] = captchaCode;
	fs.writeFile("data/captcha.json", JSON.stringify(captchas, null, 1), console.error);

	require("../tasks/canvas.js")(captchaCode).then(() => {
		member.user.send({
			embed: {
				title: "**The Planet** Verification",
				description: "Please reply to this message with the code above.",
				footer: {
					text: "This is a new feature we're trying out, so if you have any feedback, please feel free to let us know!",
				},
			},
			files: [
				{
					attachment: require("../tasks/tts.js")(captchaCode),
					name: "captcha.mp3",
				},
				{
					attachment: `./src/assets/captcha.png`,
					name: "captcha.png",
				},
			],
		});
	});
};
