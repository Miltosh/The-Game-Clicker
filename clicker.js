const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
const bestResult = document.querySelector('#bestResult');

let clicks = 1;  // Clicking on start counts as a first click

const TIMEOUT = 5000; // The game runs for 5 seconds

let result = []; // Array of best results

// function for sort best results from more to less
const bubbleSort = (arr) => {
	for (let j = arr.length - 1; j > 0; j--) {
		for (let i = 0; i < j; i++) {
			if (arr[i] < arr[i + 1]) {
				let temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
		}
	}
	return arr
}

function formatTime(ms) {
	return Number.parseFloat(ms / 1000).toFixed(3)
}

button.onclick = start;

function start() {
	const startTime = Date.now();

	counter.textContent = clicks;
	display.textContent = formatTime(TIMEOUT);
	button.onclick = () => counter.textContent = ++clicks;

	const interval = setInterval(() => {
		const delta = Date.now() - startTime;
		display.textContent = formatTime(TIMEOUT - delta);
	})

	setTimeout(() => {
		button.onclick = null;
		display.textContent = 'Game Over';

		// Сheck the fullness of the array and exclude the addition of the same results
		if (result.length < 5 && !result.includes(clicks)) {
			result.push(clicks);
			bubbleSort(result);
		}
		if (result[4] < clicks && !result.includes(clicks)) {
			result[4] = clicks;
			bubbleSort(result);
		}

		// Output sorted best result from array to HTML
		let res = result.map(el => {
			return el + ' clicks in 5 sec<br>';
		})
		bestResult.innerHTML = res.join('');

		clearInterval(interval)

		setTimeout(() => { // 2 seconds accidental click protection
			display.textContent = 'Start a new game';
			clicks = 1;
			button.onclick = start;
		}, 2000)
	}, TIMEOUT)
}