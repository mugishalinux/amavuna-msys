import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ todayIncome, percentage }) => {
  return (
    <div className="featured">
      {/* <div className="top">
        <h1 className="title">Total Christians Registered Today</h1>
        <MoreVertIcon fontSize="small" />
      </div> */}
      <div className="bottom">
        {/* <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={6}
          />
        </div> */}
        <p style={{ marginTop: "50px" }} className="title">
          Total Christians Registered Today
        </p>
        <p style={{ color: "red" }} className="amount">
          <span style={{ color: "black", marginRight: "5px" }}></span>
          {todayIncome}
        </p>
        <p className="desc">Last record may not be included.</p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
