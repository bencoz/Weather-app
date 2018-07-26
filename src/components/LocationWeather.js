import React from "react";

export default class LocationWeather extends React.Component {

    render(){
        let srcurl = `./resources/icons/${this.props.state}.png`;
        return(
        <div className='location-weather-container'>
            <div className='close-btn' onClick={this.props.closeWeather} name={this.props.name}>&times;</div>
            <span className="icon">
                <img src={srcurl} alt={this.props.state} width="100" height="100"></img>
            </span>
            <ul>
                <li>Name:<strong className='name'>{this.props.name}</strong></li>
                <li>Temperture:<strong className='temp'>{this.props.temp}°</strong></li>
                <li>Humidity:&emsp;&emsp;<strong className='humidity'>{this.props.humidity}</strong></li>
                <li>WindSpeed:&emsp;<strong className='wind'>{this.props.windspeed}</strong></li>
            </ul>
        </div>
        )
    }
}