import { useState, useCallback } from 'react';

export type ModalHook = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function useModal(): ModalHook {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
  };
}
