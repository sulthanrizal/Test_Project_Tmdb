import { useRef, useState, useEffect } from "react";
import './localStorage.scss';
import Pp from './pp.png';
import { getAccount } from "../../../axios";
import moment from "moment";

const LocalStorage = ({ movieName }) => {
    const today = new Date()
    const [date, setDate] = useState('')
    const commentsEndRef = useRef();
    const [comments, setComments] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const [account, setAccount] = useState([])

    const [commentTextInputValue, setCommentTextInputValue] = useState("")




    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }, [comments])

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments)
        getAccount(setAccount)
    }, [])


    const getFormatDate = () => {
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        setDate(`${day}/${month}/${year}`)
    }

    const handleClick = () => {
        const newComment = {
            text: commentTextInputValue,
            date: new Date(),
            movieName,
            id: generateRandomId()
        }

        if (newComment) {
            const updatedComments = [...comments, newComment]
            setComments(updatedComments)
            localStorage.setItem('comments', JSON.stringify(updatedComments))
            setCommentTextInputValue("")
        }
        getFormatDate()
    }


    const generateRandomId = (length = 8) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


    const handleRemove = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id)
        setComments(updatedComments)
        localStorage.setItem('comments', JSON.stringify(updatedComments))
    }


    const handleEdit = (text, index) => {
        setEditingIndex(index)
        setEditingValue(text)
    }


    const handleSaveEdit = (comment) => {
        const updatedComments = comments?.map((item) => {
            if (item?.id === comment?.id) {
                const obj = {
                    ...comment,
                    text: editingValue
                }
                return obj
            }
            return item
        })

        setComments(updatedComments)
        localStorage.setItem('comments', JSON.stringify(updatedComments))
        setEditingIndex(null)
        setEditingValue("")
    }

    return (
        <div className="container-riview-ls">
            <div className="title-riview">
                <p className="text-title">Comments</p>
            </div>
            <div className="body-riview">
                <div className="img">
                    <img src={Pp} alt="Profile" />
                </div>
                <div className="input-riview">
                    <p className="name">
                        {account.username}
                    </p>
                    <div className="input-btn">
                        <input
                            value={commentTextInputValue}
                            placeholder="Write your comments here...."
                            onChange={(e) => setCommentTextInputValue(e.target.value)}
                        />
                        <button
                            onClick={handleClick}>Comment
                        </button>
                    </div>
                </div>
            </div>
            <div className="comments-section">
                <p className="text-title">All Comments</p>
                {comments?.filter((comment) => comment?.movieName === movieName).map((item, index) => {
                    const text = item?.text
                    const date = item?.date
                    const id = item?.id
                    return (
                        <div key={index} className="comment-item">
                            {editingIndex === index ? (
                                <div className="comment-save-edit">
                                    <input
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                    />
                                    <button className="btn" onClick={() => handleSaveEdit(item)}>Save</button>
                                    <button className="btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="comment-no-edit">
                                    <p>{moment(date).format("DD MMM YYYY")}</p>
                                    <p>{text}</p>
                                    <button className="btn" onClick={() => handleEdit(text, index)}>Edit</button>
                                    <button className="btn" onClick={() => handleRemove(id)}>Remove</button>
                                    <div ref={commentsEndRef}></div>
                                </div>
                            )}
                        </div>
                    )
                })}

            </div>
        </div >
    )
}

export default LocalStorage;
