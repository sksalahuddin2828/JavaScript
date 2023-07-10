const readline = require('readline');
const open = require('open');
const axios = require('axios');
const cheerio = require('cheerio');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function openWeatherReport(city) {
  console.log(`Opening the weather report for ${city}.`);
  axios.get(`https://www.weather-forecast.com/locations/${city}/forecasts/latest`)
    .then(response => {
      const $ = cheerio.load(response.data);
      const weatherElements = $('.b-forecast__table-description-content');
      weatherElements.each((index, element) => {
        console.log($(element).text().trim());
      });
    })
    .catch(error => {
      console.log('Failed to fetch weather information. Please try again later.');
    });
}

function fatherOfTheNationOfBangladesh() {
  console.log('The Father of the Nation Bangabandhu Sheikh Mujibur Rahman is the architect of independent Bangladesh.');
  console.log('He played a vital role in the liberation movement and is revered as a national hero.');
}

function getIPAddress() {
  axios.get('https://checkip.amazonaws.com')
    .then(response => {
      const ipAddress = response.data.trim();
      console.log(`Your IP address is: ${ipAddress}`);
    })
    .catch(error => {
      console.log('Failed to retrieve IP address. Please try again later.');
    });
}

function openWikipedia() {
  open('https://www.wikipedia.org/')
    .catch(() => {
      console.log('Failed to open Wikipedia. Please try again later.');
    });
}

function searchOnWikipedia() {
  rl.question('What would you like to search on Wikipedia? ', query => {
    open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`)
      .catch(() => {
        console.log('Failed to search on Wikipedia. Please try again later.');
      });
    rl.close();
  });
}

function searchOnYouTube() {
  rl.question('What would you like to search on YouTube? ', query => {
    open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`)
      .catch(() => {
        console.log('Failed to search on YouTube. Please try again later.');
      });
    rl.close();
  });
}

