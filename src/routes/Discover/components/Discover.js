import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';



export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {

    //create a variable for the accessToken to be used in accesing the Spotify API
    //This Token will expire after a certain amount of time.  A new token will need to be requested for API call to be successful. 
    let accessToken = "BQBIfQNEt2FZxvN4JbGls-OyVxsArE0-pJT5gn2mdsuJtN3hIRIXLCOArnuiFhKAHnVFX085FjVJSNgOIx66idQ891PkmIzUYtyxJoSgPTN5n06ze6eJH4QmsfpkKZTu9GrXqFi5aw";

    // User Fetch API to get data from Spotify API.
    fetch('https://api.spotify.com/v1/browse/new-releases', {headers: {
      'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => {
        this.setState({
          newReleases: data.albums.items.map(item => {
             console.log(data.albums.items)
             return {
               name: item.name,
               images: item.images[2].url,
               link: item.external_urls.spotify
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
              console.log(data.playlists.items)
               return{
                 name: item.name,
                 images: item.images[0].url,
                 link: item.external_urls.spotify
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
                icons: item.icons[0].url,
                link: item.href
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
