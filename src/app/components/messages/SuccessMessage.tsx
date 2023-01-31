import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SuccessMessage({message}:{message:string}) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-4'>
    <div className='bg-secondaire p-4 rounded-circle m-3' >
        <h1>

        <FontAwesomeIcon size='2x' icon={faCheck} color={"darkcyan"}></FontAwesomeIcon> 
        </h1>
    </div>

    <h2>{message}</h2>
</div>
  )
}

export default SuccessMessage
