const SearchBox = ({ id, name, searchQuery, autoFocus, handleSearch }) => {
    return (
        <input type="text"
            id={id}
            name={name}
            value={searchQuery}
            placeholder="search..."
            className="form-control"
            autoFocus={autoFocus}
            onChange={e => handleSearch(e.currentTarget.value)}
        />
    )
}

export default SearchBox;