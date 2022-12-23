import { createStyles, Card, Avatar, Text, Group, Button, Indicator, useMantineTheme } from '@mantine/core';
import { IconCameraPlus } from '@tabler/icons';
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
        {profileData.name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {profileData.profession}
      </Text>
      <Text align="center" size="lg" m={10}>
        {profileData.college}
      </Text>
      <a href="https://www.linkedin.com/in/gaurav-verma321/6 ">
        <Button variant="default"> LinkedIn</Button>
      </a>
    </Card>
  );
};
export default Profile;
