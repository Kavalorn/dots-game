import * as React from "react"
import { ChangeHandler } from "react-hook-form"
import { CursorImage } from "~features/Cursors"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "~shared/components/ui/select"
import { TeamColorEnum } from "~shared/types"
import { cn } from "~utils/lib"

type CustomSelectProps = {
    classNames?: string
    onValueChange: any
    defaultValue?: string
    placeholder?: string
    name?: string
    disabled?: boolean
}

export const CustomCursorSelect = ({classNames = '', onValueChange, defaultValue, placeholder = "", disabled, name}: CustomSelectProps) => {
  return (
    <Select defaultValue={defaultValue} name={name} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", classNames)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {Object.values(TeamColorEnum).map((color) => (
            <SelectItem key={color} value={color}>
              <div className="flex gap-4 items-center">
                <CursorImage team={color} className={'h-6 w-6'} /> {color}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}