import { memo } from "react"

function ToggleSound({allowSound,setAllowSound}) {
    return (
        <button className="sound-btn" onClick={()=>setAllowSound(allow=>!allow)}>
            {allowSound ?  "🔈" : "🔇"}
        </button>
    )
}

export default memo(ToggleSound)
