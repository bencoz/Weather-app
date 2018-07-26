import React from 'react';
import SearchBar from './SearchBar.js';
import CitiesContainer from './CitiesContainer.js';
const SERVER_URL = 'http://localhost:3000/';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            locationsData: [],
            hasFetched: false
        }
    }

    async crawl(search, handleData){
        let url = SERVER_URL + search;
        try {
            let res = await fetch(url, {method: 'GET'});
            let data = await res.json();
            return data;
        } catch(err){
            console.log(err);
            throw err;
        }
        // await fetch(url, {method: 'GET'})
        // .then(function(response) {
        //   if (!response.ok){
        //       throw response;
        //   }
        //   return response.json();            
        // }).then(function(myJson) {
        //   console.log(myJson);
        //   //handleData(myJson);
        //   //this.handleData(myJson);
        //   return myJson;
        // })
        // .catch(err => { console.log(err);
        //                 /*throw err;*/ });
    }

    handleSearch(e){
        let data = e.target.elements.location.value;
        let newLocations = this.state.locations;
        newLocations.push(data);
        this.setState({locations: newLocations}, this.wraper(data));
    }

    wraper(data){
        this.crawl(data).then((newData) => this.handleData(newData));
    }

    handleData(data, stop){
        let newData = this.state.locationsData;
        newData.push(data);
        this.setState({
            locationsData: newData,
        });
    }

    closeWeather(name){
        let realName = name.target.attributes.getNamedItem('name').nodeValue;
        let newData = this.state.locationsData;
        let toRemove = newData.filter(obj => {
            return obj.name === realName
          })
        newData.splice(newData.indexOf(toRemove.pop()), 1);
        this.setState({
            locationsData: newData
        });
    }

    componentWillMount(){
        this.init();
    }

    
    init(){
        this.crawl("Tel Aviv").then((data) => this.handleData(data));
        this.crawl("Berlin").then((data) => this.handleData(data));
    }

    render(){
        return(
            <div>
                <SearchBar handleSearch={this.handleSearch.bind(this)} />
                <CitiesContainer 
                    locationsData={this.state.locationsData} 
                    closeWeather={this.closeWeather.bind(this)}
                />
            </div>
        )
    }
}