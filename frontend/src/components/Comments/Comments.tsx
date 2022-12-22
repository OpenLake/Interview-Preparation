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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../../utils/apiRequests';

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
  const [comments, setComments] = useState([{ username: '', comment: '' }]);
  const { queId } = useParams();

  useEffect(() => {
    const getComment = async () => {
      const response = await getComments(queId);
      // console.log({ response });
      setComments(response);
    };
    getComment();
  }, []);
  console.log(comments);

  return (
    <Card>
      <Container my={30}>
        <Paper mt="xl" mb="md">
          <TextInput placeholder="Comment here..." required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}></Anchor>
            <Button className={classes.control}>Comment</Button>
          </Group>
        </Paper>
        {comments.map((comment, index) => (
          <Paper withBorder radius="md" mt={20} className={classes.comment}>
            <Group>
              <Avatar src={comment.username} alt={comment.username} radius="xl" />
              <div>
                <Text size="sm">{comment.username}</Text>
                <Text size="xs" color="dimmed">
                  {/* {comment.postedAt} */}
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
