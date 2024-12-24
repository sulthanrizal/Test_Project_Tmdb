import axios from "axios"

export const getAccount = async (setAccount) => {
    try {
        const response = await axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/account/21678051`,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzNhZWQ3NzAwYTY4NjlhZDU0OGY5MDE3MTUxMzVjNiIsIm5iZiI6MTczMzcyMTY5MS43MTgwMDAyLCJzdWIiOiI2NzU2N2U1YjA5ODJiNDYyNjc4YTIwNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GX7is4nB_NlQR8jNGu7xigLrFM3oWzM9xZyyoFGDNCQ"
            }
        })
        setAccount(response?.data || [])
    } catch (error) {
        console.log(error, "ERORRR!!!")
    }
}
export const getMovieTrending = async (setMovie) => {
    try {
        const response = await axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/trending/movie/day`,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzNhZWQ3NzAwYTY4NjlhZDU0OGY5MDE3MTUxMzVjNiIsIm5iZiI6MTczMzcyMTY5MS43MTgwMDAyLCJzdWIiOiI2NzU2N2U1YjA5ODJiNDYyNjc4YTIwNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GX7is4nB_NlQR8jNGu7xigLrFM3oWzM9xZyyoFGDNCQ"
            }
        })
        setMovie(response.data.results || [])

    } catch (error) {
        console.log(error, "ERORRR!!!")
    }
}

export const getListMovie = async (setListMovie) => {
    try {

        const apiKey = '6c3aed7700a6869ad548f901715135c6';
        const response = await axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzNhZWQ3NzAwYTY4NjlhZDU0OGY5MDE3MTUxMzVjNiIsIm5iZiI6MTczMzcyMTY5MS43MTgwMDAyLCJzdWIiOiI2NzU2N2U1YjA5ODJiNDYyNjc4YTIwNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GX7is4nB_NlQR8jNGu7xigLrFM3oWzM9xZyyoFGDNCQ'
            }
        })
        setListMovie(response.data.results)
    } catch (error) {
        console.log(error, 'ERORRR')
    }
}

export const getDetailsMovie = async (id, setData) => {
    try {
        const response = await axios({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzNhZWQ3NzAwYTY4NjlhZDU0OGY5MDE3MTUxMzVjNiIsIm5iZiI6MTczMzcyMTY5MS43MTgwMDAyLCJzdWIiOiI2NzU2N2U1YjA5ODJiNDYyNjc4YTIwNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GX7is4nB_NlQR8jNGu7xigLrFM3oWzM9xZyyoFGDNCQ'
            }
        })
        setData(response?.data)
    } catch (error) {
        console.log(error, 'ERORRR')
    }
}
