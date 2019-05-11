const prompts = require('prompts');

const choices = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const keys = Object.keys(choices);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

async function promptUser() {
	const thanks = () => (console.log('Thanks for playing!'), process.exit());

	const { answer } = await prompts({
		type: 'select',
		name: 'answer',
		message: 'Pick one:',
		choices: keys.map(key => ({ title: capitalize(key), value: key })),
	}, { onCancel: () => process.exit() });

	const random = Math.floor(Math.random() * keys.length);
	const cpuAnswer = choices[keys[random]];

	if (answer === cpuAnswer) {
		console.log(`We both chose ${answer} - it's a tie!`);
	} else {
		console.log(`I choose ${cpuAnswer} - ${answer === choices[cpuAnswer] ? 'I' : 'you'} win!`);
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
