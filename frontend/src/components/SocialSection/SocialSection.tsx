import { Card, createStyles, Group, Text, useMantineTheme } from '@mantine/core';
import { IconHeart, IconMessage, IconShare } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getqestion, likeQuestion, unlikeQuestion } from '../../utils/apiRequests';

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

const SocialSection = ({ likes, comments }: any) => {
  const { classes, cx } = useStyles();
  const { queId } = useParams();
  const theme = useMantineTheme();

  const [isLiked, setIsLiked] = useState(false);
  // const [isTouched, setIstouched] = useState(false);
  // const [totalLikes, setTotalLikes] = useState(0);
  // useEffect(() => {
  //   setTotalLikes(likes.length);
  // }, []);
  // console.log(totalLikes);
  // const likeClickHandler = async () => {
  //   const userId = JSON.parse(localStorage.getItem('id') as string);
  //   console.log({ queId, userId });
  //   if (isTouched) {
  //     if (isLiked) {
  //       const data = await likeQuestion(queId, userId);
  //       setTotalLikes(data.length);
  //     } else {
  //       const data = await unlikeQuestion(queId, userId);
  //       setTotalLikes(data.length);
  //     }
  //   } else {
  //     const data = await getqestion(queId);
  //     setTotalLikes(data.likes.length);
  //   }
  // };
  return (
    <Card.Section p={20}>
      <Group>
        <Group>
          <IconHeart
            className={classes.social}
            color={isLiked ? theme.colors.red[4] : theme.colors.red[7]}
            onClick={() => {
              // likeClickHandler();
              setIsLiked(!isLiked);
              // setIstouched(true);
            }}
          />
          <Text color="red"> { likes.length}</Text>
        </Group>
        <Group>
          <IconMessage color="blue" />
          <Text color="blue"> {comments} </Text>
        </Group>
        <Group>
          <IconShare color={theme.colors.gray[5]} className={classes.social} />
        </Group>
      </Group>
    </Card.Section>
  );
};
export default SocialSection;
