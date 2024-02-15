import "./TaskCard.css"
import { isBefore } from "date-fns"

const TaskCard = ({taskName, data, handleTaskStatusChange}) => {
    const currentDate = new Date()
    return (
        <>
        <div className="card" style={{ backgroundColor: data.status === true ? "#aabebc" : "#faae2b" }}>
            <p id="card-taskName">{taskName}</p>
            <button
                className="card-button"
                style={{cursor: isBefore(data.date, currentDate) ? "auto" : "pointer" }}
                onClick={() => handleTaskStatusChange(data)}
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