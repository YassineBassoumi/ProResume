import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Select = React.forwardRef(({ children, value, onValueChange, ...props }, ref) => {
    return (
        <div className="relative">
            <select
                className={cn(
                    "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                )}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                ref={ref}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
    )
})
Select.displayName = "Select"

const SelectTrigger = ({ children }) => children
const SelectValue = () => null
const SelectContent = ({ children }) => children
const SelectItem = ({ value, children }) => (
    <option value={value}>{children}</option>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
