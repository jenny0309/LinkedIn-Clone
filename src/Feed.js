import React, { useEffect, useState } from 'react';
import './Feed.css';
import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

// material ui
import CreateIcon from '@material-ui/icons/Create';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

// google firebase
import { db } from './firebase';
import { serverTimestamp } from 'firebase/firestore';

const Feed = () => {
  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // realtime listener
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  const sendPost = (e) => {
    e.preventDefault();

    // push input data to db
    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoURL || '',
      timestamp: serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className='feed'>
      <div className='feed__inputContainer'>
        <div className='feed__input'>
          <CreateIcon />
          <form action=''>
            <input
              type='text'
              placeholder='Say Something...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type='submit' onClick={sendPost}>
              Submit
            </button>
          </form>
        </div>
        <div className='feed__inputOptions'>
          <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9' />
          <InputOption Icon={SubscriptionsIcon} title='Video' color='#E7A33E' />
          <InputOption Icon={EventNoteIcon} title='Event' color='#C0CBCD' />
          <InputOption
            Icon={CalendarViewDayIcon}
            title='Write Article'
            color='#7FC15E'
          />
        </div>
      </div>

      {posts.map((post) => (
        <Post
          key={post?.id}
          name={post?.data.name}
          description={post?.data.description}
          message={post?.data.message}
          photoUrl={post?.data.photoUrl}
        />
      ))}
    </div>
  );
};

export default Feed;
