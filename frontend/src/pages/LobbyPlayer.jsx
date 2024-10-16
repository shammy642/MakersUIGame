export function LobbyPlayer({ gameRoom }) {
  return (
    <>
    <div >Waiting for host to start game...</div>
    <div>{`Game Room: http://localhost:5173/join/${gameRoom}`}</div>
    </>
  )
}