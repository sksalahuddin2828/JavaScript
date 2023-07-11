const readline = require('readline');

function userInputChecker() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter your choice: ', (userChoice) => {
            if (userChoice === 'r' || userChoice === 'p' || userChoice === 's') {
                rl.close();
                resolve(userChoice);
            } else {
                console.log('Wrong Input!!');
                resolve('');
            }
        });
    });
}

function gameLogic(computerChoice, userChoice, userScore, computerScore) {
    return new Promise((resolve) => {
        if (computerChoice === 'rock' && userChoice === 'p') {
            console.log('Player Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            userScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === 'rock' && userChoice === 's') {
            console.log('Computer Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            computerScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === 'paper' && userChoice === 'r') {
            console.log('Computer Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            computerScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === 'paper' && userChoice === 's') {
            console.log('Player Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            userScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === 'scissors' && userChoice === 'r') {
            console.log('Player Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            userScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === 'scissors' && userChoice === 'p') {
            console.log('Computer Wins');
            console.log('Enter 1 to continue and 0 to leave the game');
            computerScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        } else if (computerChoice === userChoice) {
            console.log('Draw');
            console.log('Enter 1 to continue and 0 to leave the game');
            userScore += 1;
            computerScore += 1;
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('', (i) => {
                rl.close();
                resolve([parseInt(i), userScore, computerScore]);
            });
        }
    });
}

function playGame() {
    const choices = ['rock', 'paper', 'scissors'];

    console.log('Welcome to the game!');
    console.log('Enter:');
    console.log('r for rock');
    console.log('p for paper');
    console.log('s for scissors');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your name: ', (playerName) => {
        let i = 1;
        let userScoreTotal = 0;
        let computerScoreTotal = 0;

        const loop = () => {
            if (i === 1) {
                userInputChecker().then((userInput) => {
                    if (userInput === '') {
                        loop();
                        return;
                    }

                    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
                    console.log('Computer chooses: ' + computerChoice);

                    gameLogic(computerChoice, userInput, userScoreTotal, computerScoreTotal).then(([input, userScore, computerScore]) => {
                        i = input;
                        userScoreTotal = userScore;
                        computerScoreTotal = computerScore;

                        if (i === 0) {
                            console.log('Scores for this match are as follows:');
                            console.log(playerName + "'s score: " + userScoreTotal);
                            console.log('Computer\'s score: ' + computerScoreTotal);
                            console.log('Thank you for playing the game.');
                            console.log('Have a nice day!');
                            rl.close();
                        } else if (i !== 0 && i !== 1) {
                            console.log('Invalid Input!');
                            rl.question('Please enter 1 to continue or 0 to leave the game: ', (input) => {
                                i = parseInt(input);
                                loop();
                            });
                        } else {
                            loop();
                        }
                    });
                });
            }
        };

        loop();
    });
}

playGame();
