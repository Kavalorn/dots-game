import { Checkbox } from "~shared/components/ui/checkbox"
 
export type CustomCheckboxProps = {
    disabled?: boolean,
    value: boolean,
    onChange: (value: boolean) => void
    name: string
}

export const  CustomCheckbox = ({disabled = false, value, onChange, name, ...props}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      {value ? <div className="text-xs text-gray-400">Waiting for opponent...</div> : null}
      <Checkbox id="terms" disabled={disabled} checked={value} onCheckedChange={onChange} name={name} {...props} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Ready
      </label>
    </div>
  )
}