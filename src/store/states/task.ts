import { Task, TaskWithoutUser } from "@/models"

// Definimos las acciones
export type TaskCreateOrEditState = {
  shouldRedirect: boolean
  isFocused: boolean
  hasValue: boolean
}

export const enum TaskCreateOrEditType {
  SET_SHOULD_REDIRECT = 'SET_SHOULD_REDIRECT',
  SET_IS_FOCUSED = 'SET_IS_FOCUSED',
  SET_HAS_VALUE = 'SET_HAS_VALUE',
}

export type TaskCreateOrEditAction =
  | { type: TaskCreateOrEditType.SET_SHOULD_REDIRECT; payload: boolean }
  | { type: TaskCreateOrEditType.SET_IS_FOCUSED; payload: boolean }
  | { type: TaskCreateOrEditType.SET_HAS_VALUE; payload: boolean }

// Reducer
export const taskCreateOrEditReducer = (state: TaskCreateOrEditState, action: TaskCreateOrEditAction): TaskCreateOrEditState => {
  switch (action.type) {
    case TaskCreateOrEditType.SET_SHOULD_REDIRECT:
      return { ...state, shouldRedirect: action.payload }
    case TaskCreateOrEditType.SET_IS_FOCUSED:
      return { ...state, isFocused: action.payload }
    case TaskCreateOrEditType.SET_HAS_VALUE:
      return { ...state, hasValue: action.payload }
    default:
      return state
  }
}

export const taskCreateOrEditInitialState: TaskCreateOrEditState = {
  shouldRedirect: false,
  isFocused: false,
  hasValue: false,
}


export interface TaskIndexState {
  searchText: string
  open: boolean
  task: Task | null | TaskWithoutUser
}
export const enum TaskIndexType {
  SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
  SET_OPEN = 'SET_OPEN',
  SET_TASK = 'SET_TASK',
}

type TaskIndexAction =
  | { type: TaskIndexType.SET_SEARCH_TEXT; payload: string }
  | { type: TaskIndexType.SET_OPEN; payload: boolean }
  | { type: TaskIndexType.SET_TASK; payload: Task | null }

export function taskIndexReducer(state: TaskIndexState, action: TaskIndexAction): TaskIndexState {
  switch (action.type) {
    case TaskIndexType.SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload }
    case TaskIndexType.SET_OPEN:
      return { ...state, open: action.payload }
    case TaskIndexType.SET_TASK:
      return { ...state, task: action.payload }
    default:
      return state
  }
}

export const taskIndexStateInitialState: TaskIndexState = {
  searchText: '',
  open: false,
  task: null,
}