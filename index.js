const prompts = require('prompts');

const score = { wins: 0, losses: 0 };
const choices = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const keys = Object.keys(choices);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

async function promptUser() {
	const thanks = () => {
		console.log(`[Final score] CPU: ${score.losses} - You: ${score.wins}`);
		console.log('Thanks for playing!');
		process.exit();
	};

	const { answer } = await prompts({
		type: 'select',
		name: 'answer',
		message: 'Pick one:',
		choices: keys.map(key => ({ title: capitalize(key), value: key })),
	}, { onCancel: thanks });

	const random = Math.floor(Math.random() * keys.length);
	const cpuAnswer = choices[keys[random]];

	if (answer === cpuAnswer) {
		console.log(`We both chose ${answer} - it's a tie!`);
	} else {
		const cpuWin = answer === choices[cpuAnswer];
		cpuWin ? score.losses++ : score.wins++;
		console.log(`I choose ${cpuAnswer} - ${cpuWin ? 'I' : 'you'} win!`);
	}

	const { again } = await prompts({
		type: 'confirm',
		name: 'again',
		initial: true,
		message: 'Play again?',
	}, { onCancel: thanks });

	if (!again) return thanks();
	
	return (console.log(), promptUser());
};

promptUser();
