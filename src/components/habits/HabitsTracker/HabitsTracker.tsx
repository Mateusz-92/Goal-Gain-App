import { Box, Grid } from "@chakra-ui/react";

import { months } from "../../../constants";
import { useGetHabits } from "../../../firebase/queries";
import TitleName from "../../../UI/TitleName/TitleName";
import HabitsForm from "../HabitsForm/HabitsForm";
import MonthAnswersList from "../MonthAnswerList/MonthAnswerList";

const HabitsTracker = () => {
  const { data, isError, isLoading } = useGetHabits();

  if (isError) {
    return <p>Cannot get data</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  // eslint-disable-next-line no-magic-numbers
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }
  // eslint-disable-next-line no-magic-numbers
  const dateKey = Object.keys(data)[2];

  const monthName = months[new Date(dateKey).getMonth()];

  if (!data) {
    return <p>No habits data available</p>;
  }
  return (
    <>
      <Box>
        <TitleName textAlign="center" title={monthName} />
        <Grid gap={8} mt={10} templateColumns={{ base: "1fr", md: "1fr 2fr" }}>
          <div>
            <MonthAnswersList />
          </div>
          <HabitsForm date={new Date("2024-06-27")} habits={data} />
          {/* <HabitsForm date={new Date(dateKey)} habits={data} /> */}
        </Grid>
      </Box>
    </>
  );
};
export default HabitsTracker;
