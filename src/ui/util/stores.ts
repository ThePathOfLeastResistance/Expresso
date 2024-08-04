import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';
import type { Action, ActionGroup } from './types';

export interface State {
    // actions: any[];
    actionGroup: ActionGroup | null;
    actionGroups: ActionGroup[];
}

export interface Actions {
    gotoMenu(): void;
    setActionGroup(act: ActionGroup): void;
    setActionGroups(groups: ActionGroup[]): void;
    addActionToGroup(act: Action, id: string): void;
    modifyActionGroup(id: string, acts: {
        id: number;
        uniqueId: string;
    }[]): void;
    actionGroupName(id: string, label: string): void;
    addActionGroup(act: ActionGroup): void;
    deleteActionGroup(id: string): void;
}

export type Store = State & Readonly<Actions>;


const dummyStorage: PersistStorage<Store> = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
};

export const useStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                actionGroup: null,
                actionGroups: [],
                gotoMenu: () => set(() => ({ actionGroup: null })),
                setActionGroup: (act: ActionGroup) => set(() => ({ actionGroup: act })),
                setActionGroups: (groups: ActionGroup[]) => set(() => ({ actionGroups: groups })),
                addActionToGroup: (act, id) => set((state) => {
                    // console.log("group id", id, "state", state);
                    const groupIndex = state.actionGroups.findIndex(group => group.id === id);
                    // console.log("found index", groupIndex);

                    if (groupIndex === -1) return {};

                    const updatedGroups = state.actionGroups.map((group, index) =>
                        index === groupIndex
                            ? { ...group, actions: [...group.actions, { id: act.id, uniqueId: act.uniqueId }] }
                            : group
                    );

                    if (state.actionGroup?.id === id) {
                        return { actionGroups: updatedGroups, actionGroup: { ...state.actionGroup, actions: [...state.actionGroup.actions, { id: act.id, uniqueId: act.uniqueId }] } };
                    }

                    // console.log("og", state.actionGroups, "new", updatedGroups);

                    return { actionGroups: updatedGroups };
                }),
                modifyActionGroup: (id, acts) => set((state) => {
                    // console.log("group id", id, "state", state);
                    const groupIndex = state.actionGroups.findIndex(group => group.id === id);
                    // console.log("found index", groupIndex);

                    if (groupIndex === -1) return {};

                    const updatedGroups = state.actionGroups.map((group, index) =>
                        index === groupIndex
                            ? { ...group, actions: acts }
                            : group
                    );

                    if (state.actionGroup?.id === id) {
                        return { actionGroups: updatedGroups, actionGroup: { ...state.actionGroup, actions: acts } };
                    }

                    // console.log("og", state.actionGroups, "new", updatedGroups);

                    return { actionGroups: updatedGroups };
                }),
                actionGroupName: (id: string, label: string) => set((state) => {
                    const groupIndex = state.actionGroups.findIndex(group => group.id === id);
                    // console.log("found index", groupIndex);

                    if (groupIndex === -1) return {};

                    const updatedGroups = state.actionGroups.map((group, index) =>
                        index === groupIndex
                            ? { ...group, label }
                            : group
                    );

                    return { actionGroups: updatedGroups };
                }),
                addActionGroup: (act) => set((state) => ({ actionGroups: [...state.actionGroups, act] })),
                deleteActionGroup: (id) => set((state) => ({ actionGroups: [...state.actionGroups.filter((i) => i.id !== id)] })),
            }),
{ name: 'authStore', storage: dummyStorage },
        )
    )
);