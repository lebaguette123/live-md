<script lang="ts">
    import { onMount } from 'svelte';

    let socket: WebSocket;
    onMount(() => {
        socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', ()=>{
            connectionStatus = 'connected';
        });
        socket.addEventListener('close', ()=>{
            connectionStatus = 'disconnected';
        });

        return ()=>{
            socket.close();
        }
    });
    let connectionStatus = $state<'connecting'|'connected'|'disconnected'>('connecting');
    const connectionLabels = {
        'connected': 'Connected to server',
        'disconnected': 'Disconnected from server',
        'connecting': 'Connecting to server...'
    }
    let connectionText = $derived(connectionLabels[connectionStatus]);

    let message = $state("");

    function sendMessage(){
        if(socket && socket.readyState === WebSocket.OPEN){
            socket.send(message);
            message = "";
        }
    }
</script>

<h1>LiveMD</h1>
<span>{connectionText}</span>
<br/>
<input bind:value={message} />
<button onclick={sendMessage}>Send</button>