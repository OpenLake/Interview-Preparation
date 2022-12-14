import { createStyles, Card, Avatar, Text, Group, Button, Indicator, useMantineTheme } from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { getUserInfo } from '../../utils/apiRequests';
import { profileData } from './ProfileData';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

const Profile = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [user, setUser] = useState({ name: '', profession: '', college: '', linkedin: '' });
  useEffect(() => {
    const userInfo = async () => {
      const userData = await getUserInfo(JSON.parse(localStorage.getItem('id') as string));
      setUser(userData.user);
      console.log(user);
    };
    userInfo();
  }, []);

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${profileData.image})`, height: 250 }} />
      <Group position="center">
        <Indicator
          dot
          radius={100}
          size={30}
          offset={20}
          position="bottom-end"
          color="grey"
          label={<IconCameraPlus color="white" />}
          withBorder
        >
          <Avatar src={profileData.avatar} size={150} radius={80} mx="auto" mt={-60} className={classes.avatar} />
        </Indicator>
      </Group>
      <Text align="center" size="lg" weight={500} mt="sm">
        {user.name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {user.profession}
      </Text>
      <Text align="center" size="lg" m={10}>
        {user.college}
      </Text>
      <a href={user.linkedin}>
        <Button variant="default"> LinkedIn</Button>
      </a>
    </Card>
  );
};
export default Profile;
