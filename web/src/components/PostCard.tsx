import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ImagePair from './ImagePair';
import VoteButton from './VoteButton';
import CommentList from './CommentList';
import axios from '../api/axios';
import socket from '../api/socket';
import { Post } from '../types';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [votesA, setVotesA] = useState(post.votesA);
  const [votesB, setVotesB] = useState(post.votesB);

  useEffect(() => {
    socket.on('vote', (data: any) => {
      if (data.postId === post.id) {
        setVotesA(data.votesA);
        setVotesB(data.votesB);
      }
    });
    return () => void socket.off('vote');
  }, [post.id]);

  const handleVote = async (choice: 'A' | 'B') => {
    await axios.post(`/posts/${post.id}/vote`, { choice });
  };

  return (
    <Card>
      <Card.Body>
        <ImagePair imageA={post.imageA} imageB={post.imageB} />
        <div className="d-flex justify-content-between mt-3">
          <VoteButton choice="A" count={votesA} onClick={() => handleVote('A')} />
          <VoteButton choice="B" count={votesB} onClick={() => handleVote('B')} />
        </div>
        <CommentList postId={post.id} comments={post.comments} />
      </Card.Body>
    </Card>
);};

export default PostCard;