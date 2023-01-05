import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ErrorMessage({message}:{message:string}) {
  return (
    <div>
    <div className='d-flex flex-column align-items-center justify-content-center'>
    <div className='bg-error p-4 rounded-circle m-3 justify d-flex flex-column align-items-center justify-content-center' >
        <h1 >

        <FontAwesomeIcon size='2x' icon={faXmark} className="text-danger"></FontAwesomeIcon> 
        </h1>
    </div>

    <h2>{message}</h2>
</div>
    </div>
  )
}

export default ErrorMessage
