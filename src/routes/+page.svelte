<script lang="ts">

    let room = ""
</script>

<div class="h-screen w-screen flex flex-row gap-2 justify-center items-center bg-gradient-to-br from-slate-700 to-70% to-slate-600">
    <input class="p-1 rounded" type="text" bind:value={room}>
    <a class="text-white rounded bg-slate-900 p-1" href="/{room}">Beitreten</a>
</div>
