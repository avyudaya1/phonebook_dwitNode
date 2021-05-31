const Filter = ({filterText, handleFilterChange}) => {
    return (
        <form>
            <div>
                Search: <input value={filterText} onChange={handleFilterChange}/>
            </div>
        </form>
    )
}

export default Filter;