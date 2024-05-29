<script lang="ts">
    import { onMount } from 'svelte';
    import { io } from "socket.io-client"
    import IconTrashCan from 'virtual:icons/carbon/trash-can'

    export let data;

    interface User {
        id: number,
        name: string
        message: string
    }

    // open connection
    const socket = io({
        extraHeaders: {
            room: data.room,
        },
    })

    let show = false

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

<div class="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-700 to-70% to-slate-600">
    <div class="flex flex-col m-5 h-full">
        <div class="flex flex-row ml-auto mb-6">
            <label class="flex flex-row gap-2 justify-center">
                <span class="text-white">Aufdecken</span>
                <input type="checkbox" bind:checked={show}>
            </label>
        </div>

        <div id="self" class="flex flex-col justify-center items-center">
            {#if (self)}
                <div class="flex flex-col m-2 w-full md:w-[80%] lg:w-[60%] mx-w-[100em]">
                    <div class="flex flex-row mb-2">
                        <input type="text" maxlength="20" bind:value={self.name} pattern="[a-zA-Z0-9]+" class="text-white bg-inherit w-min">
                        <button class="text-white ml-auto p-1 rounded hover:text-neutral-300" title="Text löschen" on:click={() => self.message = ""}><IconTrashCan /></button>
                    </div>
                    <textarea bind:value={self.message} rows="5" class="bg-white p-2 rounded"/>
                </div>
            {/if}
        </div>

        {#if (show)}
            <div id="others" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-auto">
                {#each Object.entries(users) as [userId, user]}
                    {@const isSelf = (userId == self.id)}
                    {#if (!isSelf)}
                        <div class="flex flex-col m-2">
                            <div class="flex flex-row mb-2">
                                <span class="text-white">{user.name}</span>
                            </div>
                            <textarea bind:value={user.message} disabled={true} class="bg-white p-2 rounded"/>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>
