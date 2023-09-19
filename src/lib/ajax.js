const contentTypeJson = { "Content-Type": "application/json" };

export async function ajax_get(url, signal) {
    return await fetch(url, {
        ...signal,
        method: "GET",
        headers: contentTypeJson
    })
}

export async function ajax_post(url, data) {
    await fetch(url, {
        method: "POST",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    }).then(res => console.log('OK'))
}

export async function ajax_put(url, data) {
    await fetch(url, {
        method: "PUT",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    });
}

export async function ajax_del(url) {
    await fetch(url, {
        method: "DELETE",
        headers: contentTypeJson,
    })
}

export async function ajax_importJson(url) {
    await fetch(url, {
        method: "GET",
        headers: contentTypeJson,
    }).then(() => console.log('OK'))
}
