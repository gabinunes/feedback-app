import {createContext, useState } from "react";
import { v4 as uuidv4} from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context',
            rating: 10,
        },
        {
            id: 2,
            text: 'This item is from context',
            rating: 1,
        },
    ])



    const [feedbackEdit, setFeedbackEdit] =useState({
        item: {},
        edit: false
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updItem} : item))
        )
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return (
        <FeedbackContext.Provider 
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext