"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresets({ field }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "pl-3 text-left font-normal w-[100%]",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    {field.value ? (
                        format(field.value, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-2  h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                    onValueChange={(value) => {
                        field.onChange(addDays(new Date(), parseInt(value)))
                    }
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border">
                    <Calendar mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date < new Date()
                        }
                        initialFocus />
                </div>
            </PopoverContent>
        </Popover>
    )
}
