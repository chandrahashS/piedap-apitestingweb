import { useContext } from "react";
import { Context } from "../../contexts/Store";
import RightPanel from "./RightPanel";
import Toolbar from "./Toolbar";
import URLBox from "./URLBox";
import PayloadForm from "./PayloadForm";
import ResponseViewer from "./ResponseViewer";
import Overview from "./Overview";
import styles from "./playground.module.css";

const Playground = () => {
  const { state } = useContext(Context);

  return (
    <main className={styles.wrapper}>
      <Toolbar />
      
     
    </main>
  );
};

export default Playground;
