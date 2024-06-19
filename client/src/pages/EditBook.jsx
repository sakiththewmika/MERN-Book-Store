import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const[title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [year, setYear] = useState([]); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/book/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setYear(response.data.year);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Failed to fetch book');
      });

  }, [])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      year,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/book/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Failed to save book');
      });

  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'></input>
        </div>
        <button
          onClick={handleEditBook}
          className='bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded-lg'>
          Save
          </button>
      </div>
      )}
    </div>
  )
}

export default EditBook