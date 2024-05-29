import { Carousel } from "./components/Carousel";
import { ExploreTopMeals } from "./components/ExploreTopMeals";
import { MemberServices } from "./components/MemberServices";
import { SuccessStories } from "./components/SuccessStories";

export const HomePage = () => {
  return (
    <>
      <ExploreTopMeals />
      <Carousel />
      <SuccessStories />
      <MemberServices />
    </>
  );
};
