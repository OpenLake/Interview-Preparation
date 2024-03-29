import { useContext, useEffect, useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Image, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

const links = [
  {
    link: 'hr',
    label: 'HR Round',
  },
  {
    link: 'technical',
    label: 'Technical',
  },
  {
    link: 'project',
    label: 'Project',
  },
  {
    link: 'flashcards',
    label: 'Flash Cards',
  },
];

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  profile: {
    cursor: 'pointer',
  },
}));

const HomeNavbar = () => {
  const { isLoggedIn, queTypeChangeHandler, queType } = useContext(AuthContext);
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  useEffect(() => {
    queTypeChangeHandler(active);
  }, [active]);
  const navLinks = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </NavLink>
  ));

  const homeClickHander = () => {
    setActive('hr');
    navigate('/hr');
  };

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Image
          onClick={homeClickHander}
          width={100}
          height={100}
          src="https://i.ibb.co/MPvj7xw/logo-removebg-preview.png"
        />
        <Group spacing={5} className={classes.links}>
          {isLoggedIn && navLinks}
          {isLoggedIn && (
            <Avatar
              className={classes.profile}
              mr={30}
              onClick={() => {
                navigate('/profile');
              }}
              radius="xl"
            />
          )}
          <DarkThemeToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
};
export default HomeNavbar;
