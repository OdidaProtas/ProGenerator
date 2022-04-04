import reactLogo from "./logo.svg"
import viteLogo from "./favicon.svg"
import ogo from "./logo.jpg"

export default function () {
    return (
        <div style={{ minHeight: "18vh", backgroundColor: "black", color: "white", padding: "1px", marginBottom: "26px", textAlign: "center", paddingBottom: "12px" }} >
            <h6>Made with</h6>
            <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                <img height={48} src={reactLogo} alt="" />
                <img height={48} src={viteLogo} alt="" />
                <img height={48} src={"https://mui.com/static/logo.png"} alt="" />
                <img height={48} src={"https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"} alt="" />
                <img height={48} src={"https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png"} alt="" />
                <img height={48} src={"https://img.stackshare.io/service/7419/20165699.png"} alt="" />
                <img height={48} src={ogo} alt="" />
            </div>
        </div >
    )
}