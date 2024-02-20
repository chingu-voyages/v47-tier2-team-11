import React, { useState } from "react";
import "./CommentModal.css"; // Import CSS file for styling

const CommentModal = ({ selectedTask, handleCloseModal, handleSaveComment }) => {
    const [comment, setComment] = useState("")

    const handleChange = (event) => {
        setComment(event.target.value); // Update the comment value as the user types
    };

    return (
        <div className="modal-overlay"> 
            <div show={true} className="modal-content">
                <div className="modal-header">
                    <h3>Comment / Additional Notes :</h3>
                    <button className="close" onClick={handleCloseModal}>X</button> {/* Close button */}
                </div>
                <textarea
                    value={comment}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your comment here..."
                    autoFocus
                />
                <button className="save-button" onClick={() => handleSaveComment(selectedTask.type, selectedTask.taskId, selectedTask.task, comment)}> {/* Corrected onClick */}
                    Save
                </button>
            </div>
        </div>
    );
}

export default CommentModal;
