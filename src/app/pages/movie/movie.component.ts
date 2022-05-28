import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageSize } from '../../models/image-size';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  imagesSizes: ImageSize;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
    this.imagesSizes = IMAGES_SIZES;
  }

  movie: Movie | null = null;
  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getMovieSimilar(id);
    })
  }
  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(movie => {
      this.movie = movie;
    })
  }
  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
      if (movieVideosData) {
        console.log(movieVideosData);
        this.movieVideos = movieVideosData;
      }
    })
  }

  getMovieSimilar(id: string) {
    this.moviesService.getMovieSimilar(id).subscribe((movieSimilarData) => {
      console.log("getMovieSimilar", movieSimilarData);
      this.similarMovies = movieSimilarData;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      console.log("getMovieCredits", movieCreditsData)
      this.movieCredits = movieCreditsData;
    });
  }

  ngOnDestroy(): void {
    console.log("component destroyed");
  }
}
