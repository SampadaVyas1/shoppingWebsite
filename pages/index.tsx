import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import Button from "@/components/button";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import SkeletonLoader from "@/components/skeletonLoader";
import ROUTES from "@/common/routes";
import Table from "@/components/table";
import Select from "@/components/select";
import Images from "@/public/assets/images";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import styles from "../styles/Home.module.scss";
import ButtonGroup from "@/components/buttonGroup";
import MultiSelectOptions from "@/components/select/multiselectOptions";

const Home = () => {
  const { loaderSpinner } = Images;

  const context = useContext(AuthContext);

  const { isLoggedIn, handleLogin } = context;
  const router = useRouter();

  const handleLogout = () => {
    handleLogin();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY}>Welcome</Typography>
      <InputBox
        label="Enter you text here"
        placeholder="Enter your text here.."
      />
      <Select
        options={[
          { id: 0, label: "Tomato" },
          { id: 1, label: "Potato" },
          { id: 2, label: "gdjgwe" },
          { id: 3, label: "sjdjg" },
          { id: 4, label: "kasjdjg" },
          { id: 5, label: "jhfh" },
        ]}
      />

      <Button startIcon={loaderSpinner} variant={BUTTON_VARIANT.CONTAINED}>
        Play
      </Button>
      <Button startIcon={loaderSpinner} variant={BUTTON_VARIANT.OUTLINED}>
        Play
      </Button>
      <Button variant={BUTTON_VARIANT.TEXT}>Play</Button>
      <Button onClick={handleLogout}>Logout</Button>
      {!isLoggedIn && <Loader />}
      <div className={styles.profileLoader}>
        <SkeletonLoader type="circle" />
        <div className={styles.content}>
          <SkeletonLoader type="textLarge" />
          <SkeletonLoader type="textMedium" />
          <SkeletonLoader type="textSmall" />
        </div>
      </div>
      <Table />
      <ButtonGroup
        buttons={[
          "Today",
          "Tomorrow",
          "7 Days",
          "12 months",
          "2 years",
          "5 years",
        ]}
        orientation="horizontal"
      />
      <Select
        multiSelect={true}
        options={[
          { id: 0, label: "Tomato" },
          { id: 1, label: "Potato" },
          { id: 2, label: "gdjgwe" },
          { id: 3, label: "sjdjg" },
          { id: 4, label: "kasjdjg" },
          { id: 5, label: "jhfh" },
        ]}
        masterCheck
        searchable
      />
    </div>
  );
};
export default Home;
