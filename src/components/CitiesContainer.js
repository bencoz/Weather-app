import React from "react";
import LocationWeather from "./LocationWeather.js"


export default class CitiesContainer extends React.Component {
    
    render(){
        let items = this.props.locationsData.map((weather) => {
                        return (<LocationWeather 
                            key = {weather.name+Math.random()}
                            name={weather.name}
                            temp={weather.temp}
                            humidity={weather.humidity}
                            windspeed={weather.windSpeed}
                            state={weather.state}
                            closeWeather={this.props.closeWeather}/>)
                });
        return(
            <div className='cities-container'>
                <div className='title'>
                    <h1>Weather Locations</h1>
                </div>
                {items}
            </div>
        )
    }
}