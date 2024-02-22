const DeleteModal = ({ setShowDeleteModal, selectedTask, handleTaskDelete }) => {
    return (
        <div className="modal-overlay"> 
            <div className="modal-content">
                <p style={{"padding":"0.5em"}}>
                    {`Are you sure you want to delete the task "${selectedTask.taskName}"?`}
                </p>
                <div>
                    <button className="save-button" onClick={() => handleTaskDelete()}> 
                        OK
                    </button>
                    <button className="save-button" onClick={() => setShowDeleteModal(false)}> 
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;