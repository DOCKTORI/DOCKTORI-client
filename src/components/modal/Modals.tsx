import { useModalStore } from '../../store/modalStore';

export const Modals = () => {
  const OpenedModals = useModalStore((state) => state.openedModals);
  const close = useModalStore((state) => state.close);
  console.log(OpenedModals);

  return (
    <>
      {OpenedModals.map((modal, index) => {
        const { Component, props } = modal;

        const onClose = () => {
          close(Component);
        };

        return <Component key={index} {...props} onClose={onClose} />;
      })}
    </>
  );
};
