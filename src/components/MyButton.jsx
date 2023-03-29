const MyButton = ({style, title, handleClick}) => { 
    const btnStyle = {
        backgroundColor: '#e7b928',
        color: '#000',
        padding: '10px',
        ...style,
    }
    return <button onClick={handleClick} style={btnStyle}>{title}</button>
}

export default MyButton;