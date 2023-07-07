const { dialog } = require('electron').remote;
const { app } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Function to select a file
function selectFile() {
  const file = dialog.showOpenDialogSync({
    title: 'Select an audio file',
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }
    ]
  });

  if (file && file.length > 0) {
    return file[0];
  }
  return '';
}

// Function to play the selected file
function playMusic(filePath) {
  const player = spawn('ffplay', ['-nodisp', '-autoexit', filePath]);
  player.on('exit', () => {
    player.kill();
  });
}

// Function to stop the music
function stopMusic() {
  spawn('taskkill', ['/IM', 'ffplay.exe', '/F']);
}

let filePath = selectFile();
if (filePath) {
  playMusic(filePath);
}

while (true) {
  console.log('1. Select a file');
  console.log('2. Stop music');
  console.log('3. Exit');
  const choice = prompt('Enter your choice: ');

  switch (choice) {
    case '1':
      filePath = selectFile();
      if (filePath) {
        playMusic(filePath);
      }
      break;
    case '2':
      stopMusic();
      break;
    case '3':
      app.quit();
      break;
  }
}
