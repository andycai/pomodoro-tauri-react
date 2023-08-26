// import "../enum/enum";
import ClockOutlineIcon from "mdi-react/ClockOutlineIcon";

function TodayCountCom(props: any) {
    console.info("render today count");
    return <div className="today-count"><ClockOutlineIcon className="icon" size={26} />x{props.data}</div>
}

export default TodayCountCom;