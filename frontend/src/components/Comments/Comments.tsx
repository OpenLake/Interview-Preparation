import {
  Anchor,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';
import { getComments, getUserInfo, postComment } from '../../utils/apiRequests';
import RelativeTime from '@yaireo/relative-time';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

const Comments = ({ id }: any) => {
  const { classes } = useStyles();
  const [comments, setComments] = useState([{ username: '', comment: '', time: Date.now() }]);
  const params = useParams();
  const relativeTime = new RelativeTime();

  useEffect(() => {
    const updateComments = () => {
      const pusher = new Pusher('c60bbe3cbde2425488b5', {
        cluster: 'ap2',
      });
      const channel = pusher.subscribe('comments');
      channel.bind('inserted', function (data: any) {
        setComments((comments) => [...comments, data].reverse());
      });
    };
    updateComments();
  }, []);

  useEffect(() => {
    const getComment = async () => {
      const response = await getComments(params.queId);
      setComments(response.reverse());
    };
    getComment();
  }, []);

  const form = useForm({
    initialValues: {
      comment: '',
    },

    validate: {
      comment: (val) => (val.trim().length < 2 ? 'Invalid Comment' : null),
    },
  });
  const postCommentHandler = async () => {
    const userData = await getUserInfo(JSON.parse(localStorage.getItem('id') as string));
    form.setFieldValue('comment', '');
    postComment({
      que: params.queId,
      comment: form.values.comment.trim(),
      username: userData.user.name,
      type: params.type,
      user: JSON.parse(localStorage.getItem('id') as string),
      time: Date.now(),
    });
  };

  return (
    <Card>
      <Container my={30}>
        <form onSubmit={form.onSubmit(postCommentHandler)}>
          <TextInput
            required
            placeholder="Comment here..."
            value={form.values.comment}
            onChange={(event) => form.setFieldValue('comment', event.currentTarget.value)}
            error={form.errors.comment && 'Comment should have atleast two character'}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}></Anchor>
            <Button type="submit" className={classes.control}>
              Post
            </Button>
          </Group>
        </form>
        {comments.map((comment, index) => (
          <Paper withBorder radius="md" mt={20} className={classes.comment}>
            <Group>
              <Avatar src={comment.username} alt={comment.username} radius="xl" />
              <div>
                <Text size="sm">{comment.username}</Text>
                <Text size="xs" color="dimmed">
                  {relativeTime.from(new Date(comment.time))}
                </Text>
              </div>
            </Group>
            <Text className={classes.body} size="sm">
              {comment.comment}
            </Text>
          </Paper>
        ))}
      </Container>
    </Card>
  );
};
export default Comments;
