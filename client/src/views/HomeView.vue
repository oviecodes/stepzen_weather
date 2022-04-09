<template>
  <main>
    <!-- <TheWelcome /> -->

    <div v-if="loading == true">
      <h1><BIconGeoAlt/> Getting location data...</h1>
    </div>

    <div v-if="loading != true">

      <div class="display">
        <h2><BIconGeo /> Location Data</h2>
        <div class="margined">
          <p>Country: {{ weatherData.locationByIP.country }}</p>
          <p>Region: {{ weatherData.locationByIP.regionName }}({{ weatherData.locationByIP.region }})</p>
          <p>City: {{ weatherData.locationByIP.city }}</p>
        </div>
      </div>

      <div class="display">

        <h2 class=""><BIconThermometer /> Weather Data</h2>
        <div class="margined">
          <p>Main Temperature: {{ (parseFloat(weatherData.locationByIP.weather.main.temp) - 273.15).toFixed(2) }}<sup>o</sup>C</p>
          <p>TimeZone: {{ weatherData.locationByIP.weather.timezone }}</p>
          <p>Wind Degree: {{ weatherData.locationByIP.weather.wind.deg }}<sup>o</sup></p>
          <p>Weather description: <BIconCloudHazeFill /> {{ weatherData.locationByIP.weather.weather[0].description }}</p>
          <p>Main Weather: {{ weatherData.locationByIP.weather.weather[0].main }}</p>
        </div>
        
      </div>
    </div>
    
   
  </main>
</template>

<style scoped>

.margined {
  margin: 5px 0;
}

.display {
  margin-bottom: 20px;
}

h2 {
  font-weight: 700;
}

.display p {
  padding: 5px 0;
}

</style>

<script>
import TheWelcome from '@/components/TheWelcome.vue'

import axios from 'axios'

export default {

  data() {
    return {
      weatherData: '',
      loading: true
    }
  },

  async created() {

    const { data } = await axios.get('http://ip-api.com/json/')

    console.log(data)

    const graphqlQuery = {
      operationName: "MyQuery",
      query: `query MyQuery {
        locationByIP(ip: "${data.query}") {
          lat
          lon
          country
          countryCode
          city
          region
          regionName
          weather {
            timezone
            main {
              feels_like
              humidity
              pressure
              temp
              temp_max
              temp_min
            }
            wind {
              deg
              speed
            }
            weather {
              icon
              description
              main
              id
            }
          }
        }
      }`,
      variables: {}
    };

    console.log(JSON.stringify(graphqlQuery))    

    const res = await axios(
      `http://localhost:3200/`,
      {
      method: 'POST',
      data: graphqlQuery
    })

    console.log('result', res.data.data)
    this.weatherData = res.data.data

    this.loading = false
    
  }
}
</script>
