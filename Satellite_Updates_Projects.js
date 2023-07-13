const axios = require('axios');
const Skyfield = require('skyfield');
const { linspace } = require('mathjs');

class SatelliteData {
  constructor(name, tle_line1, tle_line2, angle) {
    this.name = name;
    this.tle_line1 = tle_line1;
    this.tle_line2 = tle_line2;
    this.angle = angle;
  }
}

class SatelliteDbEntry {
  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
}

async function sendGetRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(`Error in sendGetRequest: ${error.message}`);
    throw error;
  }
}

(async function () {
  try {
    // Step 1: Retrieve satellite data from the API
    const satelliteDataApiUrl = 'API_URL_HERE';
    const satelliteDataJson = await sendGetRequest(satelliteDataApiUrl);
    const satelliteData = JSON.parse(satelliteDataJson).map(
      (data) => new SatelliteData(data.name, data.tle_line1, data.tle_line2, data.angle)
    );

    // Step 2: Parse TLE data using Skyfield
    const tleData = satelliteData.map((satellite) => [satellite.tle_line1, satellite.tle_line2]);

    // Step 3: Visualize satellite orbits in 3D
    const loader = new Skyfield.Loader('path_to_data_directory');
    const ephemeris = loader.load('de421.bsp');
    const satellites = loader.parseTleFile(tleData);

    const fig = plt.figure();
    const ax = fig.add_subplot(111, { projection: '3d' });

    for (const satellite of satellites) {
      // Calculate the satellite's position over time
      const ts = loader.makeTimescale();
      const t = ts.utc(2023, 7, 11, 0, linspace(0, 3600 * 60, 3600));
      const geocentric = satellite.at(t);
      const subpoint = geocentric.subpoint();

      // Extract latitude, longitude, and altitude
      const latitude = subpoint.latitude.degrees;
      const longitude = subpoint.longitude.degrees;
      const altitude = subpoint.elevation.km;

      // Plot the satellite's trajectory in 3D
      ax.plot(longitude, latitude, altitude);
    }

    ax.set_xlabel('Longitude');
    ax.set_ylabel('Latitude');
    ax.set_zlabel('Altitude (km)');

    // Step 4: Map satellites to countries using the satellite database API
    const satelliteDbApiUrl = 'SATELLITE_DB_API_URL_HERE';
    const satelliteDbJson = await sendGetRequest(satelliteDbApiUrl);
    const satelliteDb = JSON.parse(satelliteDbJson).map(
      (entry) => new SatelliteDbEntry(entry.name, entry.country)
    );

    // Mapping satellite names to countries
    const satelliteCountryMap = {};
    for (const satellite of satelliteData) {
      const entry = satelliteDb.find((dbEntry) => dbEntry.name === satellite.name);
      const country = entry ? entry.country : 'Unknown';
      satelliteCountryMap[satellite.name] = country;
    }

    // Printing satellite information
    for (const satellite of satelliteData) {
      const name = satellite.name;
      const angle = satellite.angle;
      const country = satelliteCountryMap[name];

      console.log(`Satellite Name: ${name}`);
      console.log(`Orbital Angle: ${angle} degrees`);
      console.log(`Country: ${country}`);
      console.log();
    }

    // Show the 3D plot
    plt.show();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
})();
