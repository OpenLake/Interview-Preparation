import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Indicator,
  useMantineTheme,
  Tabs,
  Table,
} from '@mantine/core';
import { IconCameraPlus, IconFileReport, IconSettings, IconUserCircle } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { getUserInfo } from '../../utils/apiRequests';
// import { profileData } from './ProfileData';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
  tabs: {
    width: '35%',
    margin: '0 auto',
  },
  tableRow: {
    borderBottom: 'none !important',
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}
const url =
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';

const Profile = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { logout} = useContext(AuthContext);
  const [user, setUser] = useState({ name: '', profession: '', college: '', linkedin: '' });
  useEffect(() => {
    const userInfo = async () => {
      const userData = await getUserInfo(JSON.parse(localStorage.getItem('id') as string));
      setUser(userData.user);
      console.log(user);
    };
    userInfo();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('id');
    navigate('/login');
    logout()
  };

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${url})`, height: 250, marginBottom: 20 }} />
      <Tabs color="teal" className={classes.tabs} defaultValue="About">
        <Tabs.List>
          <Tabs.Tab pr={40} value="About" icon={<IconUserCircle size={20} />}>
            About
          </Tabs.Tab>
          <Tabs.Tab pr={40} value="Settings" icon={<IconSettings size={20} />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="About" pt="xs">
          <Table verticalSpacing="md" className={classes.tableRow} sx={{ width: 500 }}>
            <tbody>
              <tr>
                <td className={classes.tableRow}>
                  <Group spacing="sm" position="apart">
                    <Text size="md">Name</Text>
                    <Text size="md">{user.name}</Text>
                  </Group>
                </td>
              </tr>
              <tr>
                <td>
                  <Group spacing="sm" position="apart">
                    <Text size="md">College</Text>
                    <Text size="md">{user.college}</Text>
                  </Group>
                </td>
              </tr>
              <tr>
                <td>
                  <Group spacing="sm" position="apart">
                    <Text size="md">LinkedIn</Text>
                    <Text size="md">
                      <a href={user.linkedin}>Click</a>
                    </Text>
                  </Group>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tabs.Panel>
        <Tabs.Panel value="Settings" pt="xs">
          <Button variant="outline" color="red" radius="md" uppercase onClick={logoutHandler}>
            Logout
          </Button>
        </Tabs.Panel>
      </Tabs>

      {/* <Text align="center" size="lg" weight={500} mt="sm">
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
      </a> */}
    </Card>
  );
};
export default Profile;
