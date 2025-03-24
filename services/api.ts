export const TMDB_CONFIG = {
	BASE_URL: 'https://api.themoviedb.org/3',
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
	},
};

const baseImageUrl = 'https://image.tmdb.org/t/p/';

// Image URL
export const image500 = (path: string | null | undefined): string => {
	return path ? `${baseImageUrl}/w500${path}` : '';
};

export const image185 = (path: string | null | undefined): string => {
	return path ? `${baseImageUrl}/w185${path}` : '';
};

// fallback function for API calls
export const fallbackProfileImage =
	'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png';

export const fetchMovies = async ({
	query,
}: {
	query: string;
}): Promise<Movie[]> => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

	const response = await fetch(endpoint, {
		method: 'GET',
		headers: TMDB_CONFIG.headers,
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch movies: ${response.statusText}`);
	}

	const data = await response.json();
	return data.results;
};

export const fetchMovieDetails = async (
	movieId: string
): Promise<MovieDetails> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch movie details: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching movie details:', error);
		throw error;
	}
};

export const fetchRelatedMovies = async (movieId: string): Promise<Movie[]> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch related movies: ${response.statusText}`);
		}

		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error('Error fetching related movies:', error);
		throw error;
	}
};

export const fetchMovieCredits = async (
	movieId: string
): Promise<Credits[]> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch movie credits: ${response.statusText}`);
		}

		const data = await response.json();
		return data.cast;
	} catch (error) {
		console.error('Error fetching movie credits:', error);
		throw error;
	}
};

export const fetchPersonDetails = async (personId: string): Promise<Cast> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/person/${personId}?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch person details: ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching person details:', error);
		throw error;
	}
};

export const fetchPersonMovieCredits = async (
	personId: string
): Promise<Movie[]> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/person/${personId}/movie_credits?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch person movie credits: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data.cast;
	} catch (error) {
		console.error('Error fetching person movie credits:', error);
		throw error;
	}
};

export const fetchTopTreandingMovies = async (): Promise<Movie[]> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/trending/movie/day?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.headers,
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch trending movies: ${response.statusText}`
			);
		}

		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error('Error fetching trending movies:', error);
		throw error;
	}
};
