import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './eventListing.scss'
import { getEventDetails, getEventList } from '../../redux/actions/events'

function EventListing() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [eventData, setEventData] = useState([])
    const [searchString, setSearchString] = useState('')

    const eventLists = useSelector(state => state?.events?.eventLists)

    useEffect(() => {
        dispatch(getEventList())
    },[])   

    useEffect(() => {
      setEventData(eventLists)
  },[eventLists])   

    const getEventDetailsHandler = (item) => {
        dispatch(getEventDetails(item))
        navigate('/bookevent')
    }

    const searchHandler = (e) => {
      setSearchString(e.target.value)
      if(e.target.value.length == 0) {
        setEventData(eventLists);
      } else {
      let filteredData = eventData.filter((item) => {
        return item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setEventData(filteredData)
    }
    }

  return (
    <React.Fragment>
      <div className=''>
      <div className='search-container'>
        <div>
        <input type='search' onChange={(e) => {searchHandler(e)}} placeholder='Search By Event Title....'/>
        {
          searchString.length  == 0 &&  <img src={process.env.PUBLIC_URL + "/assets/events/search.png"}/>
        }
       
        </div>
       
      </div>
      <div className='event-container'>
      <h2>Events ({eventData?.length})</h2>
      {
        eventData.length == 0 && <h3>No Data Found!!</h3>
      }
        
        <div className='event-table'>
        {
            eventData?.map((item) => {
                return (
                    <>
                      <div className='event-card' key={item.id}>
                        <div className='event-card__header'>   
                      <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className='event-card__header__image' />
                      </div>
                      <div className='event-card__title'>
          <h2 className='event-card__title__name'>{item.name}</h2>
          <p className='event-card__title__date__tablet'>{item.date}</p>
          <p className='event-card__title__tickets__tablet'>Tickets Available: <span><strong>{item.tickets}</strong></span></p>
          </div>
          <div className='event-card__content'>
          <p className='event-card__content__date'>{item.date}</p>
          <p className='event-card__content__tickets'>Tickets Available: <span><strong>{item.tickets}</strong></span></p>
          </div>

          <div className='event-card__footer'>
            
            <button disabled={item?.tickets == 0} className={`${item?.tickets == 0 ? 'event-card__footer__disbutton' : 'event-card__footer__button'}`} onClick={() => {getEventDetailsHandler(item)}}><img src={process.env.PUBLIC_URL + `${item?.tickets == 0 ?'/assets/events/sold-out.png' : '/assets/events/book.png' }`} /><span>{item?.tickets == 0 ? 'SOLD OUT' : 'Book Event'}</span></button>
          </div>
                        </div>  
                    </>
                )
            })
        }
        </div>
        </div>
        </div>
    </React.Fragment>
  )
}

export default EventListing