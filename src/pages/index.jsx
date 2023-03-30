import SelUni from "@/app/components/SelUni/SelUni";
import Road from "@/app/components/Road/Road";
import News from "@/app/components/News/News";
import Carousel from "@/app/components/Carousel/Carousel";
import Partners from "@/app/components/Partners/Partners";

function Index(props) {
    return (
        <div>
            <Carousel/>
            <SelUni/>
            <Road/>
            <News/>
            <Partners/>
        </div>
    );
}

export async function getServerSideProps(context) {

  return {
      props: {}
  }
}


export default Index;