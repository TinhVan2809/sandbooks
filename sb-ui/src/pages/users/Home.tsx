import Banner from "../../components/users/Banner";
import CuratedSelection from "../../components/users/CuratedSelection";
import Recommended from "../../components/users/Recommended";
import Search from "../../components/users/Search";

function Home() {
    return (
        <>

            <Banner />

            <Search />

            <CuratedSelection />

            <Recommended />
        </>
    );
}

export default Home;