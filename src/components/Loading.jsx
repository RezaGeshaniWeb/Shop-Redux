import { HashLoader } from "react-spinners";

function Loading() {
    return (
        <HashLoader
            color="#00abff"
            cssOverride={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
    )
}

export default Loading
