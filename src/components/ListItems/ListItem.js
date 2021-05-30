import React from "react";
import Icon from "@material-ui/core/Icon";

import "./styles.scss";

const ListItem = props => {
    const { data } = props;
    return(
        <div className="list-item" key={data["shop_name"]}>
            <div><h2>{data["shop_name"]} <Icon onClick={()=>{ window.open(data["url"], "_blank") }}>map</Icon></h2></div>
            <p>店家防疫措施: {data["prevention_measures"]}</p>
            <p>是否仍提供內用服務: {data["inside"] === ''? '不確定': (data["inside"]? '是' : '否')}</p>
            <p>內用防疫措施: {data["inside_status"]}</p>
            <p>是否提供外帶: {data["outside"] === ''? '不確定': (data["outside"]? '是' : '否')}</p>
            <p>是否提供外送: {data["delivery"] === ''? '不確定': (data["delivery"]? '是' : '否')}</p>
            <p>是否繼續維持營業: {data["open"]? '是' : '否'}</p>
            <p>時間戳記: {new Date(data["last_updated_at"] * 1000).toLocaleString('lt-LT', { timeZone: 'Asia/Taipei' })}</p>
            <p>營業時間調整情況: {data["open_time_change"]}</p>
            <p>防疫外帶或外送優惠: {data["discount"]}</p>
        </div>
    );
};


export default ListItem;