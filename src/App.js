import React from "react";

import Icon from "@material-ui/core/Icon";
import Maps from "./components/MapView/MapView";
import ListItems from "./components/ListItems/ListItems";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import { useSnackbar } from "notistack";
import { message } from "./utils/common";

import { fetchMapData, updateStoresInfo } from "./utils/api";

import "./app.scss";

function App() {
  const [state, setState] = React.useState({
    isSideMenuOpen: true,
    fetchMapDataLoading: false,
    mapDataList: [],
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(()=>{
    handleFetchMapData();
  }, []);

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
    setState(state => ({ ...state, fetchMapDataLoading: false }));

    if(res.status === 200){
      message( enqueueSnackbar, "上傳店家成功。", "success");
      window.location.reload()
    }else if(res.response.status === 400){
      message( enqueueSnackbar, res.response.data.detail, "error");
    }else{
      message( enqueueSnackbar, "上傳店家失敗。", "error");
    };
    // await handleFetchMapData();
  };

  const toggleSideMenu = () => setState(state=>({ ...state, isSideMenuOpen: !state.isSideMenuOpen }));

  const updateStoreInfo = val => {
    handleUpdateMapData(val)
  };

  return (
    <div className="App">
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
