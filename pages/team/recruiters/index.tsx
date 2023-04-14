import Search from "@/components/searchBar";
import EmptyState from "@/components/emptyState";
import Images from "@/public/assets/icons";

const Recruiters = () => {
  return (
    <>
      <Search />
      <EmptyState
        image={Images.emptyStateImage}
        title="Nothing to see here!"
        subTitle="Click on + to add a recruiter"
      />
    </>
  );
};

export default Recruiters;
