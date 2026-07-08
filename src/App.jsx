import TechTrixNepal from "./pages/techTrixHome";
import Events from "./pages/events";
import EventPage from "./pages/eventPage";
import {Routes,Route } from "react-router-dom";
import ScrollToTop from "./component/scrollTotop";

const App =()=>{
    return(
        <>
        <ScrollToTop/>
        <Routes>
            <Route path="/" element={<TechTrixNepal/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/events/:slug" element={<EventPage/>}/>
        </Routes>
        </>
    )
}
export default App