import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

import { db } from "@/lib/db" 
import { TodoForm } from "./todo-form"
import { TodoList } from "./todo-list"

export const Todo = async () => {
    const todos = await db.todo.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>To Do</CardTitle>
                    <CardDescription>Note down your aim</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <TodoForm />
                    <TodoList todos={todos}  />
                </CardContent>
            </Card>
        </div>
    )
}