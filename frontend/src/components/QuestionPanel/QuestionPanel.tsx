import { Box, Container, createStyles, Pagination, Text, TextInput, ThemeIcon } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import { queData } from '../../utils/apiRequests';
import AuthContext from '../../store/auth-context';
const useStyles = createStyles((theme) => {
  return {
    box: {
      transition: 'all .3s',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.teal,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
      boxShadow: theme.shadows.sm,
      borderRadius: theme.radius.md,
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
  };
});

const PAGE_SIZE = 7;

const QuestionPanel = () => {
  const { classes } = useStyles();
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [pageRecords, setPageRecords] = useState(data.slice(0, PAGE_SIZE));
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { queType } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await queData(queType);
      setData(response);
      // setPageRecords(data.slice(0, PAGE_SIZE));
    };
    getData();
  }, [queType]);

  // useEffect(() => {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE;
  //   setPageRecords(data.slice(from, to));
  // }, [page]);

  useEffect(() => {
    setData(
      data.filter(({ question }) => {
        if (debouncedQuery !== '' && !`${question} `.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return false;
        }
        return true;
      }),
    );
  }, [debouncedQuery]);

  return (
    <Container>
      <TextInput
        mb={30}
        sx={{ flexBasis: '40%', borderColor: 'teal' }}
        placeholder="Search here..."
        icon={<IconSearch size={16} />}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      {data.map((item: any) => {
        return (
          <Box
            key={item.id}
            onClick={() => {
              navigate(item._id);
            }}
            p={10}
            mb={20}
            className={classes.box}
          >
            <Text align="left" p={5}>
              {item.question}
            </Text>
          </Box>
        );
      })}
      <div>
        {/* <Pagination
          total={data.length / PAGE_SIZE + 1}
          position="center"
          onChange={(index) => {
            setPage(index);
          }}
          styles={(theme) => ({
            item: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
              },
            },
          })}
        /> */}
      </div>
    </Container>
  );
};
export default QuestionPanel;
