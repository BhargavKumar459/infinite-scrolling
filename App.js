import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showQuotes, setShowQuotes] = useState([])
  const [loading, setLoading] = useState(false)

  const getQuotes = async (page, limit) => {
    const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      return `Api Failed with '${response.status}'`
    }
    console.log('res.upper', response);
    return response.json();
  }
   const fetchData = async () => {
       setLoading(true)
       const response = await getQuotes(1, 10);
       const updatedData = response.data
      setShowQuotes([...showQuotes, ...updatedData])
      setLoading(false)
    }

  useEffect(() => {
    fetchData()
  }, []);

  const handleScroll = () => {
  const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (isBottom && !loading) {
      fetchData()
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
  }, [loading])

  return (
    <div className="Container">
      <h1>
        Programming Quotes
      </h1>
      <div className='Quotes'>
        {
          showQuotes.map((quote, index) => (
          <li key={index} className='Quote'>{quote.quote}</li>
          ))
        }
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;