module.exports = {
	name: "eval",
	execute: msg => {
		let args = msg.content.split(" ").slice(1);
		if (msg.content.startsWith("!eval")) {
			if (msg.author.id == "302219977224749056") {
				try {
					const code = args.join(" ");
					let evaled = eval(code);

					if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

					msg.channel.send(clean(evaled), { code: "xl" });
				} catch (err) {
					msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
				}
			}
		}
	},
};
function clean(text) {
	if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else return text;
}
