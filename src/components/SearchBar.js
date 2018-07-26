import React from "react";

export default class SearchBar extends React.Component {
    render(){
        return(
            <div>
                <div className='title'>
                    <h1>Search</h1>
                </div>
                <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" style={{display: "none"}}></iframe>
                <form onSubmit={this.props.handleSearch} target="dummyframe">
                    <label className="location-label" htmlFor="location"> Location: </label>
                    <input className="location-input" name="location"/>                        
                    <input className="submit-btn btn" type="submit" value="Search" method="post"/>
                </form>
            </div>
        );
    }
}