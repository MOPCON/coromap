import React from "react";

import Icon from "@material-ui/core/Icon";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Maps from "./components/MapView/MapView";
import ListItems from "./components/ListItems/ListItems";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import { useSnackbar } from "notistack";
import { message } from "./utils/common";

import { fetchMapData, updateStoresInfo } from "./utils/api";

import feedback from "./chat.png";
import "./app.scss";

function App() {
  const [state, setState] = React.useState({
    isSideMenuOpen: true,
    fetchMapDataLoading: false,
    mapDataList: [],
    feedbackClass: "feedback-img",
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(()=>{
    handleFetchMapData();
  }, []);

  React.useEffect(()=>{
    animateFeedback()
  },[state.feedbackClass])

  const handleFetchMapData = async () => {
    setState(state => ({ ...state, fetchMapDataLoading: true }));

    const res = await fetchMapData();
    
    if(res.status === 200){
      try{
        setState(state => ({ ...state, mapDataList: res.data, fetchMapDataLoading: false }));
      }catch(err){

        setState(state => ({ ...state, fetchMapDataLoading: false }));
      }
    }else{
      setState(state => ({ ...state, fetchMapDataLoading: false }));
    };
  };

  const handleUpdateMapData = async (val) => {
    setState(state => ({ ...state, fetchMapDataLoading: true }));

    const res = await updateStoresInfo(val);
    if(res.status === 200){
      setState(state => ({ ...state, fetchMapDataLoading: false }));
      message( enqueueSnackbar, "上傳店家成功。", "success");
    }else{
      setState(state => ({ ...state, fetchMapDataLoading: false }));
      message( enqueueSnackbar, "上傳店家失敗。", "error");
    };
    window.location.reload();
    // await handleFetchMapData();
  };

  const toggleSideMenu = () => setState(state=>({ ...state, isSideMenuOpen: !state.isSideMenuOpen }));

  const updateStoreInfo = val => {
    handleUpdateMapData(val)
  };

  const animateFeedback = () => {
    setTimeout(()=>{
      if(state.feedbackClass === "feedback-img"){
        setState(state => ({ ...state, feedbackClass: "feedback-img-with-scaled" }));
      }else{
        setState(state => ({ ...state, feedbackClass: "feedback-img" }));
      }
    }, 2000);
  };
 
  const openFeedback = (e) => {
    e.stopPropagation()
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdO9A9-LVmdGM5cgIHw7N_G4pZvhrtPTmYop0fPy6eNBmJwrQ/viewform", "_blank")
  };

  return (
    <div className="App">
      <div 
        className="feedback" 
        onClick={openFeedback}
        >
        <img src={feedback} className={state.feedbackClass} alt="feedback"/>
        <p>使用者回饋表單</p>
      </div>
      <div className={state.isSideMenuOpen ? "side-menu-open" : "side-menu-close"}>
        { state.isSideMenuOpen &&
          <>
              <ListItems mapDataList={state.mapDataList} />
              <UpdateForm updateStoreInfo={updateStoreInfo}/>
          </>
        }
      </div>
      <div className={state.isSideMenuOpen ? "map-container-close" : "map-container-open"}>
        <Maps 
          fetchMapDataLoading={state.fetchMapDataLoading}
          mapDataList={state.mapDataList}
          toggleSideMenu={toggleSideMenu}
          isSideMenuOpen={state.isSideMenuOpen}
        />
      </div>
      <div className="icon-container">
        <Icon onClick={toggleSideMenu}>{state.isSideMenuOpen ? 'close' : 'menu'}</Icon>
      </div>
    </div>
  );
}

export default App;
