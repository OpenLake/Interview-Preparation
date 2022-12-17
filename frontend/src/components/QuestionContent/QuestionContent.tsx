import {
  Badge,
  Blockquote,
  Box,
  Card,
  Code,
  createStyles,
  Divider,
  Group,
  List,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconBallpen, IconFlame, IconHeart, IconMessage, IconSchool, IconShare } from '@tabler/icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { data } from '../HrRound/HrRoundData';
const useStyles = createStyles((theme) => ({
  main: {
    width: 700,
    margin: 'auto',
    textAlign: 'left',
    // color: 'dimmed',
  },
  basicInfo: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'left',
  },
  social: {
    cursor: 'pointer',
  },
  liked: {
    // backgroundColor: 'red',
  },
}));

const QuestionContent = () => {
  const { classes, cx } = useStyles();
  const { queId } = useParams();
  const theme = useMantineTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isComments, setIsComments] = useState(false);
  console.log(queId);
  let info = data.filter((item) => item.id === queId);
  const queData = info[0];
  console.log(info);

  const socialSection = (
    <Card.Section p={20} >
      <Group>
        <Group>
          <IconHeart
            color="red"
            className={cx(classes.social, isLiked && classes.liked)}
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          />
          <Text color="red"> 4k </Text>
        </Group>
        <Group>
          <IconMessage
            color="blue"
            className={classes.social}
            onClick={() => {
              setIsComments(!isComments);
            }}
          />
          <Text color="blue"> 30 </Text>
        </Group>
        <Group>
          <IconShare color={theme.colors.gray[5]} className={classes.social} />
        </Group>
      </Group>
    </Card.Section>
  );
  return (
    <Card withBorder className={classes.main} mb= {50}>
      <Card.Section p={20}>
        <Title order={1} align="left" mb={50} fw={400}>
          {queData.question}
        </Title>
        {queData.basic && (
          <Card.Section mt={10} mb={10}>
            <Text align="left" m={10}>
              <Badge leftSection={<IconBallpen />}>Basic Info</Badge>
            </Text>
            <Text align="left" color="dimmed" m={10}>
              {queData.basic}
            </Text>
          </Card.Section>
        )}
        {queData.tips && (
          <Card.Section mt={10} mb={10}>
            <Text align="left" m={10}>
              <Badge color="red" leftSection={<IconFlame color="red" />}>
                Pro Tips
              </Badge>
            </Text>
            <List center={false} withPadding m={20}>
              {queData.tips.map((tip, index) => (
                <List.Item key={index}>
                  <Text color="dimmed"> {tip}</Text>
                </List.Item>
              ))}
            </List>
          </Card.Section>
        )}
        {queData.sample && (
          <Card.Section>
            <Text align="left" m={10}>
              <Badge color="lime" leftSection={<IconSchool color="lime" />}>
                Quick Response
              </Badge>
            </Text>{' '}
            <Blockquote color="dimmed">{queData.sample}</Blockquote>
          </Card.Section>
        )}
        {/* <Divider mt={20} mb={20} /> */}
        {socialSection}
        {isComments && (
          <Card.Section>
            <Divider />
            <Comments id={queId} />
          </Card.Section>
        )}
      </Card.Section>
    </Card>
  );
};

export default QuestionContent;
