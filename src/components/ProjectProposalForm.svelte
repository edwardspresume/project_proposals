<script lang="ts">
    let responseMessage: string | null = null;

    async function submit(e: SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await fetch('/api/sendProposal', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            responseMessage = data.message;

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Clear the form fields after successful submission
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
</script>

<form on:submit={submit}>
    {#if responseMessage}
        <p class="response_message">{responseMessage}</p>
    {/if}

    <label>
        <span>Title</span>
        <input
            required
            type="text"
            id="title"
            name="title"
            minlength="3"
            enterkeyhint="next"
            placeholder="Enter the project title"
        />
    </label>

    <label>
        <span>Description</span>
        <textarea
            required
            id="description"
            name="description"
            rows="5"
            minlength="10"
            enterkeyhint="enter"
            placeholder="Enter the project description"
        />
    </label>

    <button type="submit">Submit Proposal</button>
</form>

<style>
    label span {
        width: 1px;
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
    }

    form {
        padding: 40px;
        max-width: 550px;
        margin: 2.5rem auto;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    }

    .response_message {
        font-weight: bold;
        margin-bottom: 3rem;
    }

    label {
        display: grid;
        row-gap: 0.6rem;
        font-size: 1.6rem;
        margin-bottom: 3.5rem;
    }

    input,
    textarea {
        padding: 0.7rem;
        border-bottom: 1px solid #b8b8b8;
    }

    button {
        width: 100%;
        font-size: 1.8rem;
        padding: 0.9rem;
        text-align: center;
        border-radius: 7px;
        transition: all 0.8s;
        text-transform: uppercase;
        background-color: hsl(217, 91%, 35%);
        background: linear-gradient(to right, #cb3066, #0e5cd1);
        background-size: 400% 400%;
        box-shadow: 0 3px 10px 0 rgba(205, 209, 215, 0.1);
        animation: gradient 3.5s ease-in-out infinite;
    }

    button:hover {
        transform: scale(1.01);
        background: none;
        background-color: #000;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
