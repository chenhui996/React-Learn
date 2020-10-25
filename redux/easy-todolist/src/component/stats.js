import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Stats() {
    const data = useSelector((state) => state.data);
    let doneDataLen = data.filter((dataItem) => dataItem.done);
    const dispatch = useDispatch();
    return (
      <div className="sum">
        <label>
          <input
            type="checkbox"
            checked={data.length === doneDataLen.length}
            onChange={({target}) => {
              console.log("dsa");
              // idArr.push(data.id);
              dispatch({
                type: "ALL_DONE",
                done: target.checked
              });
            }}
          />
          <span>选中全部</span>
        </label>
        <a
          onClick={() => {
            dispatch({
              type: "SELECT_DELETE",
            })
          }}
        >
          删除选中项
        </a>
        <p>
          当前选中<span> {doneDataLen.length} </span>项，共{data.length}条留言
        </p>
      </div>
    );
  }
