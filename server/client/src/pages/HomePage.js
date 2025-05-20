import Layout from "../components/Layout/Layout";
import HorizontalScroll from "../components/HomeComponents/HorizontalScroll";
import CollectionPage from "../components/HomeComponents/CollectionPage";
import Banner from "../components/HomeComponents/Banner";
import About from "../components/HomeComponents/About";
import Contact from "../components/HomeComponents/Contact";


const HomePage = () => {


  return (
    <Layout title={"theSlipStitch"}>

      <Banner/>
      <CollectionPage/>
      <HorizontalScroll/>
      <About/>
      <Contact/>
      
    </Layout>
  );
};

export default HomePage;
