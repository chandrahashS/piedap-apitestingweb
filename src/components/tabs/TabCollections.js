import React, { useState } from "react";
import styles from "./tab.module.css";
import image from "../../images/no-collection.png";

import { TextField, Stack, ListItem, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ListSubheader from "@mui/material/ListSubheader";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { HandymanOutlined } from "@mui/icons-material";

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

const TabCollections = () => {
  const [openNested, setOpenNested] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const [folders, setFolders] = useState([
    {
      name: "Folder 1",
      isOpen: false,
      children: [
        {
          name: "Subfolder 1",
          isOpen: false,
          children: [
            {
              name: "File 1",
            },
            {
              name: "File 2",
            },
          ],
        },
      ],
    },
    {
      name: "Folder 2",
      isOpen: false,
      children: [
        {
          name: "File 3",
        },
      ],
    },
  ]);

  const useStyles = makeStyles((theme) => ({
    outlineIcon: {
      "& path": {
        color: "white",
      },
    },
  }));

  const handleFolderClick = (index) => {
    setFolders((prevFolders) => {
      const newFolders = [...prevFolders];
      newFolders[index].isOpen = !newFolders[index].isOpen;
      return newFolders;
    });
  };

  const handleOpen = () => {
    console.log("clicked");
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const classes = useStyles();

  const renderFolders = (foldersData) => {
    return (
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {foldersData.map((folder, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleFolderClick(index)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={folder.name} />
              {folder.isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={folder.isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {folder.children && renderFolders(folder.children)}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    );
  };

  return (
    <div className={styles.empty_tab}>
      <Stack sx={{ mt: 2, fontSize: "0.8rem", color: "white" }}>
        My Workspace {">"} Collection
      </Stack>

      {/* {renderFolders(folders)} */}
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <ListItemIcon onClick={handleOpen} className={classes.outlineIcon}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New" />
        </ListItem>

        <ListItem
          secondaryAction={
            <IconButton
              className={classes.outlineIcon}
              edge="end"
              aria-label="comments"
            >
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon className={classes.outlineIcon}>
            <FolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Folder One" />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton
              className={classes.outlineIcon}
              edge="end"
              aria-label="comments"
            >
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon className={classes.outlineIcon}>
            <FolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Folder Two" />
          {openNested ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              secondaryAction={
                <IconButton
                  className={classes.outlineIcon}
                  edge="end"
                  aria-label="comments"
                >
                  <AddIcon />
                </IconButton>
              }
              sx={{ pl: 4 }}
            >
              <ListItemIcon className={classes.outlineIcon}>
                <FolderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Stack
            sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 500 }}
          >
            Create Collection
          </Stack>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Label"
            variant="standard"
          />

          <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>
            Save
          </Button>

          <Button
            sx={{ ml: 2, mt: 2 }}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* <img src={image} alt="" />
      <h4>You don’t have any collections.</h4>
      <p>
        Collections let you group related requests, making them easier to access
        and run.
      </p>
      <span>Create Collection</span> */}
    </div>
  );
};

export default TabCollections;
