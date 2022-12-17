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

const comment = {
  postedAt: '10 minutes ago',
  body: 'This article is so accurate. It helped me land a job in Mars.',
  author: {
    name: 'Baburao',
    image:
      'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  },
};
const Comments = ({ id }: any) => {
  const { classes } = useStyles();
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
        <Paper withBorder radius="md" className={classes.comment}>
          <Group>
            <Avatar src={comment.author.image} alt={comment.author.name} radius="xl" />
            <div>
              <Text size="sm">{comment.author.name}</Text>
              <Text size="xs" color="dimmed">
                {comment.postedAt}
              </Text>
            </div>
          </Group>
          <Text className={classes.body} size="sm">
            {comment.body}
          </Text>
        </Paper>
      </Container>
    </Card>
  );
};
export default Comments;
