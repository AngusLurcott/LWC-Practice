import { LightningElement, track } from 'lwc';

export default class WeatherMap extends LightningElement {

    @track
    showWeather=false;
    latInput = '';
    longInput = '';
    temperatureData = [];


    handleLongInput(event) {
        this.longInput = event.target.value;
    }

    handleLatInput(event) {
        this.latInput = event.target.value;
    }

    handleSubmit() {

        if(this.latInput && this.longInput) {
            this.makeCallout()
            .then(data => {
                if(data) {
                    console.log('Returned data : ', data);
                    this.temperatureData = data.hourly.temperature_2m;
                } else {
                    console.log('No Data returned');
                }
            })
            .catch(error => {
                console.log('Erorr : ', error);
            });
            this.showWeather = true;
        }
    }

    async makeCallout() {
        try {
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.latInput}&longitude=${this.longInput}&hourly=temperature_2m`);

          if (response.ok) {
            let data = await response.json();
            console.log('Response data:', data);
            return data;
          } else {
            console.error('ERROR:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('ERROR:', error);
        }

        return null;
      }
      



}