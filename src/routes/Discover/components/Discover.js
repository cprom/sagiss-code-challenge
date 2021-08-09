import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';



export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      character: []
    };
  }


 
  componentDidMount() {
   
    let accessToken = "BQBb62Q1J3mO1TCo_enU8QPEIbokS9HkrQKmNObWhm9KINi4bglHJ1mZPZ0TgOP90Zyr35oA9R84F9TBEjDFWreVpSiL_7NVH0my6DjQozTGpxuXrtLGoG6Z8sPEkcyW2YMGbIAxGg";
    

    fetch('https://api.spotify.com/v1/browse/new-releases', {headers: {
      'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => {
        this.setState({
          newReleases: data.albums.items.map(item => {
            // console.log(data.albums.items)
             return {
               name: item.name,
               images: item.images[2].url
             }
          })
          
        })
       // console.log(data)
      })

        
      fetch('	https://api.spotify.com/v1/browse/featured-playlists', {headers: {
        'Authorization': 'Bearer ' + accessToken
    }} )
  
        .then(response => response.json())
        .then(data => {
          this.setState({
            playlists: data.playlists.items.map(item => {
              //console.log(data.playlists.items)
               return{
                 name: item.name,
                 images: item.images[0].url
               }
            })
          })
          //console.log(data)
        })
     
    
      fetch('	https://api.spotify.com/v1/browse/categories', {headers: {
        'Authorization': 'Bearer ' + accessToken
    }} )
  
        .then(response => response.json())
        .then(data => {
          this.setState({
            categories: data.categories.items.map(item => {
              console.log(data.categories.items)
              return {
                icons: item.icons[0].url
              }
            })
          })
          //console.log(data)
        })

    
  }
  
    
   
  render() {
    const { newReleases, playlists, categories } = this.state;


    return (
      <div className="discover">
        <img src={newReleases.images} alt="" />
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} /> 
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
