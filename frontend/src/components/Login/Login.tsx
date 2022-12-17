import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  createStyles,
  ButtonProps,
  Image,
  Container,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandGoogle } from '@tabler/icons';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const useStyles = createStyles((theme) => {
  return {
    main: { margin: '5% auto', width: 'fit-content' },
  };
});

const Login = (props: PaperProps, propsButton: ButtonProps) => {
  const { isLoggedIn, login } = useContext(AuthContext);
  console.log(isLoggedIn);
  const { classes } = useStyles();
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  useEffect(() => {
    if (type === 'register') navigate('/register');
  }, [type]);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const submitHandler = () => {
    console.log(form.values);
    navigate('/hr');
    login();
  };

  return (
    <Paper className={classes.main} radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500} align="center">
        Welcome to Interview Preparation, login with
      </Text>

      <Group grow mb="md" mt="md">
        <Button leftIcon={<IconBrandGoogle color="red" />} radius="xl" variant="default" color="gray" {...propsButton}>
          <Text fw="500">Continue with Google</Text>
        </Button>
        <Button
          leftIcon={<IconBrandTwitter color="blue" />}
          radius="xl"
          variant="default"
          color="gray"
          {...propsButton}
        >
          <Text fw="500">Continue with Twitter</Text>
        </Button>
      </Group>

      <Divider label="Or" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(submitHandler)}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
            Don't have an account? Register
          </Anchor>
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Paper>
  );
};
export default Login;
