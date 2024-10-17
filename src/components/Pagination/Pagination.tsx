import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="mb-10"
      mt={4}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationControl;
