import {
  Badge,
  Blockquote,
  Card,
  createStyles,
  Divider,
  Group,
  List,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconBallpen, IconFlame, IconHeart, IconMessage, IconSchool, IconShare } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComments, getqestion } from '../../utils/apiRequests';
import Comments from '../Comments/Comments';
import SocialSection from '../SocialSection/SocialSection';
const useStyles = createStyles((theme) => ({
  main: {
    width: 700,
    margin: 'auto',
    textAlign: 'left',
  },
  social: {
    cursor: 'pointer',
  },
}));

const QuestionContent = () => {
  const { classes, cx } = useStyles();
  const { queId } = useParams();
  const theme = useMantineTheme();
  const [data, setData] = useState({ question: '', basic: '', tips: [], sample: '', likes: 0, comments: 0 });

  useEffect(() => {
    const question = async () => {
      const responsedata = await getqestion(queId);
      const commentsData = await getComments(queId);
      setData({ ...responsedata, comments: commentsData.length });
    };
    question();
  }, []);

  return (
    <Card withBorder className={classes.main} mb={50}>
      <Card.Section p={20}>
        <Title order={1} align="left" mb={50} fw={400}>
          {data.question}
        </Title>
        {data.basic && (
          <Card.Section mt={10} mb={10}>
            <Text align="left" m={10}>
              <Badge leftSection={<IconBallpen />}>Basic Info</Badge>
            </Text>
            <Text align="left" color="dimmed" m={10}>
              {data.basic}
            </Text>
          </Card.Section>
        )}
        {data.tips && (
          <Card.Section mt={10} mb={10}>
            <Text align="left" m={10}>
              <Badge color="red" leftSection={<IconFlame color="red" />}>
                Pro Tips
              </Badge>
            </Text>
            <List center={false} withPadding m={20}>
              {data.tips.map((tip, index) => (
                <List.Item key={index}>
                  <Text color="dimmed"> {tip}</Text>
                </List.Item>
              ))}
            </List>
          </Card.Section>
        )}
        {data.sample && (
          <Card.Section>
            <Text align="left" m={10}>
              <Badge color="lime" leftSection={<IconSchool color="lime" />}>
                Quick Response
              </Badge>
            </Text>{' '}
            <Blockquote color="dimmed">{data.sample}</Blockquote>
          </Card.Section>
        )}
        <SocialSection likes={data.likes} comments={data.comments} />
        <Card.Section>
          <Divider />
          <Comments id={queId} />
        </Card.Section>
      </Card.Section>
    </Card>
  );
};

export default QuestionContent;
