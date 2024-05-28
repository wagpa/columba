<script lang="ts">
    import { onMount } from 'svelte';
    import { io } from "socket.io-client"

    interface User {
        id: number,
        name: string
        message: string
    }

    // open connection
    const socket = io()

    // handle users and self
    let users: Record<number, User> = {}
    let self: User | null = null
    // publish self updates
    $: { if (self) socket.emit("update", self) }

    // register handler
    onMount(() => {
        socket.on('self', ({ user }) => {
            self = user
        });
        socket.on('join', ({ userId, user }) => {
            users[userId] = user as User
        });
        socket.on('update', ({ userId, update }) => {
            users[userId] = update as User
        });
        socket.on('leave', ({ userId }) => {
            delete users[userId]
        });
    })
</script>

<div>
    <pre>{ JSON.stringify(self ?? "{}", null, 2) }</pre>
    {#if (self)}
        <input bind:value={self.name}>
        <input bind:value={self.message}>
    {/if}
</div>
