import SelUni from "@/app/components/SelUni/SelUni";
import Road from "@/app/components/Road/Road";
import News from "@/app/components/News/News";
import CarouselH from "@/app/components/Carousel/CarouselH";
import Partners from "@/app/components/Partners/Partners";


function Index({ dir }) {
    return (
        <div>
            <CarouselH/>
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