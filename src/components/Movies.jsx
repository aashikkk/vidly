import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
	state = {
		movies: getMovies(),
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	render() {
		const { length: count } = this.state.movies;

		if (count === 0) return <p>There are no movies in the database</p>;

		return (
			<>
				<p> Showing {count} in the database. </p>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.handleLike(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className="btn btn-danger btn-sm">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}

export default Movies;

// MovieRow = ({ id, title, genre, numberInStock, dailyRentalRate }) => (
//     <tr key={id}>
//       <td>{title}</td>
//       <td>{genre}</td>
//       <td>{numberInStock}</td>
//       <td>{dailyRentalRate}</td>
//     </tr>
//   );

//   MovieTable = () => (
//     <div>
//       <p> There are {} movies in database.</p>
//       <table>
//         <thead>
//           <th>Title</th>
//           <th>Genre</th>
//           <th>Stock</th>
//           <th>Rate</th>
//         </thead>
//         <tbody>{getMovies.map(this.MovieRow)}</tbody>
//       </table>
//     </div>
//   );