function playOnYouTube() {
  rl.question('What would you like to play on YouTube? ', query => {
    open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`)
      .catch(() => {
        console.log('Failed to play on YouTube. Please try again later.');
      });
    rl.close();
  });
}

function openYouTube() {
  open('https://www.youtube.com/')
    .catch(() => {
      console.log('Failed to open YouTube. Please try again later.');
    });
}

function getDateAndTime() {
  const currentDate = new Date();
  const dateTime = currentDate.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  console.log(`The current date and time is: ${dateTime}`);
}

function getLocalTime() {
  const currentTime = new Date().toLocaleTimeString('en-US');
  console.log(`The current local time is: ${currentTime}`);
}

function getTodayDate() {
  const currentDate = new Date();
  const todayDate = currentDate.toLocaleDateString('en-US');
  console.log(`Today's date is: ${todayDate}`);
}

function openFacebook() {
  open('https://www.facebook.com/')
    .catch(() => {
      console.log('Failed to open Facebook. Please try again later.');
    });
}

function openFacebookProfile() {
  open('https://www.facebook.com/profile.php')
    .catch(() => {
      console.log('Failed to open Facebook profile. Please try again later.');
    });
}

function openFacebookSettings() {
  open('https://www.facebook.com/settings')
    .catch(() => {
      console.log('Failed to open Facebook settings. Please try again later.');
    });
}

function openFacebookReel() {
  open('https://www.facebook.com/reels')
    .catch(() => {
      console.log('Failed to open Facebook Reels. Please try again later.');
    });
}

function openFacebookMessenger() {
  open('https://www.messenger.com/')
    .catch(() => {
      console.log('Failed to open Facebook Messenger. Please try again later.');
    });
}

function openFacebookVideo() {
  open('https://www.facebook.com/videos')
    .catch(() => {
      console.log('Failed to open Facebook videos. Please try again later.');
    });
}

function openFacebookNotification() {
  open('https://www.facebook.com/notifications')
    .catch(() => {
      console.log('Failed to open Facebook notifications. Please try again later.');
    });
}

function openGoogleBrowser() {
  open('https://www.google.com/')
    .catch(() => {
      console.log('Failed to open Google. Please try again later.');
    });
}

function openGoogleMail() {
  open('https://mail.google.com/')
    .catch(() => {
      console.log('Failed to open Google Mail. Please try again later.');
    });
}

function openGoogleEarth() {
  open('https://www.google.com/earth/')
    .catch(() => {
      console.log('Failed to open Google Earth. Please try again later.');
    });
}

function googleEarthSpecifyCity() {
  rl.question('Which city do you want to see on Google Earth? ', city => {
    open(`https://www.google.com/earth/geo/${encodeURIComponent(city)}/`)
      .catch(() => {
        console.log('Failed to open Google Earth for the specified city. Please try again later.');
      });
    rl.close();
  });
}

function openGoogleMap() {
  open('https://www.google.com/maps/')
    .catch(() => {
      console.log('Failed to open Google Map. Please try again later.');
    });
}

function googleMapSpecifyCity() {
  rl.question('Which city do you want to see on Google Map? ', city => {
    open(`https://www.google.com/maps/place/${encodeURIComponent(city)}/`)
      .catch(() => {
        console.log('Failed to open Google Map for the specified city. Please try again later.');
      });
    rl.close();
  });
}

function googleTranslateSpecifyWord() {
  rl.question('Which word or sentence do you want to translate to English? ', text => {
    open(`https://translate.google.com/#auto/en/${encodeURIComponent(text)}`)
      .catch(() => {
        console.log('Failed to open Google Translate. Please try again later.');
      });
    rl.close();
  });
}

function tellJoke() {
  axios.get('https://www.jokes4us.com/miscellaneousjokes/cleanjokes.html')
    .then(response => {
      const $ = cheerio.load(response.data);
      const jokeElements = $('div[style="font-size:medium;"]');
      jokeElements.each((index, element) => {
        console.log($(element).text().trim());
      });
    })
    .catch(error => {
      console.log('Failed to fetch a joke. Please try again later.');
    });
}

function translateLanguages() {
  rl.question('Which language do you want to translate from? ', fromLanguage => {
    rl.question('Which language do you want to translate to? ', toLanguage => {
        rl.question('What do you want to translate? ', text => {
          open(`https://translate.google.com/#${encodeURIComponent(fromLanguage)}/${encodeURIComponent(toLanguage)}/${encodeURIComponent(text)}`)
            .catch(() => {
              console.log('Failed to open Google Translate. Please try again later.');
            });
          rl.close();
        });
      });
    });
}

function availableCommands() {
  console.log('Available commands:');
  console.log('- Weather: Get the weather report of a city');
  console.log('- Father of the Nation of Bangladesh: Learn about the Father of the Nation of Bangladesh');
  console.log('- IP address: Get your IP address');
  console.log('- Opening Wikipedia: Open the Wikipedia homepage');
  console.log('- Search on Wikipedia: Search for a specific topic on Wikipedia');
  console.log('- Search on YouTube: Search for a video on YouTube');
  console.log('- Play on YouTube: Search and play a video on YouTube');
  console.log('- Open YouTube: Open the YouTube homepage');
  console.log('- Date and Time: Get the current date and time');
  console.log('- Today\'s Time: Get the current local time');
  console.log('- Today\'s Date: Get today\'s date');
  console.log('- Opening Facebook: Open the Facebook homepage');
  console.log('- Facebook Profile: Open your Facebook profile');
  console.log('- Facebook Settings: Open the Facebook settings page');
  console.log('- Facebook Reels: Open Facebook Reels');
  console.log('- Facebook Messenger: Open Facebook Messenger');
  console.log('- Facebook Video: Open Facebook videos');
  console.log('- Facebook Notification: Open Facebook notifications');
  console.log('- Opening Google: Open the Google homepage');
  console.log('- Opening Gmail: Open Google Mail');
  console.log('- Google Earth: Open Google Earth');
  console.log('- Google City: View a city on Google Earth');
  console.log('- Google Map: Open Google Map');
  console.log('- City from Map: View a city on Google Map');
  console.log('- Translate to English: Translate a word or sentence to English');
  console.log('- Listen a Joke: Listen to a joke');
  console.log('- Translation between two languages: Translate text between two languages');
  console.log('- What can you do: Get the list of available commands');
  console.log('- Who made you: Know who made this digital assistant');
  console.log('- What is your name: Know the name of this digital assistant');
  console.log('- Ask: Ask a computational or geographical question');
}

function whoMadeYou() {
  console.log('I was created by Sk. Salahuddin from Khulna, Bangladesh.');
}

function whatIsYourName() {
  console.log('My name is Digital Assistant.');
}

function computationalGeographicalQuestion() {
  console.log('Please ask your question:');
  rl.question('', question => {
    console.log('Sorry, I\'m unable to answer computational or geographical questions at the moment.');
    rl.close();
  });
}

console.log('Sk. Salahuddin - Khulna');

rl.question('How may I assist you? ', userCommand => {
  userCommand = userCommand.toLowerCase();

  if (userCommand.includes('exit') || userCommand.includes('close') || userCommand.includes('off') ||
    userCommand.includes('good bye') || userCommand.includes('bye') || userCommand.includes('ok bye') ||
    userCommand.includes('turn off') || userCommand.includes('shutdown') || userCommand.includes('no thanks') ||
    userCommand.includes('stop')) {
    console.log('Assistant Shut Down');
    console.log('Take care and see you later');
    rl.close();
  } else {
    console.log('Please wait');
    performAction(userCommand);
  }
});
