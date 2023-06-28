import React, { useEffect, useState } from 'react'
import './addevent.scss'
import { useDispatch, useSelector } from 'react-redux'
import { bookEvent } from '../../redux/actions/events'
import { useNavigate } from 'react-router-dom'

function AddEvent() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        name : '',
        email : '',
        phone : ''
    })
    const [btnDdisabled, setBtnDisabled] = useState(false)
    const [noOfSeatsGreaterThanTicket, setNoOfSeatsGreaterThanTicket] = useState(false)
    const [errors, setErrors] = useState({})
    const [errorObjLength, setErrorObjLength] = useState(0)
    const [noOfSeats, setNoOfSeats] = useState(1)
    const eventDetails = useSelector(state => state?.events?.eventDetails)

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            setErrorObjLength(Object.keys(errors).length)
        } else {
            setErrorObjLength(0)
        }
    },[errors])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevFormValues) => ({
          ...prevFormValues,
          [name]: value,
        }));
      };

    const handleNumberChange = (event) => {
        
        if(event.target.value > eventDetails?.tickets) {
            setNoOfSeatsGreaterThanTicket(true)
        } else {
            setNoOfSeatsGreaterThanTicket(false)
            const selectedNumber = parseInt(event.target.value);
            setNoOfSeats(selectedNumber);
            setInputValues((prevFormValues) => {
              const updatedFormValues = { ...prevFormValues };
              for (let i = 2; i <= event.target.value; i++) {
                if (!updatedFormValues[`attendee${i}`]) {
                  updatedFormValues[`attendee${i}`] = '';
                }
              }
              return updatedFormValues;
            });
        }
       
      };

    const validationHandler = () => {
        let errorObject = {}
            if (!inputValues.name.trim()) {
                errorObject.name = 'Required';
              } else if (!/^^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(inputValues.name)) {
                errorObject.name = 'should be in correct format';
              }
            if (!inputValues.email.trim()) {
                errorObject.email = 'Email is required';
              } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
                errorObject.email = 'should be in email format';
              }
              if (!inputValues.phone.trim()) {
                errorObject.phone = 'Phone number is required';
              } else if (!/^[0-9]{10}$/.test(inputValues.phone)) {
                errorObject.phone = 'Phone number is invalid';
              }

              for (let i = 2; i <= noOfSeats; i++) {
                if (!inputValues[`attendee${i}`].trim()) {
                    errorObject[`attendee${i}`] = `Name of Attendee ${i} is required`;
                }
              }
          
            setErrors(errorObject)
            return Object.keys(errorObject)
    }

    const submitHandler =  (event) => {
        event.preventDefault()
        const isSubmittable = validationHandler()
        if(isSubmittable.length == 0 && !noOfSeatsGreaterThanTicket) {
            let data = {
                id : eventDetails?.id,
                totalAttendes : noOfSeats
            }
            eventDetails.tickets = eventDetails?.tickets - noOfSeats
            dispatch(bookEvent(data))
            setErrors({})
            setBtnDisabled(true)
            setTimeout(() => {
                navigate('/')
            }, 2000);
           
        }
    }

    const renderInputs = () => {
        const inputs = [];
        for (let i = 2; i <= noOfSeats; i++) {
          const inputName = `attendee${i}`;
          const inputValue = inputValues[inputName] || '';
          const inputError = errors[inputName];
    
          inputs.push(
            <div key={i} className="add-event-container__card__div__form__group">
              <label htmlFor={inputName} className="add-event-container__card__div__form__group__label">
              Name of Attendee {i}:
              </label>
              <div>
              <input
                type="text"
                id={inputName}
                name={inputName}
                value={inputValue}
                className="add-event-container__card__div__form__group__input"
                onChange={handleInputChange}
              />
               
              {inputError && (
                <div className="errorMessage">{inputError}</div>
              )}
              </div>
            </div>
          );
        }
        return inputs;
      };

  return (
    <React.Fragment>
        <div className='add-event-container'>
        <h2>{eventDetails?.name}</h2>
        <p>Number of available seats : {eventDetails?.tickets}</p>
        {
            btnDdisabled && <p className='ticket-book'>Tickets booked</p>
        }

            <div className='add-event-container__card'>
                <div className='add-event-container__card__image'>
                    <img src={process.env.PUBLIC_URL + "/assets/events/event-1.png"} alt={eventDetails?.name}/>
                </div>
                <div className='add-event-container__card__div'>
                        <form className='add-event-container__card__div__form' onSubmit={submitHandler}>
                        <div className="add-event-container__card__div__form__group">
            <label htmlFor="name" className="add-event-container__card__div__form__group__label">Name:</label>
            <div>
            <input type="text" id="name" className="add-event-container__card__div__form__group__input" onChange={(e) => {
                setInputValues({...inputValues, name : e.target.value})
            }} />
            {errors.name && (
                <p className="errorMessage">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="add-event-container__card__div__form__group">
            <label htmlFor="name" className="add-event-container__card__div__form__group__label">Email:</label>
            <div>
            <input type="email" id="email" className="add-event-container__card__div__form__group__input" onChange={(e) => {
                setInputValues({...inputValues, email : e.target.value})
            }} />
             {errors.email && (
                <p className="errorMessage">{errors.email}</p>
              )}
               </div>
          </div>
          <div className="add-event-container__card__div__form__group">
            <label htmlFor="name" className="add-event-container__card__div__form__group__label">Phone No:</label>
            <div>
            <input type="number" id="phone" className="add-event-container__card__div__form__group__input" onChange={(e) => {
                setInputValues({...inputValues, phone : e.target.value})
            }} />
            {errors.phone && (
                <p className="errorMessage">{errors.phone}</p>
              )}
             </div>
          </div>
          <div className="add-event-container__card__div__form__group">
            <label htmlFor="name" className="add-event-container__card__div__form__group__label">Number of Seats:</label>
            <div>
           <select onChange={(e) => {
            handleNumberChange(e)
           }}> 
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
           </select>
          
           </div>
          </div>
          {
            noOfSeatsGreaterThanTicket && <p className="selectErrorMessage">Number of seats selected is more than available seats</p>
           }

          {renderInputs()}
        

           <div className="add-event-container__card__div__form__group__button">
            <button className='add-event-container__card__div__form__group__button__submit' disabled={btnDdisabled}>Submit</button>
            <button className='add-event-container__card__div__form__group__button__cancel' disabled={btnDdisabled} onClick={() => { navigate('/')}}>Cancel</button>
           </div>

                        </form>
                </div>
            </div>        

        </div>
    </React.Fragment>
  )
}

export default AddEvent