//button than can pass a function and will display some text
export function Button(props) {

    return (
      <>
      <button onClick={props.handleClick}>{props.buttonText}</button>
      </>
    )
  }