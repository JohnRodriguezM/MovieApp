"use strict";

import { URLS } from "./utils/urls.mjs";

import {DOM_ELEMENTS} from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY } = URLS;

const {  trendingMoviesPreviewList, categoriesPreviewList } = DOM_ELEMENTS;


//!
export const getTrendingMoviesPreview = async () => {
  try {
    let response = await fetch(URL_TRENDING_MOVIES)
    let json = await response.json();
    const data = json.results;
    /*console.log(data)*/ //! me trae la data completa

    const mapeo = data.map(movie => {
      //! en esta funcion me permito recortar la data a ciertas propiedades para no hacer muy grande el json
      return {
        adult: movie.adult,
        id: movie.id,
        title: movie.title,
        backPath: movie.backdrop_path,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        overview: movie.overview,
        releaseDate: movie.release_date
      }
    })
    const mapOverMap = mapeo.map(elMap => {
      let imageMovie = `https://image.tmdb.org/t/p/w400${elMap.backPath}`
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-container')

      const img = document.createElement('img')
      img.classList.add('movie-img')

      movieContainer.appendChild(img)

      img.src = imageMovie;

      trendingMoviesPreviewList.appendChild(movieContainer)

    })

    //*


  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get tendencies');*/
  }
}


export const getCategegoriesPreview = async () => {
  try {
    let response = await fetch(URL_CATEGORY)
    let json = await response.json();
    const data = json.genres;
    /*console.log(data)*/ //! me trae la data completa

    const mapeoCategories = data.map(elMap => {
      let id = `id${elMap.id}`
      const categoryContainer = document.createElement('div')
      const categoryTitle = document.createElement('h3')

      //*div
      categoryContainer.classList.add('category-container')
      //*h3
      categoryTitle.classList.add('category-title')
      categoryTitle.id = id
      //*div
      categoryContainer.appendChild(categoryTitle)
      //*h3
      categoryTitle.innerHTML = elMap.name;
      //!father container
      categoriesPreviewList.appendChild(categoryContainer)

    }
    )
    //*
  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get categories');*/
  }
}






//*funciones que se ejecutan a la carga de la website

/*window.addEventListener('DOMContentLoaded', (event) => {
  getTrendingMoviesPreview()
  getCategegoriesPreview()
})
*/