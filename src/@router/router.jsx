import Home from "../@page/home/home";
import Movies from "../@page/movies/movies";
import Series from "../@page/series/series";
import ViewMovie from "../@page/detailsMovie";

const router = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/movies',
        element: <Movies />
    },
    {
        path: '/series',
        element: <Series />
    },
    {
        path: '/view-movie/:id',
        element: <ViewMovie />
    }

]
export default router;