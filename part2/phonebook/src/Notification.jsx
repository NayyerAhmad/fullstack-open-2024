const Notification = ({ message, type }) => {
    if (!message) return null;
  
    const style = {
      color: type === 'error' ? 'red' : 'green',
      backgroundColor: 'lightgray',
      fontSize: '20px',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid',
    };
  
    return <div style={style}>{message}</div>;
  };
  
  export default Notification;
  