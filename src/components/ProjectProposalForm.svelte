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
    <label>
        Title
        <input
            required
            type="text"
            id="title"
            name="title"
            minlength="3"
            placeholder="Enter the idea title"
        />
    </label>

    <label>
        Description
        <textarea
            required
            id="description"
            name="description"
            minlength="10"
            placeholder="Enter the idea description"
        />
    </label>

    <button type="submit">Submit Proposal</button>

    {#if responseMessage}
        <p>{responseMessage}</p>
    {/if}
</form>
