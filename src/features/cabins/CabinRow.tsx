import { Tables, formatCurrency } from "@/utils";
import {
  CreateEditCabinForm,
  useCreateEditCabin,
  useDeleteCabin,
} from "@/features/cabins";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { ConfirmAction, Menus, Modal, Table } from "@/ui";

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
  const { image, name, maxCapacity, regularPrice, discount, id } = cabin;
  const { mutateAsync: cloneCabin, isPending: isClonePending } =
    useCreateEditCabin({
      isEdit: false,
    });
  const { mutateAsync, isPending: isDeletePending } = useDeleteCabin();

  const deleteCabinHandler = () => mutateAsync(cabin.id);

  const cloneCabinHandler = () =>
    cloneCabin({
      ...cabin,
      id: undefined,
      name: `${name} (copy)`,
    });

  const isPending = isClonePending || isDeletePending;

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabin.id} />
              <Menus.List id={cabin.id}>
                <Modal.Open opens="clone">
                  <Menus.Button icon={<HiSquare2Stack />}>Clone</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window name="clone">
              <ConfirmAction
                action="clone"
                resourceName={`cabin ${id}`}
                disabled={isPending}
                onConfirm={cloneCabinHandler}
              />
            </Modal.Window>
            <Modal.Window name="edit">
              <CreateEditCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmAction
                action="delete"
                resourceName={`cabin ${id}`}
                disabled={isPending}
                onConfirm={deleteCabinHandler}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};
