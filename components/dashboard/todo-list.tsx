"use client"

import { Check, Trash } from "lucide-react"
import { Todo } from "@prisma/client"
import toast from "react-hot-toast"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { removeTodo, toggleComplete } from "@/actions/todo.action"
import { cn } from "@/lib/utils"

interface TodoListProps {
    todos: Todo[]
}


export const TodoList = ({ todos }: TodoListProps) => {

    const handleToggoleTodo = async (id: string) => {
        toggleComplete(id)
            .then((data) => {
            if(data?.success) {
                toast.success(data?.success)
            }
        })
    }

    const handleDeleteTodo = async (id: string) => {
        removeTodo(id)
            .then((data) => {
            if(data?.success) {
                toast.success(data?.success)
            }
        })
    }

    return (
        <div className="space-y-2">
            {
                todos.map(todo => (
                    <div className="flex items-center justify-between gap-x-2" key={todo.id}>
                        <p className="text-sm text-muted-foreground">{todo.title}</p>
                        <div className="flex items-center gap-x-1 flex-shrink-0">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={cn("rounded-sm p-[3px] hover:bg-accent hover:text-accent-foreground cursor-pointer", todo.isCompleted && "bg-green-500 text-primary hover:bg-green-500")} onClick={() => handleToggoleTodo(todo.id)}>
                                            <Check className="w-5 h-5" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="rounded-sm p-[3px] hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={() => handleDeleteTodo(todo.id)}>
                                            <Trash className="w-5 h-5 text-rose-500" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete todo</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}