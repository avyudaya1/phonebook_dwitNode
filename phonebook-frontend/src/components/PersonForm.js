import {Button} from '@material-ui/core'
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
                <Button variant="contained" color="primary" type="submit">add</Button>
            </div>
        </form>
    )
}

export default PersonForm;