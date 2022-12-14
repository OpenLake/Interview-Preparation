import { useContext, useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, createStyles, Paper, PaperProps, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(() => {
  return { main: { margin: '5% auto', width: '60%' } };
});

const Register = (props: PaperProps) => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username: values.username.trim().length < 6 ? 'Username must include at least 6 characters' : null,
          password: values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const registerHandler = () => {
    login();
    navigate('/hr');
  };

  return (
    <Paper className={classes.main} radius="md" p="xl" withBorder {...props}>
      <Text color="teal" align="center" pb={20} fz={20} fw={600}>
        Register Here:
      </Text>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
          <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <TextInput label="Website" placeholder="Website" {...form.getInputProps('website')} />
          <TextInput mt="md" label="GitHub" placeholder="GitHub" {...form.getInputProps('github')} />
        </Stepper.Step>
        {/* <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed> */}
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && active !== 3 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
        {active == 2 && <Button onClick={registerHandler}>Submit</Button>}
      </Group>
    </Paper>
  );
};
export default Register;
