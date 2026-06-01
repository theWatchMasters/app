import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { authFetch, useSession } from "../auth/SessionContext";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Text } from "../ui/text";
import { useTask } from "./TaskContext";

export default function Vault() {
    const { task, setTask } = useTask();
    const session = useSession();
    const [timer, setTimer] = useState("00:00:00");
    useEffect(() => {
        if (task.task_active) {

            const interval = setInterval(() => {

                const ends_at = new Date(task.ends_at);
                const now = new Date();
                const diff = ends_at.getTime() - now.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
                setTimer(`${hours}:${minutes}:${seconds}`);
                if (diff <= 0) {
                    authFetch(session, "/task/incomplete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: task.id,
                        })
                    })
                    setTask({ task_active: false})
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [task, setTimer, session, setTask]);
    return (
        <Pressable onPress={() => router.navigate("/vault/new")}>
            <Card className="rounded-[10vw] w-[80vw] h-[80vw] items-center justify-center border-primary border-[3px] shadow-lg shadow-primary" style={task.task_active ? { borderWidth: 24, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 0 } : {}}>
                <CardHeader className="items-center">
                    <CardTitle className="text-5xl">$0.00</CardTitle>
                    <CardDescription className="text-xl">{task.task_active ? timer : "Click to start a new task"}</CardDescription>
                </CardHeader>
            </Card>
            {task.task_active && (
                <Button className="rounded-t-none">
                    <Text className="text-lg font-bold">SUBMIT</Text>
                </Button>
            )}
        </Pressable >
    );
}