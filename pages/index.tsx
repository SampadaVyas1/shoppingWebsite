import Button from "@/components/button";
import InputBox from "@/components/input-box";
import Typography from "@/components/typography";
import ImageComponent from "@/components/image";
import styles from "../styles/Home.module.scss";
import Loader from "@/components/loader";
import Images from "@/public/assets/images";
import ButtonGroup from "@/components/button-group";

export default function Home() {
  const { loaderSpinner } = Images;
  return (
    <div className={styles.components}>
      <Typography variant="body">Welcome</Typography>
      <InputBox
        label="Enter you text here"
        placeholder="Enter your text here.."
      />
      <Button startIcon={loaderSpinner} variant="contained" disabled>
        Play
      </Button>
      <Button startIcon={loaderSpinner} variant="outlined" disabled>
        Play
      </Button>
      <Button startIcon={loaderSpinner} variant="text" disabled>
        Play
      </Button>
      <Loader />
      <ButtonGroup>
        <Button>Submit</Button>
        <Button>Save</Button>
        <Button>Hello</Button>
      </ButtonGroup>
    </div>
  );
}
