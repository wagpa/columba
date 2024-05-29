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
        socket.on('connect', () => {
            socket.emit("update", self)
        })
        socket.on('self', ({ user, users: all }) => {
            self = user
            users = all
        });
        socket.on('join', ({ userId, user }) => {
            users[userId] = user as User
        });
        socket.on('update', ({ userId, user }) => {
            users[userId] = user
        });
        socket.on('leave', ({ userId }) => {
            users = (delete users[userId] && users) as Record<number, User>
        });
    })
</script>

<div>
    <pre>{ JSON.stringify(self ?? "{}", null, 2) }</pre>
    {#if (self)}
        <input bind:value={self.name}>
        <input bind:value={self.message}>
    {/if}
    <div>
        {#each Object.entries(users) as [userId, user]}
            <pre>{ JSON.stringify(user, null, 2) }</pre>
        {/each}
    </div>
</div>
