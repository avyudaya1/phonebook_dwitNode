const PersonForm = ({eventHandlers: {handleSubmit, handleNameChange, handleNumberChange}, 
                     value: {newName, newNumber}}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div style={{marginBottom: 10}}>
                Name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div style={{marginBottom: 10}}>
                Number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div style={{marginBottom: 10}}>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;