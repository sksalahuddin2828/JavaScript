class WifiProfile {
  constructor(ssid, password) {
    this.ssid = ssid;
    this.password = password;
  }

  toString() {
    return `SSID: ${this.ssid}, Password: ${this.password}`;
  }
}

function getWifiProfiles() {
  const wifiList = [];

  const command = 'netsh wlan show profiles';
  const commandOutput = require('child_process').execSync(command).toString();

  const profileRegex = /    All User Profile\s+: (.*)\r/g;
  let match;
  while ((match = profileRegex.exec(commandOutput))) {
    const profile = match[1];

    const profileCommand = `netsh wlan show profile "${profile}" key=clear`;
    const profileOutput = require('child_process').execSync(profileCommand).toString();

    if (!profileOutput.includes('Security key           : Absent')) {
      const password = profileOutput.match(/Key Content\s+: (.*)\r/)[1];
      wifiList.push(new WifiProfile(profile, password));
    }
  }

  return wifiList;
}

const wifiList = getWifiProfiles();

wifiList.forEach((wifiProfile) => {
  console.log(wifiProfile.toString());
});
