import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import Button from "@/components/button";
import InputBox from "@/components/inputBox";
import Typography from "@/components/typography";
import Loader from "@/components/loader";
import SkeletonLoader from "@/components/skeletonLoader";
import ButtonGroup from "@/components/buttonGroup";
import MultiSelectOptions from "@/components/select/multiselectOptions";
import Table from "@/components/table";
import Select from "@/components/select";
import ROUTES from "@/common/routes";
import Images from "@/public/assets/icons";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import styles from "../styles/app.module.scss";

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
        searchable
        options={[
          { id: 0, label: "Javascript" },
          { id: 1, label: "React" },
          { id: 2, label: "MongoDb" },
          { id: 3, label: "HTML" },
          { id: 4, label: "CSS" },
          { id: 5, label: "Java" },
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
          { id: 0, label: "Javascript" },
          { id: 1, label: "React" },
          { id: 2, label: "MongoDb" },
          { id: 3, label: "HTML" },
          { id: 4, label: "CSS" },
          { id: 5, label: "Java" },
        ]}
        masterCheck
        searchable
      />
    </div>
  );
};
export default Home;
