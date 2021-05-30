import React from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { message } from "../../utils/common";

import "./styles.scss";


const UpdateForm = props => {
    const { updateStoreInfo } = props;
    const [state, setState] = React.useState({
        isContainerOpen: true,
        name: "",
        googleMapUrl: "",
        discountService: "",
        seatAdjustment: "",
        openingHoursAdjustment: "",
        isOpen: "是",
        forHere: "是",
        toGo: "是",
        delivery: "是",
        complementarySeat: false,
        complementaryFlat: false,
        complementaryWashroom: false,
        latitude: "",
        longitude: ""
    });
  const { enqueueSnackbar } = useSnackbar();


    const toggleUpdateForm = () => setState(state => ({ ...state, isContainerOpen: !state.isContainerOpen }));

    const handleUpdateFiled = (e) => {
        const { name, value } = e.target;
        if (name === "googleMapUrl") {
            handleFetchLatAndLong(value);
        }
        setState(state => ({ ...state, [name]: value }));
    };

    const handleUpdateCheckbox = (e) => {
        const { name } = e.target;
        setState(state => ({ ...state, [name]: !state[name] }));
    };

    const handleFetchLatAndLong = (url) => {
        if((url.split("/").length > 0 && url.indexOf("@") > -1) || url.includes('goo.gl/maps') || url.includes('g.page')) {
            // const urlArr = url.split("/");
            // setState(state => ({ ...state, name: decodeURIComponent(urlArr[5]) }));
            // if (urlArr[6]) {
            //     setState(state => ({ ...state, latitude: urlArr[6].split(",")[0].replace("@", ""), longitude: urlArr[6].split(",")[1] }));
            // }
        }else{
            message( enqueueSnackbar, "請輸入有效的 Google Map 連結。", "error");
            // return
        }
    }

    const handleUpdateStoreInfo = () => {
        const { 
            googleMapUrl, 
            // name, 
            discountService, 
            seatAdjustment, 
            openingHoursAdjustment, 
            isOpen, 
            forHere, 
            toGo, 
            delivery, 
            complementarySeat, 
            complementaryFlat, 
            complementaryWashroom,
            // latitude,
            // longitude
        } = state;
        if (!googleMapUrl) {
            message( enqueueSnackbar, "請輸入有效的 Google Map 連結。", "error");
            return
        };
        // if(!latitude) return
        // if(!longitude) return

        let complementary = "";
        if(complementarySeat){
            complementary =+ "梅花座 "
        }else if(complementaryFlat){
            complementary =+ "座位隔板 "
        }else if(complementaryWashroom){
            complementary =+ "洗手間關閉 "
        }

        const updateData = {
            "url": googleMapUrl,
            // "latitude": latitude ,
            // "longitude": longitude,
            "inside_status": seatAdjustment,
            // "shop_name": name,
            "prevention_measures": complementary,
            "inside": forHere,
            "outside": toGo,
            "delivery": delivery,
            "open": isOpen,
            "last_updated_at": Math.floor(new Date().getTime()/1000),
            "open_time_change": openingHoursAdjustment,
            "discount": discountService,
        };
        updateStoreInfo(updateData)
    };

    return (
        <div className="desktop-inputs-containers">
            <div className="desktop-inputs-containers-header">
                <h2>店家填寫資訊</h2>
                <Icon onClick={toggleUpdateForm}>{state.isContainerOpen ? "arrow_drop_down" : "arrow_drop_up"}</Icon>
            </div>
            <Collapse in={state.isContainerOpen}>
                <TextField label="Google map Url" onChange={handleUpdateFiled} name="googleMapUrl" value={state.googleMapUrl} />
                {/* <TextField label="店家名稱" onChange={handleUpdateFiled} name="name" value={state.name} /> */}
                <TextField label="防疫外帶或外送優惠服務" onChange={handleUpdateFiled} name="discountService" value={state.discountService} />
                <TextField label="內用座位調整情況" onChange={handleUpdateFiled} name="seatAdjustment" value={state.seatAdjustment} />
                <TextField label="營業時間調整情況" onChange={handleUpdateFiled} name="openingHoursAdjustment" value={state.openingHoursAdjustment} />
                <FormControl className="radio-box-container">
                    <FormLabel component="legend">是否繼續維持營業</FormLabel>
                    <RadioGroup name="isOpen" value={state.isOpen} onChange={handleUpdateFiled}>
                        <FormControlLabel value="是" control={<Radio />} label="是" />
                        <FormControlLabel value="否" control={<Radio />} label="否" />
                    </RadioGroup>
                    <FormLabel component="legend">是否提供內用服務</FormLabel>
                    <RadioGroup name="forHere" value={state.forHere} onChange={handleUpdateFiled}>
                        <FormControlLabel value="是" control={<Radio />} label="是" />
                        <FormControlLabel value="否" control={<Radio />} label="否" />
                        <FormControlLabel value="不確定" control={<Radio />} label="不確定" />
                    </RadioGroup>
                    <FormLabel component="legend">是否提供外帶</FormLabel>
                    <RadioGroup name="toGo" value={state.toGo} onChange={handleUpdateFiled}>
                        <FormControlLabel value="是" control={<Radio />} label="是" />
                        <FormControlLabel value="否" control={<Radio />} label="否" />
                        <FormControlLabel value="不確定" control={<Radio />} label="不確定" />
                    </RadioGroup>
                    <FormLabel component="legend">是否提供外送</FormLabel>
                    <RadioGroup name="delivery" value={state.delivery} onChange={handleUpdateFiled}>
                        <FormControlLabel value="是" control={<Radio />} label="是" />
                        <FormControlLabel value="否" control={<Radio />} label="否" />
                        <FormControlLabel value="不確定" control={<Radio />} label="不確定" />
                    </RadioGroup>
                </FormControl>
                <div className="checkbox-group">
                    <FormLabel component="legend">店家防疫措施</FormLabel>
                    <FormGroup row name="complementary" >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={handleUpdateCheckbox}
                                    name="complementarySeat"
                                    value={state.complementarySeat}
                                />
                            }
                            label="梅花座"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={handleUpdateCheckbox}
                                    name="complementaryFlat"
                                    value={state.complementaryFlat}
                                />
                            }
                            label="隔板"

                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={handleUpdateCheckbox}
                                    name="complementaryWashroom"
                                    value={state.complementaryWashroom}
                                />
                            }
                            label="廁所關閉"
                        />
                    </FormGroup>
                    <Button 
                        style={state.googleMapUrl ? {} : {backgroundColor: "#ececec"}}
                        disabled={!state.googleMapUrl}
                        className="update-button" 
                        onClick={handleUpdateStoreInfo}
                    >上傳店家資訊</Button>
                </div>
            </Collapse>
        </div>
    )
};

export default UpdateForm;