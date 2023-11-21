import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables, formatCurrency } from "@/utils";
import { CreateEditCabinForm } from "@/features/cabins";
import { deleteCabin } from "@/services";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowProps = {
  cabin: Tables<"cabins">;
};

export const CabinRow = ({ cabin }: CabinRowProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { image, name, maxCapacity, discount, regularPrice } = cabin;

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  const toggleFormVisibilityHandler = () =>
    setIsFormOpen((prevState) => !prevState);

  const deleteCabinHandler = () => mutate(cabin.id);

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button disabled={isPending} onClick={toggleFormVisibilityHandler}>
            Edit
          </button>
          <button disabled={isPending} onClick={deleteCabinHandler}>
            Delete
          </button>
        </div>
      </TableRow>
      {isFormOpen && (
        <CreateEditCabinForm
          cabinToEdit={cabin}
          onClose={toggleFormVisibilityHandler}
        />
      )}
    </>
  );
};
