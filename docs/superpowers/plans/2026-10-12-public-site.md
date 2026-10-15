# Public website deployment

Goal: publish the existing website at https://vivasik228.github.io/favorit-vet/.

Architecture: retain the normal Next.js server application and add an isolated static export for GitHub Pages. Pages hosting serves all existing public pages, images and interactions. Telegram delivery remains available in the server application; the static build gives the existing unconfigured-booking message without transmitting personal data.

1. Test asset paths under the repository prefix, then add a shared image wrapper.
2. Read booking query parameters within a suspended client form so the booking page can be exported.
3. Build an isolated copy without the server API route, with the Pages prefix and unoptimized images; preserve the original server source.
4. Verify tests, lint, server build and exported HTML/assets. Publish the output to gh-pages, enable Pages and wait for a successful deployment.
5. Verify the public homepage, service page, booking query, menu and mobile view. Return the actual public website URL.
