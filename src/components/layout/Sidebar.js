import { useContext, useState } from "react";
import styles from "./layout.module.css";
import TabAPIs from "../tabs/TabAPIs";
import TabCollections from "../tabs/TabCollections";
import TabEnv from "../tabs/TabEnv";
import TabHistory from "../tabs/TabHistory";
import TabMonitors from "../tabs/TabMonitors";
import TabServers from "../tabs/TabServers";
import { Context } from "../../contexts/Store";

const Sidebar = () => {
  const { state, dispatch } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState(state.sideDrawerTab);

  const [currTab, setCurTab] = useState("");
  const [sideDrawOpen, setSideDrawOpen] = useState(false);

  const setCurrentTab = (e) => {
    setSelectedTab(e);
    dispatch({ type: "SET_SIDEDRAWER", payload: true });
    dispatch({ type: "SET_SIDEDRAWER_TAB", payload: e });
  };

  console.log(sideDrawOpen);
  console.log(state)



  return (
    <div className={styles.sidebar}>
      {sideDrawOpen && (
        <div className={styles.sidebar_header}>
          <div className={styles.sidebar_title}>
            <i className="feather-user"></i>
            <span>Name</span>
          </div>
          <div className={styles.sidebar_actions}>
            <button type="button">New</button>
            <button type="button">Import</button>
          </div>
        </div>
      )}
      <div className={styles.sidebar_tabs}>
        <div
          className={
            !sideDrawOpen
              ? styles.sidebar_tab_buttons_collapsed
              : styles.sidebar_tab_buttons
          }
        >
          <ul>
            <li
              onClick={(e) => {
                setCurrentTab("collections");
                setCurTab("collections");
                setSideDrawOpen(!sideDrawOpen);
              }}
              className={
                currTab === "collections"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Collections"
            >
              <i className="feather-folder"></i>
              <span>Collections</span>
            </li>
            <li
              onClick={(e) => setCurTab("api")}
              className={
                currTab === "api"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="APIs"
            >
              <i className="feather-command"></i>
              <span>APIs</span>
            </li>
            <li
              onClick={(e) => setCurTab("env")}
              className={
                currTab === "env"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Environments"
            >
              <i className="feather-box"></i>
              <span>Environments</span>
            </li>
            <li
              onClick={(e) => setCurTab("servers")}
              className={
                currTab === "servers"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Mock Servers"
            >
              <i className="feather-server"></i>
              <span>Mock Servers</span>
            </li>
            <li
              onClick={(e) => setCurTab("monitors")}
              className={
                currTab === "monitors"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="Monitors"
            >
              <i className="feather-activity"></i>
              <span>Monitors</span>
            </li>
            <li
              onClick={(e) => setCurTab("history")}
              className={
                currTab === "history"
                  ? sideDrawOpen
                    ? styles.sidebar_tab_button_active
                    : ""
                  : ""
              }
              title="History"
            >
              <i className="feather-clock"></i>
              <span>History</span>
            </li>
          </ul>
        </div>
        {sideDrawOpen && (
          <div className={styles.sidebar_tab_panels}>
            {(() => {
              switch (currTab) {
                case "api":
                  return <TabAPIs />;
                case "env":
                  return <TabEnv />;
                case "servers":
                  return <TabServers />;
                case "monitors":
                  return <TabMonitors />;
                case "history":
                  return <TabHistory />;
                default:
                  return <TabCollections />;
              }
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
