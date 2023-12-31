import { useMoveBack } from "@/hooks";
import { Button, Heading } from "@/ui";
import styled from "styled-components";

const NotFoundLayout = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

export const NotFound = () => {
  const moveBack = useMoveBack();

  return (
    <NotFoundLayout>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </Box>
    </NotFoundLayout>
  );
};
