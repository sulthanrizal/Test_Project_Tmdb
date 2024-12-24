import Home from "../@page/home/home";
import Movies from "../@page/movies/movies";
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
        path: '/view-movie/:id',
        element: <ViewMovie />
    }

]
export default router;