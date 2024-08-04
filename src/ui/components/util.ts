async function getFeedback(base64Image: string) {
    const form = new FormData();
    form.append('image', base64Image)
    const response = await fetch("https://localhost:5436/feedback", {
        method: "POST",
        body: form
    });
    const data = await response.json();
    return data['feedback'];
}

// TODO: implement api routes below

async function generateDescription(base64Image: string) {
    const form = new FormData();
    form.append('image', base64Image)
    const response = await fetch("https://localhost:5436/description", {
        method: "POST",
        body: form
    });
    const data = await response.json();
    return data['feedback'];
}

async function generateTags(base64Image: string) {
    const form = new FormData();
    form.append('image', base64Image)
    const response = await fetch("https://localhost:5436/tags", {
        method: "POST",
        body: form
    });
    const data = await response.json();
    return data['feedback'];
}
