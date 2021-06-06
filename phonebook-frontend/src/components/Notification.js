const Notification = ({ notification: {message, status } }) => {
  return (
    <div>
      <h1 className={status}>{message}</h1>
    </div>
  )
}

export default Notification;