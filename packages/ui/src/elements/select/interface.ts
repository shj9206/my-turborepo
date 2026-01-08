export interface ISelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}