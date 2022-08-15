export interface TList {
  id: number;
  name: string;
}

export interface DropdownProps {
  list: TList[];
  onChange: (value: TList) => void;
  selected: TList;
}
