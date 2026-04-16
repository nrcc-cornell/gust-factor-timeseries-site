export async function onRequestGet(context) {
    // Check authorization header against secret
    const auth = context.request.headers.get('Authorization');
    const expectedAuth = `Bearer ${context.env.R2_BUCKET_SECRET}`;
    if (!auth || auth !== expectedAuth) {
        return new Response('Unauthorized', { status: 401 });
    }

    const object = await context.env.r2_bucket.get(context.params.station);
    if (!object) {
        return new Response('Object Not Found', { status: 404 });
    } else {
        return new Response(object.body);
    }
}