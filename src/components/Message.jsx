const Message = ({text, error}) => {
    const textColor = error ? 'red' : 'black';
    return <p style={{fontSize: '22px', paddingLeft: '30px', color: textColor, background: 'white'}}>{text}</p>
}

export default Message