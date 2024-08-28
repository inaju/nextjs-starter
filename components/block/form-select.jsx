
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { LocateFixed, VideoIcon } from "lucide-react"

const FormSelect = ({ field, selectGroup, placeholder }) => {
    return (
        <div>
            <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {selectGroup}
                </SelectContent>
            </Select>
        </div>
    )
}

export default FormSelect
