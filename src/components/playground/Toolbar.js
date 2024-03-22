import { useContext, useState } from "react";
import { Context } from "../../contexts/Store";
import styles from "./playground.module.css";
import React from "react";
import RightPanel from "./RightPanel";

import URLBox from "./URLBox";
import PayloadForm from "./PayloadForm";
import ResponseViewer from "./ResponseViewer";
import Overview from "./Overview";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Stack, ListItem, IconButton } from "@mui/material";

import ListSubheader from "@mui/material/ListSubheader";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Toolbar = () => {
  const { state, dispatch } = useContext(Context);
  const [tabs, setTabs] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [openNested, setOpenNested] = React.useState(true);

  const handleClick = () => {
    setOpenNested(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = (e) => {
    e.stopPropagation();
    dispatch({ type: "RESET_FORM" });
  };

  const toggleOverView = (show) => {
    dispatch({ type: "SET_OVERVIEW", payload: show ? "shown" : "hidden" });
  };

  const closeOverView = (e) => {
    e.stopPropagation();
    dispatch({ type: "CLOSE_OVERVIEW" });
  };

  const handleMultipleTags = () => {
    let obj = { tab: tabs.length + 1, method: "Post" };
    setTabs((prevTabs) => [...prevTabs, obj]);
  };

  const cancelMultipleTags = (event, data) => {
    let deletedTabs = tabs.splice(data, 1);
  };

  const handleSaveClick = () => {};

  const useStyles = makeStyles({
    listItemText: {
      fontSize: "16px",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.tabs_wrapper}>
          <div className={styles.all_tabs}>
            {state.overviewTab !== "" && (
              <div
                onClick={() => toggleOverView(true)}
                className={
                  state.overviewTab === "shown" ? styles.tab_active : styles.tab
                }
              >
                <span>Overview</span>
                <button type="button" onClick={(e) => closeOverView(e)}>
                  &times;
                </button>
              </div>
            )}
            {tabs.map((data, index) => {
              return (
                <div
                  onClick={() => toggleOverView(false)}
                  className={
                    state.overviewTab === "hidden" || state.overviewTab === ""
                      ? styles.tab_active
                      : styles.tab
                  }
                >
                  <span>{state.formData.url || "Untitled Request"}</span>
                  {!state.showOverview && (
                    <button
                      onClick={(e) => cancelMultipleTags(e, index)}
                      type="button"
                    >
                      &times;
                    </button>
                  )}
                </div>
              );
            })}
            <button
              style={{
                alignSelf: "center",
                marginLeft: "1rem",
                cursor: "pointer",
              }}
              type="button"
              onClick={handleMultipleTags}
            >
              +
            </button>
          </div>
          {/* <div className={styles.tab_actions}>
          <div className={styles.tab_sm}>
            <i className="feather-plus"></i>
          </div>
          <div className={styles.tab_sm}>
            <i className="feather-more-horizontal"></i>
          </div>
        </div> */}
        </div>
        <div className={styles.env_menu}>
          <select name="" id="">
            <option value="">No Environment</option>
          </select>
          <button type="button">
            <i className="feather-eye"></i>
          </button>
        </div>
      </div>

      {state.overviewTab === "shown" ? (
        <Overview />
      ) : (
        <div
          className={
            state.infoPanelOpened ? styles.main : styles.main_collapsed
          }
        >
          <div className={styles.container}>
            <div className={styles.panelheader}>
              <div className={styles.title_area}>
                <h2>{state.formData.url || "Untitled Request"}</h2>
              </div>
              <div className={styles.options_area}>
                <div className={styles.save_options}>
                  <button onClick={handleOpen} type="button">
                    <i className="feather-save"></i>
                    <span>Save</span>
                  </button>
                </div>
                <div className={styles.view_options}>
                  <div>
                    <button>
                      <i className="feather-edit-2"></i>
                    </button>
                    <button disabled>
                      <i className="feather-message-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <URLBox />
            <div
              className={
                state.splitView === "V"
                  ? styles.panel_vertical
                  : styles.panel_horizontal
              }
            >
              <PayloadForm />
              <ResponseViewer />
            </div>
          </div>
          <div
            className={
              state.infoPanelOpened
                ? styles.panel_opened
                : styles.panel_collapsed
            }
          >
            <RightPanel />
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Stack
            sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 500 }}
          >
            Save as
          </Stack>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Request Name"
            variant="standard"
          />
          <Stack sx={{ mt: 2, fontSize: "0.9rem" }}>Select Location</Stack>
          <Stack sx={{ mt: 2, fontSize: "0.9rem" }}>
            My Workspace {">"} Collection
          </Stack>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"

            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Nested List Items
            //   </ListSubheader>
            // }
          >
            <ListItem>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                primary="New"
              />
            </ListItem>

            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <AddIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                primary="Folder One"
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <AddIcon />
                </IconButton>
              }
              onClick={handleClick}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                primary="Folder Two"
              />
              {openNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 14 }}
                    primary="Starred"
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>

          <Button sx={{ ml: 2 }} variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Toolbar;
