import { create } from 'zustand';

interface Modal {
  Component: React.ComponentType<any>;
  props: any;
}

interface ModalStore {
  openedModals: Modal[];
  open: (Component: React.ComponentType<any>, props: any) => void;
  close: (Component: React.ComponentType<any>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openedModals: [],
  open: (Component, props) =>
    set(({ openedModals }) => ({
      openedModals: [...openedModals, { Component, props }],
    })),
  close: (Component) =>
    set(({ openedModals }) => ({
      openedModals: openedModals.filter(
        (modal) => modal.Component !== Component
      ),
    })),
}));
