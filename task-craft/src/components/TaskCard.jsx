import { useEffect } from "react";
import "./TaskCard.css"

const TaskCard = ({task, taskId, taskName, data, type, handleTaskStatusChange}) => {
    useEffect(() => {},[task])
    return (
        <>
        <div className="card" style={{ backgroundColor: data.status === true ? "#aabebc" : "#faae2b" }}>
            <p id="card-taskName">{taskName}</p>
            <button
                className="card-button"
                onClick={() => handleTaskStatusChange(type, taskId, data)}
            >
                {data.status === false ? (
                <>
                    <i className="far fa-check-circle"></i> mark as done
                </>
                ) : (
                <>
                    <i className="fas fa-check-circle"></i> done
                </>
                )}
            </button>
        </div>
        </>
    )
}

export default TaskCard;