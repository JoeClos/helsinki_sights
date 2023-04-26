import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.weatherData = {
      main: {}
    }
    this.getWeatherData();
  }

  getWeatherData() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Helsinki&lang=fi&appid=997a0dee14d61ff4b20c490f42cf6b3f")
    .then(response => response.json())
    .then(data => {this.setWeatherData(data);
    })
  }

  setWeatherData(data: any): void {
    this.weatherData = data;

    const date0 = new Date(this.weatherData.list[0].dt * 1000);
    this.weatherData.date_0 = date0.toTimeString().slice(0,5);
    this.weatherData.temp_celcius_0 = (this.weatherData.list[0].main.temp - 273.15).toFixed(1);
    this.weatherData.icon_0 = "https://openweathermap.org/img/wn/" + this.weatherData.list[0].weather[0].icon + ".png";
  }
}